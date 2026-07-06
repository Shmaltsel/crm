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
import { CalendarEvent } from '../../../types';

// Helper to shade colors for the mobile view
export const shadeHex = (hex: string, lum: number) => {
  // Validate hex format
  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    console.warn(`Invalid hex color: ${hex}`);
    return '#000000'; // Default to black or another fallback
  }

  // Convert to RGB
  let rgb = hex.slice(1);
  if (rgb.length === 3) rgb = rgb[0] + rgb[0] + rgb[1] + rgb[1] + rgb[2] + rgb[2];
  let c: number | string,
    color = [];

  for (let i = 0; i < 3; i++) {
    c = parseInt(rgb.slice(i * 2, i * 2 + 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    color.push(('00' + c).slice(-2));
  }
  return '#' + color.join('');
};

export const getDayColor = (eventsForDay: CalendarEvent[], projectHexMap: Record<string, string>) => {
  if (!eventsForDay || eventsForDay.length === 0) {
    return '#E5E7EB'; // Default gray for no events (light gray-200)
  }

  // Map events to their hex colors
  const eventColors = eventsForDay
    .map((event) => projectHexMap[event.project])
    .filter(Boolean) as string[];

  if (eventColors.length === 0) {
    return '#E5E7EB'; // Fallback if no valid project colors are found
  }

  // For a single event, return its color
  if (eventColors.length === 1) {
    return eventColors[0];
  }

  // For multiple events, create a gradient
  // Limit to 3 colors to avoid overly complex gradients on small circles
  const uniqueColors = Array.from(new Set(eventColors)).slice(0, 3);

  if (uniqueColors.length === 1) {
    return uniqueColors[0];
  }

  // Generate a linear gradient. Example: "linear-gradient(to right, #RRGGBB, #RRGGBB, ...)"
  return `linear-gradient(to right, ${uniqueColors.join(', ')})`;
};
