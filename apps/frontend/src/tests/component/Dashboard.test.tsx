import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { vi } from "vitest";

vi.mock("../../context/CityContext", () => ({
  useSelectedCity: () => ({
    selectedCity: { id: "city-1", name: "Львів" },
    setSelectedCity: vi.fn(),
  }),
}));

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: { role: "SUPERADMIN", name: "Адмін" } }),
}));

import OverviewTab from "../../pages/OverviewTab";

describe("OverviewTab (Dashboard)", () => {
  it("renders KPI cards for SUPERADMIN role", async () => {
    server.use(
      http.get("/api/dashboard/summary", () =>
        HttpResponse.json({
          todayEvents: [],
          upcomingEvents: [],
          funnel: { BASE: 10, FIRST_CONTACT: 5 },
          totalSchools: 50,
          monthlyKpi: { revenue: 50000, profit: 20000, children: 500, count: 10 },
          staleSchools: [],
          activityFeed: [],
          citiesStats: [],
        })
      ),
    );

    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <OverviewTab />
        </BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("50 000 грн")).toBeInTheDocument();
    });
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Доброго ранку" : hour < 18 ? "Доброго дня" : "Доброго вечора";
    expect(screen.getByText(`${greeting}, Адмін`)).toBeInTheDocument();
    expect(screen.getByText("20 000 грн")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
  });
});
