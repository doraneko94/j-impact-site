import { defineCollection, z } from "astro:content";
import { TAGS } from "../data/tags";
import { CATEGORIES } from "../data/categories";

const blogJa = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.enum(Object.keys(CATEGORIES) as [string, ...string[]]),
    tags: z.array(z.enum(Object.keys(TAGS) as [string, ...string[]])),
    thumbnail: z.string().optional(),
  }),
});

const blogEn = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.enum(Object.keys(CATEGORIES) as [string, ...string[]]),
    tags: z.array(z.enum(Object.keys(TAGS) as [string, ...string[]])),
    thumbnail: z.string().optional(),
  }),
});

const pageJa = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updateDate: z.date(),
    thumbnail: z.string().optional(),
  })
});

const pageEn = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updateDate: z.date(),
    thumbnail: z.string().optional(),
  })
});

export const collections = {
  "blog-ja": blogJa,
  "blog-en": blogEn,
  "page-ja": pageJa,
  "page-en": pageEn,
};
