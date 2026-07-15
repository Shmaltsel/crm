import { lazy } from "react";

export function lazyWithRetry(factory: () => Promise<any>) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (err) {
      const key = "chunk-reload-ts";
      const last = Number(sessionStorage.getItem(key) || 0);
      if (Date.now() - last > 10000) {
        sessionStorage.setItem(key, String(Date.now()));
        window.location.reload();
        return new Promise(() => {});
      }
      throw err;
    }
  });
}

export const rawImportFactories: Record<string, () => Promise<any>> = {
  "/dashboard": () => import("./Dashboard"),
  "/schools": () => import("./Schools"),
  "/finance": () => import("./Finance"),
  "/calendar": () => import("./CalendarView"),
  "/employees": () => import("./Employees"),
  "/analytics": () => import("./Analytics"),
};

const Dashboard = lazyWithRetry(rawImportFactories["/dashboard"]);
const Schools = lazyWithRetry(rawImportFactories["/schools"]);
const Finance = lazyWithRetry(rawImportFactories["/finance"]);
const CalendarView = lazyWithRetry(rawImportFactories["/calendar"]);
const Employees = lazyWithRetry(rawImportFactories["/employees"]);
const Analytics = lazyWithRetry(rawImportFactories["/analytics"]);

export const TAB_PAGE_COMPONENTS: Record<string, React.LazyExoticComponent<any>> = {
  "/dashboard": Dashboard,
  "/schools": Schools,
  "/finance": Finance,
  "/calendar": CalendarView,
  "/employees": Employees,
  "/analytics": Analytics,
};
