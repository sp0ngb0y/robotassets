const fs = require('fs');
const path = require('path');

const LOCAL = path.join(process.cwd(), 'assets', 'images');
const PANEL = String(process.env.PANEL_URL || 'https://www.bnsjayaabadi.store').replace(/\/$/, '');

function typeOf(name) {
  const ext = path.extname(name).toLowerCase();
  return ({
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  })[ext] || 'application/octet-stream';
}

module.exports = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const name = path.basename(String((req.query && (req.query.name || req.query.path)) || ''));
    if (!name) {
      res.statusCode = 400;
      return res.end('name required');
    }
    const local = path.join(LOCAL, name);
    if (fs.existsSync(local)) {
      res.setHeader('Content-Type', typeOf(name));
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return fs.createReadStream(local).pipe(res);
    }
    const r = await fetch(PANEL + '/api/public/list');
    const data = await r.json().catch(() => ({ files: [] }));
    const want = name.toLowerCase();
    const hit = (data.files || []).find((f) => String(f.name || '').split('/').pop().toLowerCase() === want);
    if (hit && hit.url) {
      res.statusCode = 302;
      res.setHeader('Cache-Control', 'public, max-age=60');
      res.setHeader('Location', hit.url);
      return res.end();
    }
    res.statusCode = 404;
    res.end('Not found');
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: String(err.message || err) }));
  }
};
