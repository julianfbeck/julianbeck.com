import { getCollection, type CollectionEntry } from "astro:content";

export const slugifyTag = (tag: string): string =>
  tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export interface TagInfo {
  tag: string;
  slug: string;
  count: number;
}

export async function getBlogPosts(): Promise<CollectionEntry<"blog">[]> {
  return (await getCollection("blog"))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getAllTags(): Promise<TagInfo[]> {
  const posts = await getBlogPosts();
  const counts = new Map<string, TagInfo>();

  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      const slug = slugifyTag(tag);
      const existing = counts.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(slug, { tag, slug, count: 1 });
      }
    }
  }

  return [...counts.values()].sort((a, b) => b.count - a.count);
}

export async function getPostsByTagSlug(
  slug: string
): Promise<CollectionEntry<"blog">[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) =>
    (post.data.tags ?? []).some((tag: string) => slugifyTag(tag) === slug)
  );
}
