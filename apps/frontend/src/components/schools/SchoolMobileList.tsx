import React from "react";
import { useNavigate } from "react-router-dom";
import type { School, PipelineStage } from "../../types";
import { CATEGORY_BADGES } from "../../constants/categoryBadges";
import { withViewTransition } from "../../lib/viewTransition";

interface Props {
  schools: School[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
}

interface SchoolCardProps {
  school: School;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
  index?: number;
}

export const SchoolCard = React.memo(
  ({ school, onDelete, stages, index = 0 }: SchoolCardProps) => {
    const navigate = useNavigate();
    const latestEvent = school.events?.[0];
    const stage = latestEvent
      ? stages.find((s) => s.key === latestEvent.status)
      : null;
    const categories = (school as any).categories as string[] | undefined;

    return (
      <div
        className="bg-surface rounded-card border border-border p-4 shadow-card transition-all hover:shadow-card-hover hover:border-brand-200 cursor-pointer active:scale-[0.99]"
        onClick={() => withViewTransition(() => navigate(`/schools/${school.id}`))}
        style={{ viewTransitionName: `school-card-${school.id}` } as React.CSSProperties}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-content-primary leading-snug text-sm line-clamp-2 flex-1">
            {school.name}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(e, school.id, school.name);
            }}
            className="text-neutral-300 hover:text-danger hover:bg-danger-subtle transition-all p-2.5 rounded-control"
          >
            🗑
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 mt-2">
          {school.phone ? (
            <a
              href={`tel:${school.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-brand font-medium truncate"
            >
              📞 {school.director || school.phone}
            </a>
          ) : (
            <span className="text-xs text-content-muted truncate">
              👤 {school.director || "Контакт не вказано"}
            </span>
          )}
          {categories && categories.length > 0 ? (
            <div className="flex flex-wrap gap-1 justify-end">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className={`text-2xs px-2 py-0.5 rounded-pill font-medium border ${CATEGORY_BADGES[cat]?.className ?? "bg-surface-muted text-content-muted border-border"}`}
                >
                  {CATEGORY_BADGES[cat]?.label ?? cat}
                </span>
              ))}
            </div>
          ) : (
            stage && (
              <span className="text-2xs px-2 py-0.5 bg-brand-50 text-brand rounded-pill font-medium border border-brand-100">
                {stage.name}
              </span>
            )
          )}
        </div>
      </div>
    );
  },
);

SchoolCard.displayName = "SchoolCard";

export default function SchoolMobileList({
  schools,
  searchQuery,
  onDelete,
  stages,
}: Props) {
  return (
    <>
      <div className="md:hidden flex-1 overflow-y-auto flex flex-col gap-3 pb-24 px-1 custom-scrollbar">
        {schools.map((school, index) => (
          <SchoolCard
            key={school.id}
            school={school}
            index={index}
            onDelete={onDelete}
            stages={stages}
          />
        ))}

        {schools.length === 0 && (
          <div className="text-center py-10 text-content-muted">
            <p>
              {searchQuery
                ? `Нічого не знайдено за «${searchQuery}»`
                : "Шкіл ще немає"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
