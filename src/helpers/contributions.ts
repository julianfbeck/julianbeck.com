interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface ContributionData {
  total: number;
  lastDate: string | null;
  weeks: ContributionDay[][];
}

/**
 * Fetches the GitHub contribution calendar at build time.
 * Returns null when the API is unreachable so the section can be skipped.
 */
export async function getContributions(
  user: string
): Promise<ContributionData | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${user}?y=last`
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      total: { lastYear: number };
      contributions: ContributionDay[];
    };

    const days = data.contributions;
    const lastDate =
      [...days].reverse().find((d) => d.count > 0)?.date ?? null;

    // Group days into weeks (columns), aligned to the weekday of the first day.
    const weeks: ContributionDay[][] = [];
    let week: ContributionDay[] = [];
    const firstDayOffset = new Date(days[0].date).getDay();
    for (let i = 0; i < firstDayOffset; i++) {
      week.push({ date: "", count: 0, level: -1 });
    }
    for (const day of days) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length > 0) weeks.push(week);

    return { total: data.total.lastYear, lastDate, weeks };
  } catch {
    return null;
  }
}
