import React, { useState, Suspense, lazy } from "react";

function lazyWithRetry(factory: () => Promise<any>) {
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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import { CityProvider } from "./context/CityContext";
import { api } from "./config/api";

import ProtectedRoute from "./components/ProtectedRoute";

const CityProfile = lazyWithRetry(() => import("./pages/CityProfile"));
const EventReport = lazyWithRetry(() => import("./pages/EventReport"));

const Cities = lazyWithRetry(() => import("./pages/Cities"));
const Schools = lazyWithRetry(() => import("./pages/Schools"));
const SchoolProfile = lazyWithRetry(() => import("./pages/SchoolProfile"));
const Employees = lazyWithRetry(() => import("./pages/Employees"));
const Finance = lazyWithRetry(() => import("./pages/Finance"));
const CalendarView = lazyWithRetry(() => import("./pages/CalendarView"));
const Dashboard = lazyWithRetry(() => import("./pages/Dashboard"));
const Kindergartens = lazyWithRetry(() => import("./pages/Kindergartens"));

const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[50vh]">
    <div className="text-slate-400 font-medium animate-pulse">
      Завантаження сторінки...
    </div>
  </div>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("user") && !!localStorage.getItem("token"),
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.error("Logout error", e);
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setIsAuthenticated(false);

    window.location.replace("/login");
  };

  return (
    <Router>
      <CityProvider>
        <Routes>
          {/* Публічний маршрут: Логін */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/cities" replace />
              )
            }
          />

          {/* Захищені маршрути (Layout відображає бокове меню) */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Layout onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            {/* Редірект з кореня на сторінку міст за замовчуванням */}
            <Route index element={<Navigate to="/schools" replace />} />

            {/* Обгортаємо всі вкладені маршрути в Suspense. 
              Коли React намагається відрендерити "ліниву" сторінку, він показує fallback (PageLoader), 
              поки завантажується файл з сервера.
            */}
            <Route
              path="cities"
              element={
                <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER"]}>
                  <Suspense fallback={<PageLoader />}>
                    <Cities />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route
              path="schools"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Schools />
                </Suspense>
              }
            />

            <Route
              path="schools/:id"
              element={
                <Suspense fallback={<PageLoader />}>
                  <SchoolProfile />
                </Suspense>
              }
            />

            <Route
              path="employees"
              element={
                <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                  <Suspense fallback={<PageLoader />}>
                    <Employees />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route
              path="finance"
              element={
                <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER"]}>
                  <Suspense fallback={<PageLoader />}>
                    <Finance />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route
              path="calendar"
              element={
                <Suspense fallback={<PageLoader />}>
                  <CalendarView />
                </Suspense>
              }
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER"]}>
                  <Suspense fallback={<PageLoader />}>
                    <Dashboard />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route
              path="kindergartens"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Kindergartens />
                </Suspense>
              }
            />

            <Route
              path="cities/:id"
              element={
                <Suspense fallback={<PageLoader />}>
                  <CityProfile />
                </Suspense>
              }
            />

            <Route
              path="events/:id/report"
              element={
                <Suspense fallback={<PageLoader />}>
                  <EventReport />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </CityProvider>
    </Router>
  );
}
