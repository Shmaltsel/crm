export type PreparationStatus = "PLANNED" | "IN_PROGRESS" | "DONE";

export const PREPARATION_STATUS_ORDER: PreparationStatus[] = [
  "PLANNED",
  "IN_PROGRESS",
  "DONE",
];

export const PREPARATION_STATUS_LABELS: Record<PreparationStatus, string> = {
  PLANNED: "Заплановано",
  IN_PROGRESS: "В процесі",
  DONE: "Виконано",
};

export function getNextPreparationStatus(
  current: PreparationStatus,
): PreparationStatus {
  const idx = PREPARATION_STATUS_ORDER.indexOf(current || "PLANNED");
  return PREPARATION_STATUS_ORDER[(idx + 1) % PREPARATION_STATUS_ORDER.length];
}
