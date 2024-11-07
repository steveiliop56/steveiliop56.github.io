import { defineCollection, z } from "astro:content";

const post = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    // Transform string to Date object
    publishedOn: z.coerce.date(),
    updatedOn: z.coerce.date().optional(),
  }),
});

export const collections = { post };
