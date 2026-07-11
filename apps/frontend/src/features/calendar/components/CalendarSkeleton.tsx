export default function CalendarSkeleton() {
  return (
    <div className="p-4 md:p-8 bg-surface-muted min-h-screen pb-24 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="h-8 w-52 bg-surface-muted rounded-xl mb-2" />
          <div className="h-4 w-72 bg-surface-muted rounded-lg mb-4" />
          <div className="flex gap-3 mt-4">
            {[80, 100, 90].map((w, i) => (
              <div
                key={i}
                className="h-4 bg-surface-muted rounded-full"
                style={{ width: w }}
              />
            ))}
          </div>
        </div>
        <div className="h-10 w-48 bg-surface-muted rounded-xl" />
      </div>

      <div className="bg-white rounded-[24px] border border-border overflow-hidden">
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-border">
          <div className="h-8 w-36 bg-surface-muted rounded-xl" />
          <div className="h-10 w-44 bg-surface-muted rounded-2xl" />
        </div>

        <div className="grid grid-cols-7 bg-surface-muted/50">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((d) => (
            <div key={d} className="py-3 flex justify-center">
              <div className="h-3 w-6 bg-surface-muted rounded" />
            </div>
          ))}

          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="min-h-[80px] md:min-h-[120px] border-b border-r border-border p-2"
            >
              <div className="flex justify-end mb-2">
                <div className="w-7 h-7 rounded-full bg-surface-muted" />
              </div>
              {i % 4 === 0 && (
                <div className="h-5 bg-surface-muted rounded-md mb-1.5 mx-0.5" />
              )}
              {i % 7 === 2 && (
                <div className="h-5 bg-surface-muted rounded-md mx-0.5" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 md:hidden">
        <div className="h-6 w-40 bg-surface-muted rounded-lg mb-3" />
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-2xl border-l-4 border-l-border-strong shadow-sm"
            >
              <div className="flex justify-between mb-2">
                <div className="h-5 w-20 bg-surface-muted rounded" />
                <div className="h-5 w-28 bg-surface-muted rounded" />
              </div>
              <div className="h-5 w-48 bg-surface-muted rounded mb-1" />
              <div className="h-4 w-36 bg-surface-muted rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
