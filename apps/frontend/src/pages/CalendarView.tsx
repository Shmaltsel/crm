import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import DayOffModal from "../components/calendar/DayOffModal";
import { STAFF_ROLES, MANAGER_ROLES } from "../features/calendar/constants";
import { toISODate } from "../features/calendar/utils/date";
import { useCalendarMonth } from "../features/calendar/hooks/useCalendarMonth";
import { useCalendarData } from "../features/calendar/hooks/useCalendarData";
import { useDayOffActions } from "../features/calendar/hooks/useDayOffActions";
import { useLongPress } from "../features/calendar/hooks/useLongPress";
import CalendarHeader from "../features/calendar/components/CalendarHeader";
import DesktopCalendarGrid from "../features/calendar/components/DesktopCalendarGrid";
import MobileCalendarGrid from "../features/calendar/components/MobileCalendarGrid";
import MobileDayDetailsPanel from "../features/calendar/components/MobileDayDetailsPanel";

export default function CalendarView() {
  const {
    days, year, month, monthFrom, monthTo,
    selectedMobileDate, setSelectedMobileDate,
    nextMonth, prevMonth,
  } = useCalendarMonth();

  const { user } = useAuth();
  const navigate = useNavigate();

  const userRole = user?.role || "GUEST";
  const isStaff = STAFF_ROLES.includes(userRole);
  const isManagerOrAdmin = MANAGER_ROLES.includes(userRole);

  const [filterCityId, setFilterCityId] = useState<string>(() =>
    userRole === "MANAGER" && user?.cityId ? user.cityId : "ALL",
  );

  const {
    eventsLoading, isFetching, error: eventsError, projects, cities, allUsers,
    eventsByDate, projectColorMap, projectHexMap,
  } = useCalendarData(filterCityId, monthFrom, monthTo);

  const dayOffCityId = isManagerOrAdmin
    ? filterCityId !== "ALL" ? filterCityId : undefined
    : undefined;

  const {
    dayOffsByDate, pendingRequestsByDate, staffForModal, dayOffModalDate,
    setDayOffModalDate, handleDayOffClick,
    handleToggleStaffDayOff, handleLongPressDayOff,
  } = useDayOffActions(
    monthFrom, monthTo, dayOffCityId, isStaff, isManagerOrAdmin,
    user, allUsers, filterCityId, userRole, user?.cityId,
  );

  const { startLongPress, cancelLongPress, wasLongPress, pressingDay, triggeredDay } = useLongPress(handleLongPressDayOff);

  const handleMobileDayTap = useCallback(
    (day: Date) => {
      if (wasLongPress()) return;
      setSelectedMobileDate(day);
    },
    [setSelectedMobileDate, wasLongPress],
  );

  const selectedDayEvents = eventsByDate.get(toISODate(selectedMobileDate)) ?? [];

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen pb-24">
      {isFetching && !eventsLoading && (
        <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-brand/20">
          <div className="h-full bg-brand animate-[loadingBar_1.5s_ease-in-out_infinite]" />
        </div>
      )}

      {eventsError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          Помилка завантаження подій. Спробуйте оновити сторінку.
        </div>
      )}

      <CalendarHeader
        projects={projects}
        filterCityId={filterCityId}
        setFilterCityId={setFilterCityId}
        cities={cities}
        userRole={userRole}
      />

      <div className="hidden md:block">
        <DesktopCalendarGrid
          days={days}
          year={year}
          month={month}
          selectedMobileDate={selectedMobileDate}
          setSelectedMobileDate={setSelectedMobileDate}
          eventsByDate={eventsByDate}
          dayOffsByDate={dayOffsByDate}
          pendingRequestsByDate={pendingRequestsByDate}
          projectColorMap={projectColorMap}
          projectHexMap={projectHexMap}
          isStaff={isStaff}
          isManagerOrAdmin={isManagerOrAdmin}
          user={user}
          allUsers={allUsers}
          handleDayOffClick={handleDayOffClick}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
      </div>

      <div className="md:hidden mt-4">
        <MobileCalendarGrid
          days={days}
          year={year}
          month={month}
          selectedMobileDate={selectedMobileDate}
          eventsByDate={eventsByDate}
          dayOffsByDate={dayOffsByDate}
          pendingRequestsByDate={pendingRequestsByDate}
          projectHexMap={projectHexMap}
          projects={projects}
          filterCityId={filterCityId}
          setFilterCityId={setFilterCityId}
          cities={cities}
          userRole={userRole}
          user={user}
          handleMobileDayTap={handleMobileDayTap}
          startLongPress={startLongPress}
          cancelLongPress={cancelLongPress}
          pressingDay={pressingDay}
          triggeredDay={triggeredDay}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />

        <MobileDayDetailsPanel
          selectedMobileDate={selectedMobileDate}
          selectedDayEvents={selectedDayEvents}
          dayOffsByDate={dayOffsByDate}
          allUsers={allUsers}
          projectHexMap={projectHexMap}
          navigate={navigate}
        />
      </div>

      <DayOffModal
        isOpen={!!dayOffModalDate}
        onClose={() => setDayOffModalDate(null)}
        date={dayOffModalDate}
        staff={staffForModal}
        dayOffs={
          dayOffModalDate
            ? (dayOffsByDate.get(toISODate(dayOffModalDate)) ?? [])
            : []
        }
        onToggle={handleToggleStaffDayOff}
      />
    </div>
  );
}
