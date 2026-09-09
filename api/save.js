const { putFile } = require('./git');
async function body(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'OPTIONS') { res.statusCode = 204; return res.end(); }
  try {
    const data = await body(req);
    const name = String(data.name || '').split(/[/\\]/).pop().replace(/\s+/g, '-');
    const raw = String(data.data || '');
    const m = raw.match(/^data:[^;]+;base64,(.+)$/);
    const b64 = m ? m[1] : Buffer.from(raw).toString('base64');
    if (!name || !b64) throw new Error('Nama dan data file wajib');
    await putFile(name, b64, 'upload ' + name);
    res.end(JSON.stringify({
      success: true,
      name,
      url: 'https://cdn.robotasset.vip/assets/images/' + encodeURIComponent(name)
    }));
  } catch (err) {
    res.statusCode = /sudah ada/i.test(err.message) ? 409 : 500;
    res.end(JSON.stringify({ error: err.message }));
  }
};
