import { useState } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export default function CollapsibleSection({
  title,
  subtitle,
  children,
  defaultExpanded = false,
}: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between gap-2 p-1 active:scale-[0.98] transition-transform duration-fast"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-5 h-5 rounded-md bg-brand/10 flex items-center justify-center text-xs shrink-0`}>
            <span className="text-brand">📊</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-content-primary truncate">
              {title}
            </p>
            {subtitle && (
              <p className="text-2xs text-content-muted truncate">{subtitle}</p>
            )}
          </div>
        </div>
        <span
          className="chevron-icon text-brand shrink-0"
          data-rotate={expanded ? "true" : "false"}
        >
          ▼
        </span>
      </button>

      <div
        className="collapse-content mt-3"
        data-expanded={expanded ? "true" : "false"}
      >
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
