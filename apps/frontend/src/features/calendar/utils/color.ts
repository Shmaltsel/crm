import { PROJECT_HEX } from "../constants";

export const shadeHex = (hex: string, percent: number) => {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (n >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + percent));
  const b = Math.min(255, Math.max(0, (n & 0xff) + percent));
  return `rgb(${r}, ${g}, ${b})`;
};

export const getDayColor = (
  dayEvents: { project: string }[],
  projectHexMap: Map<string, string>,
): string | undefined => {
  if (dayEvents.length === 0) return undefined;
  const counts = new Map<string, number>();
  for (const ev of dayEvents) {
    const hex = projectHexMap.get(ev.project) ?? PROJECT_HEX.blue;
    counts.set(hex, (counts.get(hex) || 0) + 1);
  }
  const total = dayEvents.length;
  if (counts.size === 1) {
    const [hex] = counts.keys();
    return `linear-gradient(to bottom, ${shadeHex(hex, 35)}, ${shadeHex(hex, -25)})`;
  }
  let acc = 0;
  const stops: string[] = [];
  for (const [hex, count] of counts) {
    const start = (acc / total) * 100;
    acc += count;
    const end = (acc / total) * 100;
    stops.push(`${shadeHex(hex, 35)} ${start}%`);
    stops.push(`${shadeHex(hex, -25)} ${end}%`);
  }
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
};
