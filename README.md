## IT Pulse — local preview

This project is a static site converted into a small IT news dashboard demo. It supports an optional client-side NewsAPI integration.

Quick start (serve locally):

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Optional: wire a NewsAPI key (client-side / demo only)

1. Copy `config.example.js` to `config.js`.
2. Edit `config.js` and set `window.NEWSAPI_KEY = 'your-api-key-here';`
3. Reload the page. The live feed will prefer NewsAPI results if the key is provided.

Security: placing the API key in `config.js` is visible to anyone who inspects your site. For production, use a small server proxy to keep keys secret.

If you'd like, I can add a Node/Express proxy to keep the key secure — ask me and I'll add it.
