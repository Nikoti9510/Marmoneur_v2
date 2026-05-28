import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const content = defineCollection({
	// Load Markdown and MDX files in the `src/pages/content/` directory.
	loader: glob({ base: './src/pages/content', pattern: '*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({}) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()),
			draft: z.boolean().optional(),
		}),
});

export const collections = { content };