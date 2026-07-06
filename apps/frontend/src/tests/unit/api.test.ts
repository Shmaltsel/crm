import { api } from "../../config/api";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("api client (axios config)", () => {
  beforeEach(() => {
    document.cookie = "csrf_token=test-csrf-token; path=/";
  });

  afterEach(() => {
    document.cookie = "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });

  it("appends X-CSRF-Token header to non-GET requests if cookie exists", async () => {
    let receivedHeader: string | null = null;
    server.use(
      http.post("http://localhost:3000/api/test-csrf", ({ request }) => {
        receivedHeader = request.headers.get("X-CSRF-Token");
        return HttpResponse.json({ success: true });
      })
    );

    await api.post("/test-csrf");
    expect(receivedHeader).toBe("test-csrf-token");
  });

  it("does not append X-CSRF-Token header to GET requests", async () => {
    let receivedHeader: string | null = null;
    server.use(
      http.get("http://localhost:3000/api/test-csrf", ({ request }) => {
        receivedHeader = request.headers.get("X-CSRF-Token");
        return HttpResponse.json({ success: true });
      })
    );

    await api.get("/test-csrf");
    expect(receivedHeader).toBeNull();
  });
});
