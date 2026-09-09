const { listFiles } = require('./git');
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  try {
    const files = await listFiles();
    res.end(JSON.stringify({ ok: true, dir: 'assets/images', files }));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ ok: false, files: [], error: err.message }));
  }
};
