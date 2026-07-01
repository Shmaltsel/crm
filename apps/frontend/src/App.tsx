import React, { useState, Suspense, lazy } from "react";
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

const CityProfile = lazy(() => import("./pages/CityProfile"));
const EventReport = lazy(() => import("./pages/EventReport"));

const Cities = lazy(() => import("./pages/Cities"));
const Schools = lazy(() => import("./pages/Schools"));
const SchoolProfile = lazy(() => import("./pages/SchoolProfile"));
const Employees = lazy(() => import("./pages/Employees"));
const Finance = lazy(() => import("./pages/Finance"));
const CalendarView = lazy(() => import("./pages/CalendarView"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Kindergartens = lazy(() => import("./pages/Kindergartens"));

const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[50vh]">
    <div className="text-slate-400 font-medium animate-pulse">
      Завантаження сторінки...
    </div>
  </div>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("user"),
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ігноруємо — все одно чистимо локальний стан
    }
    localStorage.removeItem("user");
    setIsAuthenticated(false);
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
