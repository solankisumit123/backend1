import os
import sys
import json
import logging
import urllib.parse
import requests
from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
import yt_dlp

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app) # Enable CORS for React frontend

@app.route('/', methods=['GET'])
def home():
    return "VIDEO MASTER ENGINE IS RUNNING! 🚀"

def encode_param(s):
    return urllib.parse.quote(s, safe='')

@app.route('/info', methods=['GET'])
def get_info():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "URL is required"}), 400
    
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'format': 'best',
        'skip_download': True,
        'extract_flat': False, # Must be False to get format URLs
        'youtube_include_dash_manifest': False,
        'youtube_include_hls_manifest': False,
        'nocheckcertificate': True,
        'no_playlist': True,
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            formats_processed = []
            for f in info.get('formats', []):
                # We want formats that have both video and audio for easy direct download
                if f.get('vcodec') != 'none' and f.get('acodec') != 'none':
                    formats_processed.append({
                        "format_id": f.get('format_id'),
                        "ext": f.get('ext'),
                        "resolution": f.get('resolution') or f"{f.get('height', 'unknown')}p",
                        "filesize": f.get('filesize'),
                        "vcodec": f.get('vcodec'),
                        "acodec": f.get('acodec')
                    })

            # Find a suitable preview URL (first combined format or best available)
            preview_url = None
            for f in info.get('formats', []):
                if f.get('vcodec') != 'none' and f.get('acodec') != 'none':
                    preview_url = f.get('url')
                    break
            if not preview_url:
                preview_url = info.get('url')

            # Build Proxy URLs
            # Using request.host_url which includes scheme and port automatically
            base_url = request.host_url.rstrip('/')
            
            thumbnail = info.get('thumbnail')
            if thumbnail:
                thumbnail = f"{base_url}/proxy?url={encode_param(thumbnail)}"
            
            proxied_preview = None
            if preview_url:
                proxied_preview = f"{base_url}/proxy?url={encode_param(preview_url)}"
            
            return jsonify({
                "title": info.get('title'),
                "author": info.get('uploader'),
                "thumbnail": thumbnail,
                "preview_url": proxied_preview, # Restored for frontend preview
                "duration": info.get('duration'),
                "webpage_url": info.get('webpage_url'),
                "formats": formats_processed[:15]
            })
    except Exception as e:
        logger.error(f"Info failure: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/proxy', methods=['GET'])
def proxy_media():
    target_url = request.args.get('url')
    if not target_url:
        return "URL required", 400
    
    range_header = request.headers.get('Range', None)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': '*/*',
    }
    if range_header:
        headers['Range'] = range_header
    
    try:
        r = requests.get(target_url, headers=headers, stream=True, timeout=15)
        forward_headers = {}
        for name, value in r.headers.items():
            if name.lower() in ['content-type', 'content-length', 'content-range', 'accept-ranges']:
                forward_headers[name] = value
            
        def generate():
            for chunk in r.iter_content(chunk_size=128 * 1024):
                yield chunk
            
        return Response(stream_with_context(generate()), 
                        status=r.status_code,
                        content_type=r.headers.get('Content-Type', 'video/mp4'),
                        headers=forward_headers)
    except Exception as e:
        logger.error(f"Proxy bridge failed: {str(e)}")
        return "Media Proxy Error", 500

@app.route('/download', methods=['GET'])
def download():
    url = request.args.get('url')
    format_id = request.args.get('format_id', 'best')
    
    if not url:
        return "URL required", 400

    try:
        ydl_opts = {
            'format': format_id,
            'quiet': True,
            'no_warnings': True,
            'nocheckcertificate': True,
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            download_url = info.get('url')
            ext = info.get('ext', 'mp4')
            title = info.get('title', 'video')

            r = requests.get(download_url, stream=True)
            
            def generate():
                for chunk in r.iter_content(chunk_size=128 * 1024):
                    yield chunk

            clean_title = "".join([c for c in title if c.isalnum() or c in (' ', '.', '_')]).strip()
            filename = f"{clean_title}.{ext}"

            return Response(stream_with_context(generate()), 
                            content_type=r.headers.get('Content-Type'),
                            headers={
                                "Content-Disposition": f"attachment; filename={filename}",
                                "Content-Length": r.headers.get('Content-Length')
                            })
    except Exception as e:
        logger.error(f"Download failure: {str(e)}")
        return str(e), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    # Note: Use '0.0.0.0' for deployment
    app.run(host='0.0.0.0', port=port, debug=False)
