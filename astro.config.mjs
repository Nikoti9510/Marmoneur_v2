// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	markdown: {
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					content: { type: 'text', value: ' 🔗' },
					rel: {value: 'external'} // ne fonctionne pas, mais évite la valeur par défaut 'nofollow'. Oh well...
				}
			],
		]
	},
});
