import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IssueCarousel from "../../components/IssueCarousel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { vi } from "vitest";

vi.mock("../../context/CityContext", () => ({
  useSelectedCity: () => ({ selectedCity: { id: "city-1", name: "Львів" } })
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("IssueCarousel", () => {
  it("fetches and renders issues", async () => {
    server.use(
      http.get("http://localhost:3000/api/issues", () =>
        HttpResponse.json([
          {
            id: "issue-1",
            schoolName: "Test School",
            eventName: "Test Event",
            message: "Need help",
            status: "Планується",
            createdAt: new Date().toISOString(),
          },
        ])
      )
    );

    render(<IssueCarousel />, { wrapper: createWrapper() });
    
    await waitFor(() => {
      expect(screen.getByText("Test School")).toBeInTheDocument();
    });
    expect(screen.getByText('"Need help"')).toBeInTheDocument();
  });

  it("toggles status to next phase", async () => {
    server.use(
      http.get("http://localhost:3000/api/issues", () =>
        HttpResponse.json([
          {
            id: "issue-1",
            schoolName: "Test School",
            status: "Планується",
            createdAt: new Date().toISOString(),
          },
        ])
      )
    );

    let patchedStatus: string | null = null;
    server.use(
      http.patch("http://localhost:3000/api/issues/:id/status", async ({ request }) => {
        const body = await request.json() as any;
        patchedStatus = body.status;
        return HttpResponse.json({ success: true });
      })
    );

    render(<IssueCarousel />, { wrapper: createWrapper() });
    
    await waitFor(() => {
      expect(screen.getByText("Test School")).toBeInTheDocument();
    });

    const button = screen.getByRole("button", { name: /Планується/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(patchedStatus).toBe("Виконується");
    });
  });
});
