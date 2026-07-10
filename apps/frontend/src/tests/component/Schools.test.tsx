import { render, screen, waitFor } from "@testing-library/react";
import Schools from "../../pages/Schools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { vi } from "vitest";

// Mock nested lazy components
vi.mock("../../components/schools/StatsBar", () => ({ default: () => <div data-testid="stats-bar" /> }));
vi.mock("../../components/schools/VirtualDesktopTable", () => ({ default: () => <div data-testid="virtual-desktop-table" /> }));
vi.mock("../../components/VirtualSchoolList", () => ({ default: () => <div data-testid="virtual-school-list" /> }));

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

describe("Schools Page", () => {
  it("renders schools page and child components", async () => {
    server.use(
      http.get("http://localhost:3000/api/schools", () =>
        HttpResponse.json({
          data: [],
          meta: { totalItems: 0, currentPage: 1, totalPages: 1 }
        })
      ),
      http.get("http://localhost:3000/api/schools/stats", () =>
        HttpResponse.json({
          statusStats: { new: 0, planned: 0, inProgress: 0, done: 0 },
          sizeStats: { small: 0, medium: 0, large: 0 }
        })
      ),
      http.get("http://localhost:3000/api/cities", () =>
        HttpResponse.json([{ id: "city-1", name: "Львів" }])
      ),
      http.get("http://localhost:3000/api/cities/supported", () =>
        HttpResponse.json(["Львів"])
      )
    );

    render(<Schools />, { wrapper: createWrapper() });

    expect(screen.getAllByText(/Школи/i).length).toBeGreaterThanOrEqual(1);
    
    await waitFor(() => {
      expect(screen.getAllByTestId("stats-bar").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByTestId("virtual-desktop-table").length).toBeGreaterThanOrEqual(1);
    });
  });
});
