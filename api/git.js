const REPO = process.env.GITHUB_REPO || '';
const TOKEN = process.env.GITHUB_TOKEN || '';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const DIR = 'assets/images';

function auth() {
  if (!REPO || !TOKEN) throw new Error('Isi GITHUB_REPO dan GITHUB_TOKEN di project CDN');
}

async function gh(path, opt) {
  auth();
  const res = await fetch('https://api.github.com/repos/' + REPO + path, {
    ...opt,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: 'Bearer ' + TOKEN,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...(opt && opt.headers)
    }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || ('GitHub ' + res.status));
  return data;
}

function listFiles() {
  return gh('/contents/' + DIR + '?ref=' + encodeURIComponent(BRANCH)).then((rows) => {
    if (!Array.isArray(rows)) return [];
    return rows.filter((r) => r.type === 'file').map((r) => ({
      name: r.name,
      sha: r.sha,
      size: r.size,
      url: 'https://cdn.robotasset.vip/' + DIR + '/' + encodeURIComponent(r.name)
    }));
  }).catch((err) => {
    if (/Not Found/i.test(err.message)) return [];
    throw err;
  });
}

async function getSha(name) {
  try {
    const row = await gh('/contents/' + DIR + '/' + encodeURIComponent(name) + '?ref=' + encodeURIComponent(BRANCH));
    return row.sha;
  } catch {
    return null;
  }
}

async function putFile(name, base64, message) {
  const sha = await getSha(name);
  if (sha) throw new Error('Nama file sudah ada, tidak bisa diunggah');
  return gh('/contents/' + DIR + '/' + encodeURIComponent(name), {
    method: 'PUT',
    body: JSON.stringify({
      message: message || ('upload ' + name),
      content: base64,
      branch: BRANCH
    })
  });
}

async function renameFile(oldName, newName, base64) {
  const oldSha = await getSha(oldName);
  if (!oldSha) throw new Error('File lama tidak ditemukan');
  if (await getSha(newName)) throw new Error('Nama file sudah ada, tidak bisa dipakai');
  await gh('/contents/' + DIR + '/' + encodeURIComponent(newName), {
    method: 'PUT',
    body: JSON.stringify({ message: 'rename ' + oldName + ' -> ' + newName, content: base64, branch: BRANCH })
  });
  await gh('/contents/' + DIR + '/' + encodeURIComponent(oldName), {
    method: 'DELETE',
    body: JSON.stringify({ message: 'hapus ' + oldName + ' setelah rename', sha: oldSha, branch: BRANCH })
  });
}

async function getContent(name) {
  const row = await gh('/contents/' + DIR + '/' + encodeURIComponent(name) + '?ref=' + encodeURIComponent(BRANCH));
  return row.content ? String(row.content).replace(/\n/g, '') : '';
}

async function deleteFile(name) {
  const sha = await getSha(name);
  if (!sha) throw new Error('File tidak ditemukan');
  return gh('/contents/' + DIR + '/' + encodeURIComponent(name), {
    method: 'DELETE',
    body: JSON.stringify({ message: 'hapus ' + name, sha, branch: BRANCH })
  });
}

module.exports = { listFiles, putFile, deleteFile, renameFile, getSha, getContent, DIR };
