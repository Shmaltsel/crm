import { useState } from "react";

interface Props {
  title: string;
  icon?: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

export default function MobileCollapsible({
  title,
  icon = "📋",
  defaultExpanded = true,
  children,
}: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="md:hidden w-full flex items-center justify-between gap-2 py-2 px-1 active:scale-[0.98] transition-transform duration-fast"
        aria-expanded={expanded}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-content-primary">
          <span>{icon}</span> {title}
        </span>
        <span
          className="chevron-icon text-content-muted text-xs shrink-0"
          data-rotate={expanded ? "true" : "false"}
        >
          ▼
        </span>
      </button>
      <div
        className="collapse-content"
        data-expanded={expanded ? "true" : "false"}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
