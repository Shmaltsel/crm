import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface VirtualSchoolListProps {
  schools: any[];
  renderItem: (school: any, index: number) => JSX.Element;
  itemHeight?: number;
}

export default function VirtualSchoolList({ schools, renderItem, itemHeight = 120 }: VirtualSchoolListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: schools.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="h-[calc(100vh-200px)] overflow-auto w-full">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {renderItem(schools[virtualRow.index], virtualRow.index)}
          </div>
        ))}
      </div>
    </div>
  );
}