"""Serve the optional Expo web export for mobile navigation regression checks."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent / 'output/mobile-web'
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)
    def translate_path(self, path):
        local = super().translate_path(path)
        if not Path(local).exists() and Path(local + '.html').is_file():
            return local + '.html'
        return local
ThreadingHTTPServer(('127.0.0.1', 4176), Handler).serve_forever()
