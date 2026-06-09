import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
//@ts-ignore
import store from "app-store-scraper";
type AppInfo = {
  id: number;
  appId: string;
  title: string;
  url: string;
  description: string;
  icon: string;
  genres: string[];
  genreIds: string[];
  primaryGenre: string;
  primaryGenreId: number;
  contentRating: string;
  languages: string[];
  size: string;
  requiredOsVersion: string;
  released: string;
  updated: string;
  releaseNotes: string;
  version: string;
  price: number;
  currency: string;
  free: boolean;
  developerId: number;
  developer: string;
  developerUrl: string;
  developerWebsite: string;
  score: number;
  reviews: number;
  currentVersionScore: number;
  currentVersionReviews: number;
  screenshots: string[];
  ipadScreenshots: string[];
  appletvScreenshots: string[];
  supportedDevices: string[];
};
export const proseCSS =
  "mx-auto mt-8 max-w-2xl prose prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed prose-p:text-neutral-400 prose-a:text-white prose-a:underline prose-a:decoration-accent/50 prose-a:underline-offset-4 hover:prose-a:decoration-accent prose-strong:text-white prose-code:before:content-none prose-code:after:content-none prose-img:rounded-xl prose-ul:text-neutral-400 prose-ol:text-neutral-400 prose-li:marker:text-neutral-600 prose-blockquote:border-white/[0.12] prose-blockquote:text-neutral-500 break-words";

const normalizeApps = async (app: CollectionEntry<"app">) => {
  const appDetails = await getAppDetails(app);  const screenshots = [];

  screenshots.push(...(app.data.screenshots ?? []));
  if (appDetails) {
    screenshots.push(...appDetails.screenshots);
    if (appDetails.screenshots.length === 0) {
      screenshots.push(...appDetails.ipadScreenshots);
      screenshots.push(...appDetails.appletvScreenshots);
    }
  }

  const { Content, headings } = await app.render();
  const appstoreUrl = appDetails?.id
    ? `https://apps.apple.com/app/id${appDetails.id}?pt=120183609&ct=app-detail&mt=8`
    : undefined;

  return {
    icon: app.data.logo ?? appDetails?.icon ?? "/base/default-icon.webp",
    description:
      app.data.description === ""
        ? appDetails?.description ?? ""
        : app.data.description,
    ...app,
    appstoreUrl,
    screenshots,
    appDetails,
    Content,
  };
};

export type DetailedApp = Awaited<ReturnType<typeof normalizeApps>>;

export const fetchApps = async (): Promise<DetailedApp[]> => {
  const apps = await getCollection("app");

  const normalizedApps = await Promise.all(
    apps.map(async (app) => normalizeApps(app))
  );
  return normalizedApps.sort(
    (a, b) => Number(b.data.pubDate) - Number(a.data.pubDate)
  );
};

export const getAppDetails = async (app: CollectionEntry<"app">) => {
  if (!app.data.appStoreId) return;
  try {
    let result: AppInfo = await store.app({ id: app.data.appStoreId });
    return result;
  } catch (e) {
    console.log(e);
  }
};
