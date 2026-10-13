// Rewrites relative href/src in the built HTML to absolute paths (base included),
// so links work even when a page is opened without a trailing slash.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, posix, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const base = (process.env.DOCS_BASE_PATH || '').replace(/\/$/, '');
const skip = /^(?:[a-z][a-z0-9+.-]*:|\/|#|\?)/i;

async function* html(dir) {
	for (const e of await readdir(dir, { withFileTypes: true })) {
		const p = join(dir, e.name);
		if (e.isDirectory()) yield* html(p);
		else if (e.name.endsWith('.html')) yield p;
	}
}

let files = 0;
for await (const file of html(dist)) {
	// URL directory of this page, e.g. dist/guides/webhooks/index.html -> /docs/guides/webhooks/
	const rel = relative(dist, file).split('\\').join('/');
	const dir = `${base}/${posix.dirname(rel) === '.' ? '' : `${posix.dirname(rel)}/`}`;
	const src = await readFile(file, 'utf8');
	const out = src.replace(/\b(href|src)="([^"]*)"/g, (m, attr, url) => {
		if (!url || skip.test(url)) return m;
		const [path, rest = ''] = url.split(/(?=[?#])/);
		let abs = posix.normalize(posix.join(dir, path));
		if (path.endsWith('/') && !abs.endsWith('/')) abs += '/';
		return `${attr}="${abs}${rest}"`;
	});
	if (out !== src) {
		await writeFile(file, out);
		files++;
	}
}
console.log(`absolute-links: rewrote links in ${files} pages (base "${base || '/'}")`);
