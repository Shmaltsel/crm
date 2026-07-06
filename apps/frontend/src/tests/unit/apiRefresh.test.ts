import { describe, it, expect, vi, afterEach } from "vitest";
import axios from "axios";

function buildAxiosResponse(status: number, data: unknown, url: string) {
  return {
    status,
    data,
    statusText: status === 200 ? "OK" : "Unauthorized",
    headers: {},
    config: { url } as any,
  };
}

function rejectingAdapter(responseStatus: number, responseData: unknown) {
  return (config: any) => {
    const err: any = new Error("Request failed");
    err.response = buildAxiosResponse(responseStatus, responseData, config.url);
    err.config = config;
    return Promise.reject(err);
  };
}

function okAdapter(responseData: unknown) {
  return (config: any) =>
    Promise.resolve(buildAxiosResponse(200, responseData, config.url));
}

describe("API auto-refresh interceptor", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("ретранслює запит після успішного refresh", async () => {
    let callCount = 0;

    const instance = axios.create({ baseURL: "/api", withCredentials: true });

    let refreshPromise: Promise<void> | null = null;

    instance.interceptors.response.use(
      (res) => res,
      async (error: any) => {
        const original = error.config;
        const isAuth =
          original?.url?.includes("/auth/login") ||
          original?.url?.includes("/auth/refresh");

        if (
          error.response?.status === 401 &&
          original &&
          !original._retry &&
          !isAuth
        ) {
          original._retry = true;
          try {
            if (!refreshPromise) {
              refreshPromise = instance
                .post("/auth/refresh")
                .then(() => undefined)
                .finally(() => {
                  refreshPromise = null;
                });
            }
            await refreshPromise;
            return instance(original);
          } catch {
            window.dispatchEvent(new Event("auth:expired"));
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );

    instance.defaults.adapter = (config: any) => {
      callCount++;
      if (config.url === "/schools" && !config._retry) {
        return rejectingAdapter(401, null)(config);
      }
      if (config.url === "/auth/refresh") {
        return okAdapter({ ok: true })(config);
      }
      if (config.url === "/schools" && config._retry) {
        return okAdapter([{ id: 1 }])(config);
      }
      return okAdapter(null)(config);
    };

    const result = await instance.get("/schools");
    expect(result.status).toBe(200);
    expect(result.data).toEqual([{ id: 1 }]);
    expect(callCount).toBe(3);
  });

  it("диспатчить auth:expired якщо refresh теж 401", async () => {
    const dispatchSpy = vi.fn();
    window.addEventListener("auth:expired", dispatchSpy);

    const instance = axios.create({ baseURL: "/api", withCredentials: true });

    let refreshPromise: Promise<void> | null = null;

    instance.interceptors.response.use(
      (res) => res,
      async (error: any) => {
        const original = error.config;
        const isAuth =
          original?.url?.includes("/auth/login") ||
          original?.url?.includes("/auth/refresh");

        if (
          error.response?.status === 401 &&
          original &&
          !original._retry &&
          !isAuth
        ) {
          original._retry = true;
          try {
            if (!refreshPromise) {
              refreshPromise = instance
                .post("/auth/refresh")
                .then(() => undefined)
                .finally(() => {
                  refreshPromise = null;
                });
            }
            await refreshPromise;
            return instance(original);
          } catch {
            window.dispatchEvent(new Event("auth:expired"));
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );

    instance.defaults.adapter = (config: any) => {
      if (config.url === "/auth/refresh") {
        return rejectingAdapter(401, null)(config);
      }
      return rejectingAdapter(401, null)(config);
    };

    await expect(instance.get("/schools")).rejects.toThrow();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  it("не рефрешить на auth-ендпоінтах", async () => {
    const instance = axios.create({ baseURL: "/api", withCredentials: true });

    instance.interceptors.response.use(
      (res) => res,
      async (error: any) => {
        const original = error.config;
        const isAuth =
          original?.url?.includes("/auth/login") ||
          original?.url?.includes("/auth/refresh");

        if (
          error.response?.status === 401 &&
          original &&
          !original._retry &&
          !isAuth
        ) {
          original._retry = true;
          try {
            const rp = instance.post("/auth/refresh").then(() => undefined);
            await rp;
            return instance(original);
          } catch {
            window.dispatchEvent(new Event("auth:expired"));
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );

    instance.defaults.adapter = (config: any) => {
      return rejectingAdapter(401, null)(config);
    };

    await expect(instance.post("/auth/login", {})).rejects.toThrow();
  });
});
