import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "../../pages/Dashboard";
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

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe("Smoke: Dashboard loading", () => {
  it("сторінка дашборду монтується з навігацією по вкладках", async () => {
    server.use(
      http.get("http://localhost:3000/api/dashboard/summary", () =>
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
      http.get("http://localhost:3000/api/cities", () =>
        HttpResponse.json([
          { id: "city-1", name: "Львів" },
          { id: "city-2", name: "Київ" },
        ])
      ),
      http.get("http://localhost:3000/api/finance/staff-revenue", () => HttpResponse.json([])),
      http.get("http://localhost:3000/api/analytics/city-leaderboard", () => HttpResponse.json([])),
      http.get("http://localhost:3000/api/analytics/events-by-city", () => HttpResponse.json([])),
      http.get("http://localhost:3000/api/analytics/kpi/hosts", () => HttpResponse.json([])),
      http.get("http://localhost:3000/api/analytics/kpi/managers", () => HttpResponse.json([])),
      http.get("http://localhost:3000/api/analytics/kpi/projects", () => HttpResponse.json([])),
      http.get("http://localhost:3000/api/analytics/revenue-by-month", () => HttpResponse.json([])),
      http.get("http://localhost:3000/api/analytics/roi", () => HttpResponse.json({ roi: 0 })),
      http.get("http://localhost:3000/api/analytics/salary-fund", () => HttpResponse.json({ total: 0 })),
      http.get("http://localhost:3000/api/issues", () => HttpResponse.json([]))
    );

    render(<Dashboard />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByRole("tab", { name: /огляд/i })).toBeInTheDocument();
    }, { timeout: 10000 });
    expect(screen.getByRole("tab", { name: /аналітика/i })).toBeInTheDocument();
  }, 15000);
});
