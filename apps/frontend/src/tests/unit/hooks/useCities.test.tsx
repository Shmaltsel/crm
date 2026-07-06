import { renderHook, waitFor } from "@testing-library/react";
import { useCities } from "../../../hooks/useCities";
import { useAddCity } from "../../../hooks/useApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { http, HttpResponse } from "msw";
import { server } from "../../mocks/server";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useCities", () => {
  it("fetches cities successfully", async () => {
    const { result } = renderHook(() => useCities(), { wrapper: createWrapper() });
    
    await waitFor(() => {
      if (result.current.isError) throw result.current.error;
      expect(result.current.isSuccess).toBe(true);
    });
    
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.length).toBeGreaterThan(0);
    expect(result.current.data?.[0].name).toBe("Львів");
  });
});

describe("useAddCity", () => {
  it("mutates and updates query cache with new city", async () => {
    let addedCity: any;
    server.use(
      http.post("http://localhost:3000/api/cities", async ({ request }) => {
        const body = await request.json();
        addedCity = { id: "new-city-1", name: (body as any).name };
        return HttpResponse.json(addedCity);
      })
    );

    const { result } = renderHook(() => useAddCity(), { wrapper: createWrapper() });
    
    result.current.mutate("Тернопіль");
    
    await waitFor(() => {
      if (result.current.isError) throw result.current.error;
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toEqual({ id: "new-city-1", name: "Тернопіль" });
  });
});
