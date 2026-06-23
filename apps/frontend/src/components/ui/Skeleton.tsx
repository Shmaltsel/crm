export const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
    <div className="h-44 bg-slate-200 w-full"></div>
    <div className="p-5 flex flex-col gap-3">
      <div className="h-6 bg-slate-200 rounded w-1/2"></div>
      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
    </div>
  </div>
);