function load() {
  try { return require('@vercel/blob'); } catch (err) { return { error: err.message }; }
}
module.exports = { load };
