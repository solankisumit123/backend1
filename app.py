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
        'extract_flat': False,
        'youtube_include_dash_manifest': True,
        'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    }
    
    # ADVANCED BYPASS: Use cookies.txt if provided by the user
    if os.path.exists("cookies.txt"):
        ydl_opts['cookiefile'] = 'cookies.txt'
        logger.info("Using cookies.txt for authentication bypass")
    else:
        # Fallback to android client if no cookies
        ydl_opts['extractor_args'] = {
            'youtube': {
                'player_client': ['android_test', 'android', 'web'],
                'skip': ['webpage', 'hls', 'dash']
            }
        }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            if not info:
                return jsonify({"error": "No information found for this URL"}), 404
            
            formats_processed = []
            formats = info.get('formats', []) or []
            
            for f in formats:
                # Prioritize combined formats
                f_vcodec = f.get('vcodec') or 'none'
                f_acodec = f.get('acodec') or 'none'
                
                if f_vcodec != 'none' and f_acodec != 'none':
                    height = f.get('height') or 0
                    formats_processed.append({
                        "format_id": f.get('format_id') or 'unknown',
                        "ext": f.get('ext') or 'mp4',
                        "resolution": f"{height}p" if height else (f.get('resolution') or "unknown"),
                        "filesize": f.get('filesize'),
                        "url": f.get('url'),
                        "height": height
                    })

            # Base URL for proxying
            base_url = request.host_url.rstrip('/')
            
            # Find a preview URL (use best combined format)
            preview_raw = None
            if formats_processed:
                # Safe sort
                formats_processed.sort(key=lambda x: x.get('height') or 0, reverse=True)
                preview_raw = formats_processed[0].get('url')
            
            if not preview_raw:
                preview_raw = info.get('url')

            # Build Proxied URLs
            thumbnail = info.get('thumbnail')
            proxied_thumbnail = f"{base_url}/proxy?url={encode_param(thumbnail)}" if thumbnail else None
            proxied_preview = f"{base_url}/proxy?url={encode_param(preview_raw)}" if preview_raw else None
            
            return jsonify({
                "status": "success",
                "title": info.get('title') or "Video",
                "author": info.get('uploader') or "Creator",
                "thumbnail": proxied_thumbnail,
                "preview_url": proxied_preview,
                "duration": info.get('duration'),
                "webpage_url": info.get('webpage_url'),
                "formats": formats_processed[:15]
            })
    except Exception as e:
        logger.error(f"Extraction failure: {str(e)}")
        import traceback
        error_details = traceback.format_exc()
        return jsonify({
            "status": "error",
            "error": str(e),
            "details": error_details if app.debug else "Internal Server Error"
        }), 500

@app.route('/proxy', methods=['GET'])
def proxy_media():
    target_url = request.args.get('url')
    if not target_url:
        return "URL required", 400
    
    range_header = request.headers.get('Range', None)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    }
    if range_header:
        headers['Range'] = range_header
    
    try:
        r = requests.get(target_url, headers=headers, stream=True, timeout=20)
        
        # Pass through important headers for video seeking
        forward_headers = {}
        for h in ['content-type', 'content-length', 'content-range', 'accept-ranges']:
            if h in r.headers:
                forward_headers[h] = r.headers[h]
            
        def generate():
            for chunk in r.iter_content(chunk_size=128 * 1024):
                yield chunk
            
        return Response(stream_with_context(generate()), 
                        status=r.status_code,
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

            r = requests.get(download_url, stream=True, timeout=30)
            
            def generate():
                for chunk in r.iter_content(chunk_size=128 * 1024):
                    yield chunk

            clean_title = "".join([c for c in title if c.isalnum() or c in (' ', '.', '_')]).strip()
            filename = f"{clean_title}.{ext}"

            return Response(stream_with_context(generate()), 
                            headers={
                                "Content-Type": r.headers.get('Content-Type', 'application/octet-stream'),
                                "Content-Disposition": f"attachment; filename={filename}",
                                "Content-Length": r.headers.get('Content-Length')
                            })
    except Exception as e:
        logger.error(f"Download failure: {str(e)}")
        return f"Download failed: {str(e)}", 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    # Note: Use '0.0.0.0' for deployment
    app.run(host='0.0.0.0', port=port, debug=True)
