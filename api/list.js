const { load } = require('./blob');
const PANEL = String(process.env.PANEL_URL || 'https://www.bnsjayaabadi.store').replace(/\/$/, '');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  const files = [];
  try {
    const blob = load();
    if (blob.list && process.env.BLOB_READ_WRITE_TOKEN) {
      const out = await blob.list({ prefix: 'assets/images/', limit: 1000 });
      for (const b of out.blobs || []) {
        const name = String(b.pathname || '').split('/').pop();
        if (name) files.push({ name, url: 'https://cdn.robotasset.vip/assets/images/' + encodeURIComponent(name), blobUrl: b.url });
      }
    }
    if (!files.length) {
      const r = await fetch(PANEL + '/api/public/list');
      const data = await r.json().catch(() => ({ files: [] }));
      for (const f of data.files || []) {
        const name = String(f.name || '').split('/').pop();
        if (name) files.push({ name, url: 'https://cdn.robotasset.vip/assets/images/' + encodeURIComponent(name), blobUrl: f.url });
      }
    }
    res.end(JSON.stringify({ ok: true, files }));
  } catch (err) {
    res.end(JSON.stringify({ ok: false, files, error: String(err.message || err) }));
  }
};
