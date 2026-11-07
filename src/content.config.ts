import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

const politique = defineCollection({
	// type: "content",
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/politique" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()),
		draft: z.boolean().optional(),
	}),
})

const jdr = defineCollection({
	// type: "content",
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/jdr" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()),
		draft: z.boolean().optional(),
	}),
})

const tech = defineCollection({
	// type: "content",
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tech" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()),
		draft: z.boolean().optional(),
	}),
})

const autres = defineCollection({
	// type: "content",
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/autres" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()),
		draft: z.boolean().optional(),
	}),
})

export const collections = { jdr, politique, tech, autres };