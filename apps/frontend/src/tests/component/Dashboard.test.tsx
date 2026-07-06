import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "../../pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { vi } from "vitest";

vi.mock("../../components/IssueCarousel", () => ({ default: () => <div data-testid="issue-carousel" /> }));
vi.mock("../../components/dashboard/FunnelBar", () => ({ default: () => <div data-testid="funnel-bar" /> }));
vi.mock("../../components/dashboard/TodayEvents", () => ({ default: () => <div data-testid="today-events" /> }));
vi.mock("../../components/dashboard/UpcomingEvents", () => ({ default: () => <div data-testid="upcoming-events" /> }));
vi.mock("../../components/dashboard/StaleSchools", () => ({ default: () => <div data-testid="stale-schools" /> }));
vi.mock("../../components/dashboard/MonthlyKpi", () => ({ default: () => <div data-testid="monthly-kpi" /> }));
vi.mock("../../components/dashboard/ActivityFeed", () => ({ default: () => <div data-testid="activity-feed" /> }));
vi.mock("../../components/dashboard/CitiesTable", () => ({ default: () => <div data-testid="cities-table" /> }));

vi.mock("../../context/CityContext", () => ({
  useSelectedCity: () => ({ selectedCity: { id: "city-1", name: "Львів" } })
}));

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: { role: "SUPERADMIN" } })
}));

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe("Dashboard", () => {
  it("fetches and renders dashboard components", async () => {
    server.use(
      http.get("http://localhost:3000/api/dashboard/summary", () =>
        HttpResponse.json({
          todayEvents: [],
          upcomingEvents: [],
          funnel: {},
          totalSchools: 10,
          monthlyKpi: { revenue: 0, profit: 0, children: 0, count: 0 },
          staleSchools: [],
          activityFeed: [],
          citiesStats: []
        })
      )
    );

    render(<Dashboard />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByTestId("issue-carousel")).toBeInTheDocument();
      expect(screen.getByTestId("funnel-bar")).toBeInTheDocument();
      expect(screen.getByTestId("today-events")).toBeInTheDocument();
      expect(screen.getByTestId("upcoming-events")).toBeInTheDocument();
      expect(screen.getByTestId("stale-schools")).toBeInTheDocument();
      expect(screen.getByTestId("monthly-kpi")).toBeInTheDocument();
      expect(screen.getByTestId("activity-feed")).toBeInTheDocument();
    });
  });
});
