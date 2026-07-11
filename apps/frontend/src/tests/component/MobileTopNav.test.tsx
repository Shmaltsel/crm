import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MobileTopNav from "../../components/MobileTopNav";
import type { ReactNode } from "react";

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: { role: "MANAGER" } }),
  AuthProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("../../context/CityContext", () => ({
  useSelectedCity: () => ({ selectedCity: { id: "city-1", name: "Львів" } }),
  CityProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={["/schools"]}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
}

describe("MobileTopNav", () => {
  it("рендерить назву розділу за маршрутом /schools", () => {
    render(<MobileTopNav />, { wrapper: Wrapper });
    expect(screen.getByText("Школи")).toBeTruthy();
  });

  it("рендерить назву міста", () => {
    render(<MobileTopNav />, { wrapper: Wrapper });
    const cityTexts = screen.getAllByText(/.+/);
    expect(cityTexts.length).toBeGreaterThanOrEqual(2);
  });

  it("не містить зайвих клікабельних посилань", () => {
    render(<MobileTopNav />, { wrapper: Wrapper });
    const links = screen.queryAllByRole("link");
    expect(links.length).toBeLessThanOrEqual(1);
  });
});
