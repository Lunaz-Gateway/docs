// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	// Public URL, needed for the sitemap and canonical links (set at build time)
	site: process.env.DOCS_SITE_URL || undefined,
	integrations: [
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
						{ label: 'Account', slug: 'api/account' },
						{ label: 'API keys', slug: 'api/api-keys' },
						{ label: 'Webhooks', slug: 'api/webhooks' },
						{ label: 'Export', slug: 'api/export' },
						{ label: 'Withdrawals', slug: 'api/withdrawals' },
						{ label: 'Plans and billing', slug: 'api/plans-and-billing' },
						{ label: 'Errors', slug: 'api/errors' },
					],
				},
				{ label: 'Pricing', slug: 'pricing' },
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
