import { Skeleton } from "../ui/Skeleton";

export default function SchoolProfileSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-40 w-full rounded-card" />

      <div className="xl:hidden space-y-6">
        <div className="space-y-6">
          <Skeleton className="h-24 w-full rounded-card" />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Skeleton className="h-48 w-full rounded-card" />
            <Skeleton className="h-48 w-full rounded-card" />
          </div>
          <Skeleton className="h-32 w-full rounded-card" />
          <Skeleton className="h-32 w-full rounded-card" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-card" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-card" />
          <Skeleton className="h-48 w-full rounded-card" />
        </div>
      </div>

      <div className="hidden xl:grid xl:grid-cols-2 xl:gap-6">
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-card" />
          <Skeleton className="h-48 w-full rounded-card" />
          <Skeleton className="h-48 w-full rounded-card" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-32 w-full rounded-card" />
          <Skeleton className="h-48 w-full rounded-card" />
          <Skeleton className="h-32 w-full rounded-card" />
        </div>
      </div>
    </div>
  );
}
