import type { School } from "../../types";

const PLANNED_STAGES = ["BASE", "FIRST_CONTACT", "DATE_CONFIRMED"];
const IN_PROGRESS_STAGES = ["PREPARATION", "IN_PROGRESS", "DONE"];
const NOT_CONFIRMED_STAGES = ["REPORT"];

export function classifySchool(
  school: School,
): "new" | "planned" | "inProgress" | "notConfirmed" | "done" {
  const events = (school.events || []).filter(
    (e) => e.status !== "RE_SALE",
  );
  if (events.length === 0) {
    return (school.events || []).some((e) => e.status === "RE_SALE")
      ? "done"
      : "new";
  }
  const latest = events[events.length - 1];
  if (PLANNED_STAGES.includes(latest.status)) return "planned";
  if (NOT_CONFIRMED_STAGES.includes(latest.status)) return "notConfirmed";
  if (IN_PROGRESS_STAGES.includes(latest.status)) return "inProgress";
  if (latest.status === "RE_SALE") return "done";
  return "new";
}

export function classifySize(
  school: School,
  schoolType: "Школа" | "Садочок" = "Школа",
): "small" | "medium" | "large" {
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
