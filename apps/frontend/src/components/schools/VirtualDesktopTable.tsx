import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useVirtualizer } from "@tanstack/react-virtual";
import { SchoolRow } from "./SchoolDesktopTable";

interface Props {
  schools: any[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: any[];
}

export default function VirtualDesktopTable({ schools, searchQuery, onDelete, stages }: Props) {
  const navigate = useNavigate();
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: schools.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 57, // висота tr з padding p-4
    overscan: 8,
  });

  return (
    <div ref={parentRef} className="overflow-y-auto flex-1 h-full">
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 z-10 bg-slate-50">
          <tr className="border-b border-slate-100">
            <th className="p-4 font-medium text-slate-600">Назва школи</th>
            <th className="p-4 font-medium text-slate-600">Місто</th>
            <th className="p-4 font-medium text-slate-600">Статус</th>
            <th className="p-4 font-medium text-slate-600">Поточний етап</th>
            <th className="p-4 font-medium text-slate-600 text-center">Дія</th>
          </tr>
        </thead>
        <tbody
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
            display: "block",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <tr
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                display: "table",
                tableLayout: "fixed",
              }}
            >
              <SchoolRow
                school={schools[virtualRow.index]}
                onDelete={onDelete}
                stages={stages}
                navigate={navigate}
              />
            </tr>
          ))}
        </tbody>
      </table>

      {schools.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-sm font-medium">
          {searchQuery ? `Нічого не знайдено за «${searchQuery}»` : "Шкіл ще немає"}
        </div>
      )}
    </div>
  );
}