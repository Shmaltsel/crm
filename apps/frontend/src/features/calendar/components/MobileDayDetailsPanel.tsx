import { motion, AnimatePresence } from "framer-motion";
import { toISODate } from "../utils/date";
import { PROJECT_HEX } from "../constants";
import type { Event as CalendarEvent, DayOff, User } from "../../../types";

interface MobileDayDetailsPanelProps {
  selectedMobileDate: Date;
  selectedDayEvents: CalendarEvent[];
  dayOffsByDate: Map<string, DayOff[]>;
  allUsers: User[];
  projectHexMap: Map<string, string>;
  navigate: (path: string) => void;
}

export default function MobileDayDetailsPanel({
  selectedMobileDate,
  selectedDayEvents,
  dayOffsByDate,
  allUsers,
  projectHexMap,
  navigate,
}: MobileDayDetailsPanelProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={toISODate(selectedMobileDate)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="mt-4"
      >
        <h3 className="text-sm font-bold text-slate-800 mb-2.5">
          {selectedMobileDate.toLocaleDateString("uk-UA", {
            day: "2-digit",
            month: "long",
            weekday: "long",
          })}
        </h3>

        {(() => {
          const key = toISODate(selectedMobileDate);
          const dayOffEntries = dayOffsByDate.get(key) ?? [];
          if (dayOffEntries.length === 0) return null;
          return (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {dayOffEntries.map((d: DayOff) => {
                const u = allUsers.find((au: User) => au.id === d.userId);
                return (
                  <span
                    key={d.id}
                    className="text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-1 rounded-full"
                  >
                    🌴 {u?.name || "Вихідний"}
                  </span>
                );
              })}
            </div>
          );
        })()}

        {selectedDayEvents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400 text-sm">
            На цей день подій не заплановано
          </div>
        ) : (
          <div className="space-y-3">
            {selectedDayEvents.map((ev: CalendarEvent) => (
              <div
                key={ev.id}
                onClick={() =>
                  ev.school && navigate(`/schools/${ev.school.id}`)
                }
                className="bg-white p-4 rounded-2xl border-l-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
                style={{
                  borderLeftColor:
                    projectHexMap.get(ev.project) ?? PROJECT_HEX.blue,
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                    🕒 {ev.time || "Не вказано"}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {ev.project}
                  </span>
                </div>
                <p className="font-bold text-slate-800">
                  {ev.school?.name}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  🚐 Екіпаж: {ev.crew?.name || "Не призначено"}
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
