import { defineCollection, z } from "astro:content";
import { TAGS } from "../data/tags";
import { CATEGORIES } from "../data/categories";

const isoDate = z
  .string()
  .refine((v) => !Number.isNaN(Date.parse(v)), { message: "date must be ISO string (e.g. 2024-01-31)" });

const commonMeta = z.object({
  title: z.string(),
  description: z.string().min(1),
  date: z.date(),
  updated: z.date().optional(),
  thumbnail: z.string().optional(),
  isDraft: z.boolean().optional().default(false),
})

const blogMeta = commonMeta.extend({
  category: z.enum(Object.keys(CATEGORIES) as [string, ...string[]]),
  tags: z.array(z.enum(Object.keys(TAGS) as [string, ...string[]])),
})

const pageMeta = commonMeta;

export const collections = {
  "blog-ja": defineCollection({ type: "content", schema: blogMeta }),
  "blog-en": defineCollection({ type: "content", schema: blogMeta }),
  "page-ja": defineCollection({ type: "content", schema: pageMeta }),
  "page-en": defineCollection({ type: "content", schema: pageMeta }),
}