import { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { School } from "../types";

interface VirtualSchoolListProps {
  schools: School[];
  renderItem: (school: School, index: number) => JSX.Element;
  itemHeight?: number;
  onEndReached?: () => void;
  animationKey?: string | number;
}

export default function VirtualSchoolList({
  schools,
  renderItem,
  itemHeight = 120,
  onEndReached,
  animationKey,
}: VirtualSchoolListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: schools.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
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
    <div ref={parentRef} className="h-[calc(100vh-200px)] overflow-auto w-full">
      <style>{`
        @keyframes schoolRowIn {
          from { opacity: 0; transform: translateX(-14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .school-row-enter {
          animation: schoolRowIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: both;
        }
      `}</style>
      <div
        key={animationKey}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
              animationDelay: `${Math.min(virtualRow.index * 40, 400)}ms`,
            }}
            className="school-row-enter"
          >
            {renderItem(schools[virtualRow.index], virtualRow.index)}
          </div>
        ))}
      </div>
    </div>
  );
}
