import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    publishedOn: z.coerce.date(),
    updatedOn: z.coerce.date().optional(),
  }),
});

export const collections = { posts };
