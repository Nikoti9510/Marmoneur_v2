import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// const allPages = defineCollection({
// 	loader: glob({ base: './src/content/', pattern: '**/*.{md,mdx}' }),
// 	schema: ({}) =>
// 		z.object({
// 			title: z.string(),
// 			description: z.string(),
// 			pubDate: z.coerce.date(),
// 			updatedDate: z.coerce.date().optional(),
// 			tags: z.array(z.string()),
// 			draft: z.boolean().optional(),
// 		}),
// });
const jdr = defineCollection({
	loader: glob({ base: './src/content/jdr/', pattern: '*.{md,mdx}' }),
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
const politique = defineCollection({
	loader: glob({ base: './src/content/politique/', pattern: '*.{md,mdx}' }),
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

export const collections = { /* allPages, */jdr, politique };