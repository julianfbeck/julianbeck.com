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
  "container mx-auto px-6 sm:px-6 max-w-3xl prose prose-lg lg:prose-xl dark:prose-invert dark:prose-headings:text-slate-300 prose-headings:font-heading prose-headings:leading-tighter prose-headings:tracking-tighter prose-headings:font-bold prose-img:rounded-md prose-img:shadow-lg mt-8 prose-a:text-black/75 dark:prose-a:text-white/90 prose-a:underline prose-a:underline-offset-4 prose-a:decoration-primary-500 hover:prose-a:decoration-primary-600 prose-a:decoration-2 hover:prose-a:decoration-4 hover:prose-a:text-black dark:hover:prose-a:text-white break-words tracking-normal prose-h4:tracking-normal prose-h5:tracking-normal prose-h6:tracking-normal prose-code:before:hidden prose-code:after:hidden";

const normalizeApps = async (app: CollectionEntry<"app">) => {
  const appDetails = await getAppDetails(app);
  const screenshots = [];

  if (appDetails) {
    screenshots.push(...(app.data.screenshots ?? []));
    screenshots.push(...appDetails.screenshots);
    if (appDetails.screenshots.length === 0) {
      screenshots.push(...appDetails.ipadScreenshots);
      screenshots.push(...appDetails.appletvScreenshots);
    }
  }
  const { Content, headings } = await app.render();
  const appstoreUrl = appDetails?.id
    ? `https://apps.apple.com/app/id${appDetails.id}`
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
