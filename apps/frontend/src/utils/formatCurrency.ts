/**
 * Форматує суму у форматі uk-UA (для відображення в грн).
 * Захищає від NaN/undefined/null — завжди повертає валідний рядок.
 */
export function formatCurrency(amount: unknown): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(Number(amount) || 0));
}