#!/usr/bin/env node
/**
 * 从 Open Library API 拉取英文版封面，并保存到 books/covers/
 * 使用方式：在项目根目录执行 node scripts/fetch-english-covers.js
 *
 * API 说明：https://openlibrary.org/dev/docs/api/search
 * 封面 URL：https://covers.openlibrary.org/b/id/{cover_i}-L.jpg
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const BOOKS_LIST_PATH = path.join(ROOT, 'scripts', 'books-list.json');
const COVERS_DIR = path.join(ROOT, 'books', 'covers');
const DELAY_MS = 1200;  // 请求间隔，避免对 API 造成压力

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${url}`));
          return;
        }
        resolve(data);
      });
    }).on('error', reject);
  });
}

function downloadToFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const followRedirect = (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const location = res.headers.location;
        if (!location) {
          reject(new Error('Redirect without Location'));
          return;
        }
        downloadToFile(location, filepath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for cover image`));
        return;
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stat = fs.statSync(filepath);
          if (stat.size === 0) {
            fs.unlinkSync(filepath);
            reject(new Error('Downloaded file is empty'));
          } else {
            resolve();
          }
        });
      });
      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    };
    protocol.get(url, { headers: { 'User-Agent': 'BookshelfCoverFetcher/1.0' } }, followRedirect).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function findCoverForBook(title, author) {
  const base = 'https://openlibrary.org/search.json';
  const params = new URLSearchParams({
    title: title,
    author: author,
    limit: '10',
    lang: 'en',  // 优先英文版本
  });
  const url = `${base}?${params.toString()}`;
  const json = await httpsGet(url);
  const data = JSON.parse(json);
  if (!data.docs || data.docs.length === 0) {
    return null;
  }
  // 取第一个带 cover_i 的结果（即带封面的版本）
  const doc = data.docs.find((d) => d.cover_i);
  if (!doc) return null;
  return {
    cover_i: doc.cover_i,
    title: doc.title,
    author_name: doc.author_name && doc.author_name[0],
  };
}

async function main() {
  if (!fs.existsSync(BOOKS_LIST_PATH)) {
    console.error('未找到 books-list.json，请确保 scripts/books-list.json 存在');
    process.exit(1);
  }
  const books = JSON.parse(fs.readFileSync(BOOKS_LIST_PATH, 'utf8'));
  if (!fs.existsSync(COVERS_DIR)) {
    fs.mkdirSync(COVERS_DIR, { recursive: true });
  }

  const failed = [];
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const idStr = String(book.id).padStart(2, '0');
    const outPath = path.join(COVERS_DIR, `cover_${idStr}.jpg`);
    process.stdout.write(`[${i + 1}/${books.length}] ${book.title_en} ... `);
    try {
      const result = await findCoverForBook(book.title_en, book.author_en);
      if (!result) {
        console.log('未找到带封面的版本');
        failed.push({ ...book, reason: 'no_cover' });
        await sleep(DELAY_MS);
        continue;
      }
      const coverUrl = `https://covers.openlibrary.org/b/id/${result.cover_i}-L.jpg`;
      await downloadToFile(coverUrl, outPath);
      console.log(`已保存 (Open Library: ${result.title})`);
    } catch (err) {
      console.log(`失败: ${err.message}`);
      failed.push({ ...book, reason: err.message });
    }
    await sleep(DELAY_MS);
  }

  if (failed.length > 0) {
    console.log('\n以下书籍未能自动获取封面，可稍后重试或手动替换：');
    failed.forEach((f) => console.log(`  - ${f.title_en} (${f.author_en}): ${f.reason}`));
    const failedPath = path.join(ROOT, 'scripts', 'fetch-failed.json');
    fs.writeFileSync(failedPath, JSON.stringify(failed, null, 2), 'utf8');
    console.log(`失败列表已写入: ${failedPath}`);
  } else {
    console.log('\n全部封面已更新。');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
