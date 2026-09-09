const { getContent, renameFile } = require('./git');
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
    const from = String(data.from || '').split(/[/\\]/).pop();
    const to = String(data.to || '').split(/[/\\]/).pop().replace(/\s+/g, '-');
    const content = await getContent(from);
    await renameFile(from, to, content);
    res.end(JSON.stringify({ success: true, name: to, url: 'https://cdn.robotasset.vip/assets/images/' + encodeURIComponent(to) }));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: err.message }));
  }
};
