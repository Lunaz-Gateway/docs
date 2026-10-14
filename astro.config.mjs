// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// Path prefix when the docs are served below the domain root, e.g. "/docs"
const base = (process.env.DOCS_BASE_PATH || '').replace(/\/$/, '');
const url = (key, fallback) => (process.env[key] || fallback).replace(/\/+$/, '');
const dashboard = url('DOCS_DASHBOARD_URL', 'https://lunaz.example.com/dashboard');
const landing = url('DOCS_LANDING_URL', 'https://lunaz.example.com');
const demo = url('DOCS_DEMO_URL', 'https://demo.example.com');

export default defineConfig({
	// Public URL, needed for the sitemap and canonical links (set at build time)
	site: process.env.DOCS_SITE_URL || undefined,
	base: base || undefined,
	integrations: [
		// Must come before Starlight
		mermaid({ theme: 'neutral', autoTheme: true, enableLog: false }),
		starlight({
			title: 'Lunaz Docs',
			description:
				'Documentation for Lunaz, a managed payment gateway for shielded Zcash with cross-chain payments, signed webhooks and an accountant export.',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: true,
			},
			favicon: '/favicon.svg',
			customCss: ['./src/styles/lunaz.css'],
			head: [
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' } },
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
					},
				},
			],
			sidebar: [
				{
					label: 'Overview',
					items: [
						{ label: 'Introduction', slug: 'overview/introduction' },
						{ label: 'How it works', slug: 'overview/how-it-works' },
						{ label: 'Security and privacy', slug: 'overview/security' },
					],
				},
				{
					label: 'Get started',
					items: [
						{ label: 'Quickstart', slug: 'get-started/quickstart' },
						{ label: 'Concepts', slug: 'get-started/concepts' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Accept ZEC', slug: 'guides/accept-zec' },
						{ label: 'Accept other crypto', slug: 'guides/accept-other-crypto' },
						{ label: 'Webhooks', slug: 'guides/webhooks' },
						{ label: 'Marketplaces', slug: 'guides/marketplaces' },
						{ label: 'Accountant export', slug: 'guides/accountant-export' },
						{ label: 'Withdraw to bank', slug: 'guides/withdraw-to-bank' },
					],
				},
				{
					label: 'API reference',
					items: [
						{ label: 'Authentication', slug: 'api/authentication' },
						{ label: 'Invoices', slug: 'api/invoices' },
						{ label: 'Swaps', slug: 'api/swaps' },
						{ label: 'Webhooks', slug: 'api/webhooks' },
						{ label: 'Errors', slug: 'api/errors' },
					],
				},
				{ label: 'Pricing', slug: 'pricing' },
				{
					label: 'Lunaz',
					items: [
						{ label: 'Dashboard', link: dashboard },
						{ label: 'Website', link: landing },
						{ label: 'Sunday Market demo', link: demo },
					],
				},
				{
					label: 'Help',
					items: [
						{ label: 'FAQ', slug: 'help/faq' },
						{ label: 'Limitations', slug: 'help/limitations' },
						{ label: 'Changelog', slug: 'help/changelog' },
					],
				},
			],
		}),
	],
});
