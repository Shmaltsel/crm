import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CalendarHeader from "../../../features/calendar/components/CalendarHeader";
import EventTooltip from "../../../features/calendar/components/EventTooltip";
import type { Project, City } from "../../../types";

describe("CalendarHeader", () => {
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
    userRole: "MANAGER",
  };

  it("рендерить заголовок Календар подій", () => {
    render(<CalendarHeader {...defaultProps} />);
    expect(screen.getByText("Календар подій")).toBeInTheDocument();
  });

  it("рендерить бейджі проєктів", () => {
    render(<CalendarHeader {...defaultProps} />);
    expect(screen.getByText("Проєкт A")).toBeInTheDocument();
    expect(screen.getByText("Проєкт B")).toBeInTheDocument();
  });

  it("не показує city-select для MANAGER", () => {
    render(<CalendarHeader {...defaultProps} userRole="MANAGER" />);
    expect(screen.queryByText("Місто:")).not.toBeInTheDocument();
  });

  it("показує city-select для SUPERADMIN", () => {
    render(<CalendarHeader {...defaultProps} userRole="SUPERADMIN" />);
    expect(screen.getByText("Місто:")).toBeInTheDocument();
    expect(screen.getByText("🌍 Всі міста")).toBeInTheDocument();
  });
});

describe("EventTooltip", () => {
  it("рендерить назву школи та проєкт", () => {
    const event = {
      id: "e1",
      project: "Проєкт A",
      time: "10:00",
      school: { id: "s1", name: "Школа №1", type: "school" },
      crew: { id: "c1", name: "Екіпаж 1", cityId: "city-1" },
    } as any;

    render(<EventTooltip event={event} />);
    expect(screen.getByText("Школа №1")).toBeInTheDocument();
    expect(screen.getByText(/Проєкт A/)).toBeInTheDocument();
    expect(screen.getByText("10:00")).toBeInTheDocument();
  });

  it("рендерить fallback при відсутніх даних", () => {
    const event = { id: "e2", project: "Проєкт B", time: "" } as any;

    render(<EventTooltip event={event} />);
    expect(screen.getByText("Невідомий заклад")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
  });
});
