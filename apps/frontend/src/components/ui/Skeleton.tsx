interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`bg-neutral-200 rounded-control motion-reduce:animate-none animate-pulse ${className}`}
    />
  );
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 3, className = "" }: SkeletonTextProps) {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`bg-neutral-200 rounded-control motion-reduce:animate-none animate-pulse h-4 ${
            i === lines - 1 ? "w-3/4" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}

interface SkeletonCircleProps {
  size?: number;
  className?: string;
}

export function SkeletonCircle({ size = 40, className = "" }: SkeletonCircleProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`bg-neutral-200 rounded-full motion-reduce:animate-none animate-pulse ${className}`}
    />
  );
}

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = "" }: SkeletonCardProps) {
  return (
    <div className={`bg-surface rounded-card shadow-card border border-border overflow-hidden ${className}`}>
      <div className="relative overflow-hidden bg-neutral-100 h-44">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent motion-reduce:animate-none animate-shimmer" />
      </div>
      <div className="p-5 flex flex-col gap-3">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
