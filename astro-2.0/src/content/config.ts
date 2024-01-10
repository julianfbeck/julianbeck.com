import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
  }),
});

const app = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    link: z.string(),
    shownInPortfolio: z.boolean(),
    isIOSApp: z.boolean(),
    appStoreId: z.string().optional(),
    draft: z.boolean().default(false),
    isMenuBarApp: z.boolean().default(false),
  }),
});

const position = defineCollection({
  schema: z.object({
    company: z.string(),
    position: z.string(),
    description: z.string(),
    url: z.string(),
    from: z.string(),
    to: z.string(),
    logo: z.string(),
  }),
});

const education = defineCollection({
  schema: z.object({
    company: z.string(),
    position: z.string(),
    description: z.string(),
    url: z.string(),
    from: z.string(),
    to: z.string(),
    logo: z.string(),
  }),
});

const certification = defineCollection({
  schema: z.object({
    company: z.string(),
    position: z.string(),
    description: z.string(),
    url: z.string(),
    from: z.string(),
    to: z.string(),
    logo: z.string(),
  }),
});

export const collections = { blog, app, position, education, certification };
