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
const getScreenshots = async (app: CollectionEntry<"app">) => {};

export const test = async () => {
  let result:AppInfo = await store.app({ id: 553834731 });
  console.log(result.appId);
};
