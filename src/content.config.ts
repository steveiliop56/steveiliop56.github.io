import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/posts", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedOn: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string(),
  }),
});

export const collections = { blog };
