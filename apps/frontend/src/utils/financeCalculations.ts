import type { FinanceByProject } from "../types";

export function fmtAmount(value: number): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(value || 0));
}

export function calcProjectTotals(byProject: FinanceByProject[]): {
  total: number;
  percents: number[];
} {
  const total = byProject.reduce((s, p) => s + p.value, 0);
  const percents = byProject.map((p) =>
    total > 0 ? Math.round((p.value / total) * 100) : 0
  );
  return { total, percents };
}

export function calcBarPercent(value: number, max: number): number {
  if (!max) return 0;
  return Math.min((value / max) * 100, 100);
}
