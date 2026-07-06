import { useState, useMemo, useCallback } from "react";
import {
  useDaysOff,
  useCreateDayOff,
  useDeleteDayOff,
} from "../../../hooks/useDaysOff";
import { STAFF_ROLES } from "../constants";
import { toISODate, isPastDay } from "../utils/date";
import type { User } from "../../../types";

export function useDayOffActions(
  monthFrom: string,
  monthTo: string,
  dayOffCityId: string | undefined,
  isStaff: boolean,
  isManagerOrAdmin: boolean,
  user: { id: string } | null,
  allUsers: User[],
  filterCityId: string,
  userRole: string,
  userCityId: string | null | undefined,
) {
  const [dayOffModalDate, setDayOffModalDate] = useState<Date | null>(null);

  const { data: dayOffs = [] } = useDaysOff(monthFrom, monthTo, dayOffCityId);
  const createDayOff = useCreateDayOff();
  const deleteDayOff = useDeleteDayOff();

  const dayOffsByDate = useMemo(() => {
    const map = new Map<string, typeof dayOffs>();
    for (const d of dayOffs) {
      const key = d.date.slice(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(d);
    }
    return map;
  }, [dayOffs]);

  const staffForModal = useMemo(() => {
    const cityScope =
      userRole === "MANAGER"
        ? userCityId
        : filterCityId !== "ALL"
          ? filterCityId
          : null;
    return allUsers.filter(
      (u: User) =>
        STAFF_ROLES.includes(u.role) && (!cityScope || u.cityId === cityScope),
    );
  }, [allUsers, userRole, userCityId, filterCityId]);

  const handleDayOffClick = useCallback(
    (e: React.MouseEvent, date: Date) => {
      e.stopPropagation();
      if (isPastDay(date)) return;

      if (isStaff && user) {
        const key = toISODate(date);
        const existing = dayOffsByDate
          .get(key)
          ?.find((d: { userId: string }) => d.userId === user.id);
        if (existing) {
          deleteDayOff.mutate(existing.id);
        } else {
          createDayOff.mutate({ date: key });
        }
        return;
      }

      if (isManagerOrAdmin) {
        setDayOffModalDate(date);
      }
    },
    [isStaff, isManagerOrAdmin, user, dayOffsByDate, createDayOff, deleteDayOff],
  );

  const handleToggleStaffDayOff = useCallback(
    (targetUserId: string, existingId?: string) => {
      if (existingId) {
        deleteDayOff.mutate(existingId);
      } else if (dayOffModalDate) {
        createDayOff.mutate({
          date: toISODate(dayOffModalDate),
          userId: targetUserId,
        });
      }
    },
    [dayOffModalDate, createDayOff, deleteDayOff],
  );

  const handleLongPressDayOff = useCallback(
    (day: Date) => {
      if (isPastDay(day)) return;
      if (isStaff && user) {
        const key = toISODate(day);
        const existing = dayOffsByDate
          .get(key)
          ?.find((d: { userId: string }) => d.userId === user.id);
        if (existing) deleteDayOff.mutate(existing.id);
        else createDayOff.mutate({ date: key });
      } else if (isManagerOrAdmin) {
        setDayOffModalDate(day);
      }
    },
    [isStaff, isManagerOrAdmin, user, dayOffsByDate, createDayOff, deleteDayOff],
  );

  return {
    dayOffsByDate,
    staffForModal,
    dayOffModalDate,
    setDayOffModalDate,
    handleDayOffClick,
    handleToggleStaffDayOff,
    handleLongPressDayOff,
  };
}
