import { useState, Suspense, lazy } from "react";

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
import { CityProvider } from "./context/CityContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { SkeletonCard } from "./components/ui/Skeleton";

const Login = lazyWithRetry(() => import("./pages/Login"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));
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
const Analytics = lazyWithRetry(() => import("./pages/Analytics"));
const AuditLog = lazyWithRetry(() => import("./pages/AuditLog"));
const ReportsReview = lazyWithRetry(() => import("./features/reports/pages/ReportsReviewPage"));

const PageLoader = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-8">
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </div>
);

function AppRoutes() {
  const { user, loading, setUser } = useAuth();
  const isAuthenticated = !!user;

  const handleLogin = (loggedInUser: any) => {
    setUser(loggedInUser);
  };

  if (loading) return <PageLoader />;

  return (
    <CityProvider>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Захищені маршрути (Layout відображає бокове меню) */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />

          
          <Route
            path="cities"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
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
              <Suspense fallback={<PageLoader />}>
                <Finance />
              </Suspense>
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
                <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER", "OWNER"]}>
                  <Suspense fallback={<PageLoader />}>
                    <Dashboard />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route
              path="analytics"
              element={
                <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER"]}>
                  <Suspense fallback={<PageLoader />}>
                    <Analytics />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route
              path="audit-log"
              element={
                <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER"]}>
                  <Suspense fallback={<PageLoader />}>
                    <AuditLog />
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

          <Route
            path="reports/review"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER", "MANAGER"]}>
                <Suspense fallback={<PageLoader />}>
                  <ReportsReview />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </CityProvider>
  );
}
export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}
