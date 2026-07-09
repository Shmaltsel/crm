import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MobileTopNav from "../../components/MobileTopNav";
import { AuthProvider } from "../../context/AuthContext";
import { CityProvider } from "../../context/CityContext";
import type { ReactNode } from "react";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={["/schools"]}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CityProvider>{children}</CityProvider>
        </AuthProvider>
      </QueryClientProvider>
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

  it("не містить клікабельних посилань", () => {
    render(<MobileTopNav />, { wrapper: Wrapper });
    const links = screen.queryAllByRole("link");
    expect(links.length).toBe(0);
  });
});
