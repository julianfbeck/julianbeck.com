import { z, defineCollection } from "astro:content";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
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
    ogImage: z.string().optional(),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
    tags: z.array(z.string()).default(["others"]),
    // Post type: "post" (default) or "release" for app announcements
    type: z.enum(["post", "release"]).default("post"),
    // Release-specific fields (only used when type is "release")
    release: z.object({
      appName: z.string(),
      appIcon: z.string(),
      appStoreUrl: z.string().url(),
      websiteUrl: z.string().url().optional(),
      tagline: z.string().optional(),
    }).optional(),
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
      .transform((val: string | number | Date) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    link: z.string(),
    screenshots: z.array(z.string()).optional(),
    shownInPortfolio: z.boolean(),
    isIOSApp: z.boolean(),
    appStoreId: z.number().optional(),
    draft: z.boolean().default(false),
    isMenuBarApp: z.boolean().default(false),
    logo: z.string().optional(),
    links: z.record(z.string().url()).optional(),
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

const redeem = defineCollection({
  schema: z.object({
    appName: z.string(),
    appLink: z.string(),
  }),
});

export const collections = { blog, app, position, education, certification, redeem };
