import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "../../pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";

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

describe("Dashboard", () => {
  it("renders overview tab for SUPERADMIN role", async () => {
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
    );

    render(<Dashboard />, { wrapper: createWrapper() });

    const overviewTab = screen.getByRole("tab", { name: /огляд/i });
    expect(overviewTab).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("50 000 грн")).toBeInTheDocument();
    }, { timeout: 10000 });
    expect(screen.getByText("Доброго ранку, Адмін")).toBeInTheDocument();
    expect(screen.getByText("20 000 грн")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
  });
});
