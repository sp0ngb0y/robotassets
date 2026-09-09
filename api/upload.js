const { load } = require('./blob');

function safeName(name) {
  return String(name || 'file').split(/[/\\]/).pop().replace(/\s+/g, '-');
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.statusCode = 204; return res.end(); }
  if (req.method !== 'POST') { res.statusCode = 405; return res.end('POST only'); }
  const blob = load();
  if (!blob.put) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Blob SDK tidak terpasang: ' + (blob.error || '') }));
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'BLOB_READ_WRITE_TOKEN kosong di project CDN' }));
  }
  try {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
    const name = safeName(body.name || body.filename);
    const raw = String(body.data || '');
    const m = raw.match(/^data:[^;]+;base64,(.+)$/);
    const buf = Buffer.from(m ? m[1] : raw, m ? 'base64' : 'utf8');
    if (!name || !buf.length) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: 'Nama dan data file wajib' }));
    }
    const out = await blob.put('assets/images/' + name, buf, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType: body.type || 'application/octet-stream'
    });
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      name,
      url: 'https://cdn.robotasset.vip/assets/images/' + encodeURIComponent(name),
      blobUrl: out.url
    }));
  } catch (err) {
    res.statusCode = /already exists|already_exists|409/i.test(String(err.message)) ? 409 : 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err.message || 'Upload gagal' }));
  }
};
