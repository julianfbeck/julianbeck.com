import { getCollection } from "astro:content";
import { fetchApps, type DetailedApp } from "./apps";
import type { CollectionEntry } from "astro:content";

const monthMap: { [key: string]: string } = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

const parseDateString = (dateStr: string): Date => {
  const [month, year] = dateStr.split(" ");
  return new Date(`${year}-${monthMap[month]}-01`);
};

const byFromDesc = (
  a: { data: { from: string } },
  b: { data: { from: string } }
) =>
  parseDateString(b.data.from).getTime() - parseDateString(a.data.from).getTime();

export interface PortfolioData {
  apps: DetailedApp[];
  positions: CollectionEntry<"position">[];
  certifications: CollectionEntry<"certification">[];
  education: CollectionEntry<"education">[];
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const [apps, positions, certifications, education] = await Promise.all([
    fetchApps(),
    getCollection("position"),
    getCollection("certification"),
    getCollection("education"),
  ]);

  positions.sort(byFromDesc);
  certifications.sort(byFromDesc);
  education.sort(byFromDesc);

  return {
    apps: apps.filter((app) => app.data.shownInPortfolio),
    positions,
    certifications,
    education,
  };
}

