import type { School } from "../../types";

export function classifySchool(school: School): "new" | "planned" | "inProgress" | "done" {
  const cats = (school as Record<string, unknown>).categories as string[] | undefined;
  if (cats && cats.length > 0) {
    if (cats.includes("done")) return "done";
    if (cats.includes("inProgress")) return "inProgress";
    if (cats.includes("planned")) return "planned";
    if (cats.includes("new")) return "new";
  }

  const events = school.events ?? [];
  const hasReport = events.some(
    (e) => e.status === "RE_SALE" && e.report != null,
  );
  if (hasReport) return "done";

  const hasActiveEvent = events.some((e) => e.status !== "RE_SALE");
  if (hasActiveEvent) return "inProgress";

  return "new";
}

export type SchoolSize = "small" | "medium" | "large";

export function classifySize(
  school: School,
  schoolType: "Школа" | "Садочок" = "Школа",
): SchoolSize {
  const count = school.childrenCount ?? 0;

  if (schoolType === "Садочок") {
    if (count < 50) return "small";
    if (count < 100) return "medium";
    return "large";
  }

  if (count < 500) return "small";
  if (count < 900) return "medium";
  return "large";
}
