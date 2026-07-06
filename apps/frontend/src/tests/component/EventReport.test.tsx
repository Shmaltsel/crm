import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const mockUseEventFull = vi.fn();
vi.mock("../../hooks/useSchoolProfile", () => ({
  useEventFull: (id: string | undefined) => mockUseEventFull(id),
}));

import EventReport from "../../pages/EventReport";

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/events/ev-1/report"]}>
      <Routes>
        <Route path="/events/:eventId/report" element={<EventReport />} />
      </Routes>
    </MemoryRouter>,
  );
}

const baseEvent = {
  id: "ev-1",
  cityId: "city-1",
  city: { name: "Львів" },
  school: { name: "Школа №1" },
  address: "вул. Тестова 1",
  date: "2026-07-01T10:00:00Z",
  time: "10:00",
  project: "Голограма",
  price: 12345,
  childrenPlanned: 100,
  paymentMethod: "Готівка",
  crew: {
    name: "Екіпаж 1",
    host: { name: "Ведучий" },
    driver: { name: "Водій" },
  },
  report: {
    childrenCount: 95,
    totalSum: 9800,
    directorSatisfied: true,
    teachersSatisfied: false,
    hadIssues: false,
    comment: "Все пройшло добре",
  },
};

describe("EventReport", () => {
  it("показує стан завантаження", () => {
    mockUseEventFull.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    renderPage();
    expect(screen.getByText("Завантаження...")).toBeInTheDocument();
  });

  it("показує 'Подію не знайдено' якщо event відсутній", () => {
    mockUseEventFull.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getByText("Подію не знайдено")).toBeInTheDocument();
  });

  it("показує 'Подію не знайдено' при помилці запиту", () => {
    mockUseEventFull.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    renderPage();
    expect(screen.getByText("Подію не знайдено")).toBeInTheDocument();
  });

  it("форматує вартість події (price) з розділювачем тисяч", () => {
    mockUseEventFull.mockReturnValue({
      data: baseEvent,
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getByText("12 345 грн")).toBeInTheDocument();
  });

  it("форматує отриману суму (report.totalSum) окремо від price", () => {
    mockUseEventFull.mockReturnValue({
      data: baseEvent,
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getByText("9 800 грн")).toBeInTheDocument();
  });

  it("форматує 0 грн, якщо totalSum дорівнює 0", () => {
    mockUseEventFull.mockReturnValue({
      data: { ...baseEvent, report: { ...baseEvent.report, totalSum: 0 } },
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getByText("0 грн")).toBeInTheDocument();
  });

  it("показує '—' якщо звіту ще немає (report undefined)", () => {
    mockUseEventFull.mockReturnValue({
      data: { ...baseEvent, report: undefined },
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getAllByText("—").length).toBeGreaterThan(0);
  });

  it("показує 'Так'/'Ні' відповідно до directorSatisfied/teachersSatisfied", () => {
    mockUseEventFull.mockReturnValue({
      data: baseEvent,
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getAllByText("Так").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ні").length).toBeGreaterThan(0);
  });

  it("показує коментар у лапках, якщо він є", () => {
    mockUseEventFull.mockReturnValue({
      data: baseEvent,
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getByText('"Все пройшло добре"')).toBeInTheDocument();
  });

  it("не показує блок 'Коментар:', якщо коментаря немає", () => {
    mockUseEventFull.mockReturnValue({
      data: {
        ...baseEvent,
        report: { ...baseEvent.report, comment: undefined },
      },
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.queryByText(/Коментар:/)).not.toBeInTheDocument();
  });

  it("childrenPlanned=0 показує '0' (виправлено: використовуємо ?? замість ||)", () => {
    mockUseEventFull.mockReturnValue({
      data: { ...baseEvent, childrenPlanned: 0 },
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
