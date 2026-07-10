import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useAuth } from "../context/AuthContext";
import { DASHBOARD_TABS } from "../constants/navTabs";
import { hasRole } from "../utils/roles";
import DashboardTopNav from "../components/dashboard/DashboardTopNav";
import TabErrorBoundary from "../components/dashboard/TabErrorBoundary";

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

export default function Dashboard() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const swiperRef = useRef<any>(null);
  const prevTabRef = useRef<string>("");

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

  useEffect(() => {
    if (prevTabRef.current && prevTabRef.current !== activeTab) {
      window.dispatchEvent(
        new CustomEvent("tab_switch", {
          detail: { from: prevTabRef.current, to: activeTab },
        }),
      );
    }
    prevTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    if (!allowedIds.includes(activeTab)) {
      const fallback = allowedIds[0] ?? "overview";
      setActiveTab(fallback);
      setSearchParams({ tab: fallback }, { replace: true });
    }
  }, [allowedIds, activeTab, setSearchParams]);

  const handleTabChange = useCallback(
    (id: string) => {
      const idx = allowedIds.indexOf(id);
      if (idx !== -1 && swiperRef.current) {
        swiperRef.current.slideTo(idx);
      }
      setActiveTab(id);
      setSearchParams({ tab: id }, { replace: true });
      sessionStorage.setItem("dashboard:lastTab", id);
    },
    [allowedIds, setSearchParams],
  );

  const handleSlideChange = useCallback(
    (swiper: any) => {
      const id = allowedIds[swiper.activeIndex];
      if (id && id !== activeTab) {
        setActiveTab(id);
        setSearchParams({ tab: id }, { replace: true });
        sessionStorage.setItem("dashboard:lastTab", id);
      }
    },
    [allowedIds, activeTab, setSearchParams],
  );

  return (
    <div className="bg-gradient-subtle min-h-screen flex flex-col">
      <DashboardTopNav
        tabs={allowedTabs}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      <div className="flex-1">
        <Swiper
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          initialSlide={allowedIds.indexOf(activeTab)}
          onSlideChange={handleSlideChange}
          speed={280}
          allowTouchMove={true}
          className="dashboard-swiper"
        >
          {allowedTabs.map((tab) => {
            const Component = TAB_COMPONENTS[tab.id];
            return (
            <SwiperSlide key={tab.id}>
              <div className="md:p-4 lg:p-8">
                <TabErrorBoundary label={tab.label}>
                  <Suspense fallback={<div className="text-sm text-content-muted p-4">Завантаження...</div>}>
                    <Component />
                  </Suspense>
                </TabErrorBoundary>
              </div>
            </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
