import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVirtualizer } from "@tanstack/react-virtual";
import { SchoolRow } from "./SchoolDesktopTable";
import type { School, PipelineStage } from "../../types";

interface Props {
  schools: School[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
  onEndReached?: () => void;
}

export default function VirtualDesktopTable({
  schools,
  searchQuery,
  onDelete,
  stages,
  onEndReached,
}: Props) {
  const navigate = useNavigate();
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: schools.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 57,
    overscan: 8,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastItem = virtualItems[virtualItems.length - 1];

  useEffect(() => {
    if (!onEndReached || !lastItem) return;
    if (lastItem.index >= schools.length - 5) {
      onEndReached();
    }
  }, [lastItem?.index, schools.length, onEndReached]);

  return (
    <div ref={parentRef} className="overflow-y-auto flex-1 h-full min-w-0">
      <table className="w-full text-left border-collapse table-fixed">
        <colgroup>
          <col style={{ width: "42%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "13%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead className="sticky top-0 z-10 bg-slate-50">
          <tr className="border-b border-slate-100">
            <th className="p-4 font-medium text-slate-600">Назва школи</th>
            <th className="p-4 font-medium text-slate-600">Місто</th>
            <th className="p-4 font-medium text-slate-600">Статус</th>
            <th className="p-4 font-medium text-slate-600">Поточний етап</th>
            <th className="p-4 font-medium text-slate-600 text-center">Дія</th>
          </tr>
        </thead>
        <tbody>
          {virtualItems.length > 0 && (
            <tr>
              <td
                colSpan={5}
                style={{ height: `${virtualItems[0].start}px`, padding: 0, border: "none" }}
              />
            </tr>
          )}
          {virtualItems.map((virtualRow) => (
            <SchoolRow
              key={schools[virtualRow.index].id}
              school={schools[virtualRow.index]}
              onDelete={onDelete}
              stages={stages}
              navigate={navigate}
            />
          ))}
          {virtualItems.length > 0 && (
            <tr>
              <td
                colSpan={5}
                style={{
                  height: `${rowVirtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end}px`,
                  padding: 0,
                  border: "none",
                }}
              />
            </tr>
          )}
        </tbody>
      </table>

      {schools.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-sm font-medium">
          {searchQuery
            ? `Нічого не знайдено за «${searchQuery}»`
            : "Шкіл ще немає"}
        </div>
      )}
    </div>
  );
}
