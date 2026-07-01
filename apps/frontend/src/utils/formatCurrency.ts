/**
 * Форматує суму у форматі uk-UA (для відображення в грн).
 * Захищає від NaN/undefined/null — завжди повертає валідний рядок.
 */
export function formatCurrency(amount: number | null | undefined): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(amount || 0));
}