import os
import sys
import json
import logging
from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
import yt_dlp
import threading

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app) # Enable CORS for React frontend

@app.route('/', methods=['GET'])
def home():
    return "VIDEO MASTER ENGINE IS RUNNING! 🚀"

@app.route('/info', methods=['GET'])
def get_info():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "URL is required"}), 400
    
    # Options optimized for fast metadata extraction and combined formats
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'format': 'best[ext=mp4]/best', 
        'skip_download': True,
        'extract_flat': True,
        'youtube_include_dash_manifest': False,
        'youtube_include_hls_manifest': False,
        'nocheckcertificate': True,
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # We use extract_info with download=False to get metadata
            info = ydl.extract_info(url, download=False)
            
            # REELS SPECIFIC: Find the highest quality combined MP4
            formats = info.get('formats', [])
            preview_url = None
            
            # 1. Look for mp4 that has both video AND audio (combined)
            combined_mp4s = [f for f in formats if f.get('ext') == 'mp4' and f.get('vcodec') != 'none' and f.get('acodec') != 'none']
            if combined_mp4s:
                # Sort by quality/resolution
                combined_mp4s.sort(key=lambda x: x.get('height', 0), reverse=True)
                preview_url = combined_mp4s[0].get('url')
            
            # 2. Fallback to any combined format
            if not preview_url:
                any_combined = [f for f in formats if f.get('vcodec') != 'none' and f.get('acodec') != 'none']
                if any_combined:
                    any_combined.sort(key=lambda x: x.get('height', 0), reverse=True)
                    preview_url = any_combined[0].get('url')
            
            # 3. Last fallback
            if not preview_url:
                preview_url = info.get('url') or (formats[0].get('url') if formats else None)

            # Build Proxy URLs
            base_url = f"http://{request.host}"
            thumbnail = info.get('thumbnail')
            if thumbnail:
                thumbnail = f"{base_url}/proxy?url={encode_param(thumbnail)}"
            
            proxied_preview = None
            if preview_url:
                proxied_preview = f"{base_url}/proxy?url={encode_param(preview_url)}"

            return jsonify({
                "title": info.get('title') or "Instagram Reel",
                "author": info.get('uploader') or "Creative Artist",
                "thumbnail": thumbnail,
                "duration": info.get('duration'),
                "preview_url": proxied_preview,
                "formats": [
                    {"format_id": f.get('format_id'), "ext": f.get('ext'), "resolution": f.get('resolution')}
                    for f in formats if f.get('vcodec') != 'none'
                ]
            })
    except Exception as e:
        logger.error(f"Info extraction failed for {url}: {str(e)}")
        return jsonify({"error": "Failed to extract media info. The link might be private or broken."}), 500

@app.route('/proxy', methods=['GET'])
def proxy_media():
    import requests
    target_url = request.args.get('url')
    if not target_url:
        return "URL required", 400
    
    # Capture incoming range headers from the browser (crucial for video seeking)
    range_header = request.headers.get('Range', None)
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://www.instagram.com/',
        'Accept': '*/*',
    }
    if range_header:
        headers['Range'] = range_header
    
    try:
        # We use a session for better persistence
        r = requests.get(target_url, headers=headers, stream=True, timeout=15)
        
        # We want to forward important headers back to the browser
        # specifically Content-Length, Content-Range, and Accept-Ranges
        forward_headers = {}
        important_headers = [
            'content-type', 'content-length', 'content-range', 
            'accept-ranges', 'cache-control', 'expires', 
            'last-modified', 'etag'
        ]
        
        for name, value in r.headers.items():
            if name.lower() in important_headers:
                forward_headers[name] = value

        # Force Accept-Ranges if not present (helps browser know it can seek)
        if 'accept-ranges' not in [h.lower() for h in forward_headers.keys()]:
            forward_headers['Accept-Ranges'] = 'bytes'

        def generate():
            for chunk in r.iter_content(chunk_size=256 * 1024): # Increased chunk for better buffering
                yield chunk

        return Response(stream_with_context(generate()), 
                        status=r.status_code,
                        content_type=r.headers.get('Content-Type', 'video/mp4'),
                        headers=forward_headers)
    except Exception as e:
        logger.error(f"Proxy bridge failed: {str(e)}")
        return "Media Proxy Error", 500

def encode_param(s):
    import urllib.parse
    return urllib.parse.quote(s, safe='')

@app.route('/download', methods=['GET'])
def download():
    url = request.args.get('url')
    format_type = request.args.get('f', 'mp4') # 'mp4' or 'mp3'
    quality = request.args.get('q', '720')
    
    if not url:
        return "URL is required", 400

    # Logic similar to video-downloader-master
    ydl_opts = {
        'format': f'bestvideo[height<={quality}]+bestaudio/best[height<={quality}]' if format_type == 'mp4' else 'bestaudio/best',
        'outtmpl': '-', # Stream to stdout
        'logger': logger,
        'quiet': True,
    }

    if format_type == 'mp3':
        ydl_opts['postprocessors'] = [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }]

    def generate():
        # Using a subprocess or yt_dlp directly to stream might be tricky with post-processing
        # But for direct raw video, we can pipe it.
        # For simplicity in this local setup, we'll use a temp file then stream, 
        # or we can use yt_dlp's '-' outtmpl if ffmpeg is available.
        # However, yt_dlp '-' output doesn't support merging formats easily without more complexity.
        
        # Simpler approach for "Direct Download": 
        # We tell yt-dlp to download to a pipe and we yield chunks.
        
        # We'll use a simplified set of opts that guarantees a single file for streaming
        stream_opts = {
            'format': 'best' if format_type == 'mp4' else 'bestaudio',
            'outtmpl': '-',
            'quiet': True,
            'no_warnings': True,
        }
        
        with yt_dlp.YoutubeDL(stream_opts) as ydl:
            # Note: Streaming directly from yt-dlp to Flask response
            # requires capturing stdout.
            import subprocess
            
            cmd = ['yt-dlp', '-o', '-', url]
            if format_type == 'mp3':
                cmd += ['-x', '--audio-format', 'mp3']
            else:
                cmd += ['-f', f'bestvideo[height<={quality}]+bestaudio/best[height<={quality}]/best']
            
            # Use subprocess to get the binary stream
            process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            
            while True:
                chunk = process.stdout.read(1024 * 16)
                if not chunk:
                    break
                yield chunk
            
            process.stdout.close()
            process.wait()

    filename = f"video_master_{format_type}.{format_type}"
    return Response(stream_with_context(generate()), 
                    mimetype="application/octet-stream",
                    headers={"Content-Disposition": f"attachment; filename={filename}"})

if __name__ == '__main__':
    print("Starting VIDEO MASTER ENGINE on port 5000...")
    app.run(port=5000, debug=False)
