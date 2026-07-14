import { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Layout from "./components/Layout";
import { CityProvider } from "./context/CityContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { lazyWithRetry, TAB_PAGE_COMPONENTS } from "./pages/lazyTabPages";

import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import TabErrorBoundary from "./components/dashboard/TabErrorBoundary";
import { SkeletonCard } from "./components/ui/Skeleton";
import ScrollToTop from "./components/ScrollToTop";

const Login = lazyWithRetry(() => import("./pages/Login"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));
const CityProfile = lazyWithRetry(() => import("./pages/CityProfile"));
const EventReport = lazyWithRetry(() => import("./pages/EventReport"));

const Cities = lazyWithRetry(() => import("./pages/Cities"));
const SchoolProfile = lazyWithRetry(() => import("./pages/SchoolProfile"));
const ProjectProfile = lazyWithRetry(() => import("./pages/ProjectProfile"));
const ReportsReview = lazyWithRetry(() => import("./features/reports/pages/ReportsReviewPage"));
const Inventory = lazyWithRetry(() => import("./pages/Inventory"));
const CityLeaderboard = lazyWithRetry(() => import("./pages/CityLeaderboard"));

const Dashboard = TAB_PAGE_COMPONENTS["/dashboard"];
const Schools = TAB_PAGE_COMPONENTS["/schools"];
const Finance = TAB_PAGE_COMPONENTS["/finance"];
const CalendarView = TAB_PAGE_COMPONENTS["/calendar"];
const Employees = TAB_PAGE_COMPONENTS["/employees"];
const Analytics = TAB_PAGE_COMPONENTS["/analytics"];

const PageLoader = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-8">
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </div>
);

interface LoginUser {
  id: string;
  name: string;
  email: string;
  role: string;
  cityId?: string | null;
  cityName?: string | null;
}

function getDefaultRoute(role: string): string {
  if (["SUPERADMIN", "OWNER", "MANAGER"].includes(role)) return "/dashboard";
  return "/calendar";
}

function AppRoutes() {
  const { user, loading, login } = useAuth();
  const location = useLocation();
  const isAuthenticated = !!user;

  const handleLogin = (loggedInUser: LoginUser) => {
    login(loggedInUser);
  };

  if (loading) {
    if (!user && location.pathname !== "/login") {
      return null;
    }
    if (location.pathname !== "/login") {
      return <PageLoader />;
    }
  }

  return (
    <CityProvider>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to={getDefaultRoute(user!.role)} replace />
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
              <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER"]}>
                <Suspense fallback={null}>
                  <Cities />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="schools"
            element={
              <TabErrorBoundary label="Школи">
                <Suspense fallback={null}>
                  <Schools />
                </Suspense>
              </TabErrorBoundary>
            }
          />

          <Route
            path="schools/:id"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER", "MANAGER", "LEADER"]}>
                <Suspense fallback={null}>
                  <SchoolProfile />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="employees"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                <Suspense fallback={null}>
                  <Employees />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="finance"
            element={
              <TabErrorBoundary label="Фінанси">
                <Suspense fallback={null}>
                  <Finance />
                </Suspense>
              </TabErrorBoundary>
            }
          />

          <Route
            path="calendar"
            element={
              <TabErrorBoundary label="Календар">
                <Suspense fallback={null}>
                  <CalendarView />
                </Suspense>
              </TabErrorBoundary>
            }
          />
            <Route
              path="dashboard"
              element={
              <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER", "OWNER"]}>
                  <Suspense fallback={null}>
                    <Dashboard />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route
              path="analytics"
              element={
                <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER"]}>
                  <Suspense fallback={null}>
                    <Analytics />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route
              path="city-leaderboard"
              element={
                <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER", "MANAGER"]}>
                  <Suspense fallback={null}>
                    <CityLeaderboard />
                  </Suspense>
                </ProtectedRoute>
              }
            />

          <Route
            path="kindergartens"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER", "MANAGER"]}>
                <Suspense fallback={null}>
                  <Schools />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="cities/:id"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER", "MANAGER"]}>
                <Suspense fallback={null}>
                  <CityProfile />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="projects/:id"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER", "MANAGER"]}>
                <Suspense fallback={null}>
                  <ProjectProfile />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="events/:id/report"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER", "MANAGER", "LEADER"]}>
                <Suspense fallback={null}>
                  <EventReport />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="reports/review"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER", "MANAGER"]}>
                <Suspense fallback={null}>
                  <ReportsReview />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="inventory"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER", "MANAGER"]}>
                <Suspense fallback={null}>
                  <Inventory />
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
  useEffect(() => {
    window.Telegram?.WebApp?.expand();
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}
