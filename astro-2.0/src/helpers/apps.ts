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

type DetailedApp = {
  app: CollectionEntry<"app">;
  details?: AppInfo;
};

export const addAppInfos = async (
  apps: CollectionEntry<"app">[]
): Promise<DetailedApp[]> => {
  const appStoreApps = apps.filter((app) => app.data.appStoreId);

  const appDetailsPromises = appStoreApps.map(async (app) => {
    let details = await getAppDetails(app);
    return { app, details };
  });

  return Promise.all(appDetailsPromises);
};

export const getAppDetails = async (app: CollectionEntry<"app">) => {
  try {
    let result: AppInfo = await store.app({ id: Number(app.data.appStoreId) });
    return result;
  } catch (e) {
    console.log(e);
  }
};
