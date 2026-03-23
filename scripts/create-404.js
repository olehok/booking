import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');

if (!fs.existsSync(indexPath)) {
  console.error('index.html not found. Run `npm run build` first.');
  process.exit(1);
}

fs.copyFileSync(indexPath, notFoundPath);
console.log('Created dist/404.html for GitHub Pages SPA fallback.');
