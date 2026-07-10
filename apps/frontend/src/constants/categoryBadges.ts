export const CATEGORY_BADGES: Record<string, { label: string; className: string }> = {
  planned: {
    label: "Заплановано",
    className: "bg-blue-50 text-blue-600 border-blue-100",
  },
  inProgress: {
    label: "У процесі",
    className: "bg-amber-50 text-amber-600 border-amber-100",
  },
  notConfirmed: {
    label: "Не Підтверджені",
    className: "bg-rose-50 text-rose-600 border-rose-100",
  },
  done: {
    label: "Проведено",
    className: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
};
