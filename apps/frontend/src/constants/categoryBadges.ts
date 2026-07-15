export const CATEGORY_BADGES: Record<string, { label: string; className: string }> = {
  new: {
    label: "Новий",
    className: "bg-neutral-50 text-neutral-600 border-neutral-100",
  },
  planned: {
    label: "Заплановано",
    className: "bg-amber-50 text-amber-600 border-amber-100",
  },
  inProgress: {
    label: "У процесі",
    className: "bg-blue-50 text-blue-600 border-blue-100",
  },
  done: {
    label: "Проведено",
    className: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
};
