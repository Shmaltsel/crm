import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "../../pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";

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
  it("renders owner dashboard for SUPERADMIN role", async () => {
    server.use(
      http.get("http://localhost:3000/api/finance/dashboard", () =>
        HttpResponse.json({
          kpi: { totalRevenue: 100000, totalExpenses: 40000, totalProfit: 60000, totalEvents: 25 },
          monthly: [],
          expectedRevenue: 120000,
          filters: { projects: [], cities: [] },
        })
      )
    );

    render(<Dashboard />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Фінансовий дашборд")).toBeInTheDocument();
      expect(screen.getByText("100 000 грн")).toBeInTheDocument();
      expect(screen.getByText("40 000 грн")).toBeInTheDocument();
      expect(screen.getByText("60 000 грн")).toBeInTheDocument();
      expect(screen.getByText("25")).toBeInTheDocument();
    });
  });
});
