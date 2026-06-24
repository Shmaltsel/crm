// apps/frontend/src/components/schools/schoolUtils.ts

const PLANNED_STAGES = ["BASE", "FIRST_CONTACT", "DATE_CONFIRMED"];
const IN_PROGRESS_STAGES = ["PREPARATION", "IN_PROGRESS", "DONE", "REPORT"];

interface School {
  childrenCount?: number;
  events?: any[];
  isHotClient?: boolean;
}

export function classifySchool(
  school: School,
): "new" | "planned" | "inProgress" | "done" {
  const events = (school.events || []).filter(
    (e: any) => e.status !== "RE_SALE",
  );
  if (events.length === 0) {
    return (school.events || []).some((e: any) => e.status === "RE_SALE")
      ? "done"
      : "new";
  }
  const latest = events[events.length - 1];
  if (PLANNED_STAGES.includes(latest.status)) return "planned";
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
