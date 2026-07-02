import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://crm-57qd.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

api.interceptors.request.use((config) => {
  if (config.method && config.method !== "get") {
    const csrfToken = getCookie("csrf_token");
    if (csrfToken) config.headers["X-CSRF-Token"] = csrfToken;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  },
);
