// Replaces the placeholder URL tokens in the docs sources with the DOCS_*_URL build values.
// Run in the Docker build stage only (it edits files in place). No-op when nothing is set.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const env = (k) => (process.env[k] || '').replace(/\/+$/, '');
// Longest token first: the dashboard URL contains the landing URL
const pairs = [
	['https://lunaz.example.com/dashboard', env('DOCS_DASHBOARD_URL')],
	['https://lunaz.example.com', env('DOCS_LANDING_URL')],
	['https://demo.example.com', env('DOCS_DEMO_URL')],
	['wss://api.example.com', env('DOCS_API_URL').replace(/^http/, 'ws')],
	['https://api.example.com', env('DOCS_API_URL')],
].filter(([, to]) => to);

async function* files(dir) {
	for (const e of await readdir(dir, { withFileTypes: true })) {
		const p = join(dir, e.name);
		if (e.isDirectory()) yield* files(p);
		else if (/\.mdx?$/.test(e.name)) yield p;
	}
}

if (pairs.length) {
	for await (const f of files(new URL('../src/content/docs/', import.meta.url).pathname)) {
		const src = await readFile(f, 'utf8');
		const out = pairs.reduce((s, [from, to]) => s.replaceAll(from, to), src);
		if (out !== src) await writeFile(f, out);
	}
}
