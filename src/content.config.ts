import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const content = defineCollection({
	// Load Markdown and MDX files in the `src/content/` directory.
	loader: glob({ base: './src/content', pattern: '*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({}) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()),
			draft: z.boolean().optional(),
		}),
});

export const collections = { content };