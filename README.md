# CDN + GitHub (CLI)

## 1. Repo GitHub
Folder ini = repo project cdn.robotasset.vip
git init
git add .
git commit -m "cdn upl"
git remote add origin https://github.com/AKUN/NAMA-REPO.git
git push -u origin main

## 2. Token
GitHub → Settings → Developer settings → Personal access tokens
Classic: scope `repo`
atau Fine-grained: Contents Read and write

## 3. Vercel CLI
cd robotassets
npm i -g vercel
vercel link
vercel env add GITHUB_TOKEN production
vercel env add GITHUB_REPO production
vercel env add GITHUB_BRANCH production

Isi:
GITHUB_TOKEN=ghp_...
GITHUB_REPO=akun/nama-repo
GITHUB_BRANCH=main

vercel --prod

## 4. Dashboard Vercel
Project CDN → Settings → Git → Connect repo yang sama

## 5. Cek
https://cdn.robotasset.vip/upl
Unggah → tunggu deploy Ready →
https://cdn.robotasset.vip/assets/images/nama.webp
