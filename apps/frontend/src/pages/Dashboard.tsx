import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { DASHBOARD_TABS } from "../constants/navTabs";
import { hasRole } from "../utils/roles";
import DashboardTopNav from "../components/dashboard/DashboardTopNav";
import TabErrorBoundary from "../components/dashboard/TabErrorBoundary";
import { SkeletonCard } from "../components/ui/Skeleton";

const OverviewTab = lazy(() => import("./OverviewTab"));
const ReportsTab = lazy(() => import("../features/reports/pages/ReportsReviewPage"));
const LeaderboardTab = lazy(() => import("./CityLeaderboard"));
const AnalyticsTab = lazy(() => import("./Analytics"));

const TAB_COMPONENTS: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  overview: OverviewTab,
  reports: ReportsTab,
  leaderboard: LeaderboardTab,
  analytics: AnalyticsTab,
};

const SWIPE_THRESHOLD = 60;

function PageLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

const tabVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function Dashboard() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const [ready, setReady] = useState(false);

  const allowedTabs = useMemo(
    () => DASHBOARD_TABS.filter((t) => hasRole(user?.role, t.roles)),
    [user],
  );
  const allowedIds = useMemo(() => allowedTabs.map((t) => t.id), [allowedTabs]);

  const resolveInitial = useCallback(() => {
    const fromUrl = searchParams.get("tab");
    if (fromUrl && allowedIds.includes(fromUrl)) return fromUrl;
    const fromStorage = sessionStorage.getItem("dashboard:lastTab");
    if (fromStorage && allowedIds.includes(fromStorage)) return fromStorage;
    return allowedIds[0] ?? "overview";
  }, [searchParams, allowedIds]);

  const [activeTab, setActiveTab] = useState(() => resolveInitial());
  const prevTabRef = useRef(activeTab);

  useEffect(() => {
    if (prevTabRef.current !== activeTab) {
      window.dispatchEvent(
        new CustomEvent("tab_switch", {
          detail: { from: prevTabRef.current, to: activeTab },
        }),
      );
      prevTabRef.current = activeTab;
    }
  }, [activeTab]);

  useEffect(() => {
    if (!ready) {
      setReady(true);
      return;
    }
    if (!allowedIds.includes(activeTab)) {
      const fallback = allowedIds[0] ?? "overview";
      setActiveTab(fallback);
      setSearchParams({ tab: fallback }, { replace: true });
    }
  }, [allowedIds, activeTab, ready, setSearchParams]);

  const handleTabChange = useCallback(
    (id: string) => {
      setActiveTab(id);
      setSearchParams({ tab: id }, { replace: true });
      sessionStorage.setItem("dashboard:lastTab", id);
    },
    [setSearchParams],
  );

  const activeIdx = useMemo(
    () => allowedIds.indexOf(activeTab),
    [allowedIds, activeTab],
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      const dir = dx < 0 ? 1 : -1;
      const targetIdx = activeIdx + dir;
      if (targetIdx < 0 || targetIdx >= allowedIds.length) return;
      handleTabChange(allowedIds[targetIdx]);
    },
    [activeIdx, allowedIds, handleTabChange],
  );

  const TabContent = TAB_COMPONENTS[activeTab];

  return (
    <div
      ref={containerRef}
      data-no-swipe
      className="bg-slate-50 min-h-screen flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <DashboardTopNav
        tabs={allowedTabs}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.15 }}
            className="absolute inset-0"
          >
            <TabErrorBoundary label={allowedTabs.find((t) => t.id === activeTab)?.label}>
              <Suspense fallback={<PageLoader />}>
                {TabContent ? <TabContent /> : <PageLoader />}
              </Suspense>
            </TabErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
