import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import CalendarHeader from "../../features/calendar/components/CalendarHeader";
import { useCalendarMonth } from "../../features/calendar/hooks/useCalendarMonth";
import type { Project, City } from "../../types";

const projects: Project[] = [
  { id: "p1", name: "Проєкт A", color: "blue" },
  { id: "p2", name: "Проєкт B", color: "emerald" },
];
const cities: City[] = [
  { id: "c1", name: "Київ" },
  { id: "c2", name: "Львів" },
];
const defaultProps = {
  projects,
  filterCityId: "ALL",
  setFilterCityId: vi.fn(),
  cities,
  userRole: "SUPERADMIN",
};

describe("Smoke: Calendar month switch", () => {
  it("рендерить заголовок календаря з проєктами", () => {
    render(<CalendarHeader {...defaultProps} />);
    expect(screen.getByText("Календар подій")).toBeInTheDocument();
    expect(screen.getByText("Проєкт A")).toBeInTheDocument();
  });

  it("nextMonth/prevMonth перемикають місяць", () => {
    const { result } = renderHook(() => useCalendarMonth());
    const startMonth = result.current.month;

    act(() => result.current.nextMonth());
    expect(result.current.month).toBe((startMonth + 1) % 12);

    act(() => result.current.prevMonth());
    expect(result.current.month).toBe(startMonth);

    act(() => result.current.prevMonth());
    expect(result.current.month).toBe((startMonth + 11) % 12);
  });
});
