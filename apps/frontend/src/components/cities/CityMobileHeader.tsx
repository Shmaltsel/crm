import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";
import type { City, IssueReport } from "../../types";
import { CITY_ICONS, DEFAULT_CITY_ICON } from "../../constants/cityIcons";

interface Props {
  selectedCity: City | null;
  cities: City[];
}

const STATUSES = ["Планується", "Виконується", "Виконано"];

const STATUS_STYLES: Record<string, string> = {
  Планується: "bg-amber-50 text-amber-700 border-amber-200",
  Виконується: "bg-blue-50 text-blue-700 border-blue-200",
  Виконано: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function getNextStatus(current: string) {
  const idx = STATUSES.indexOf(current);
  return STATUSES[(idx + 1) % STATUSES.length];
}

export default function CityMobileHeader({ selectedCity, cities }: Props) {
  const navigate = useNavigate();
  const [issues, setIssues] = useState<IssueReport[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListExiting, setIsListExiting] = useState(false);
  const [exitingIssueId, setExitingIssueId] = useState<string | null>(null);
  const [issuesVisible, setIssuesVisible] = useState(false);
  const [issuesExiting, setIssuesExiting] = useState(false);

  useEffect(() => {
    if (!selectedCity?.id) {
      setIssues([]);
      return;
    }
    api
      .get(`/issues?cityId=${selectedCity.id}`)
      .then((res) => {
        const filtered = res.data.filter((i: IssueReport) => i.status !== "Виконано");
        setIssues(filtered);
        if (filtered.length > 0) {
          setIssuesExiting(false);
          setIssuesVisible(true);
        } else {
          setIssuesExiting(true);
          setTimeout(() => {
            setIssuesVisible(false);
            setIssuesExiting(false);
          }, 300);
        }
      })
      .catch(console.error);
  }, [selectedCity?.id]);

  const handleStatusToggle = async (issue: IssueReport) => {
    const nextStatus = getNextStatus(issue.status);

    if (nextStatus === "Виконано") {
      setExitingIssueId(issue.id);
      setTimeout(() => {
        setIssues((prev) => {
          const next = prev.filter((i) => i.id !== issue.id);
          if (next.length === 0) {
            setIsExpanded(false);
            setIssuesExiting(true);
            setTimeout(() => {
              setIssuesVisible(false);
              setIssuesExiting(false);
            }, 300);
          }
          return next;
        });
        setExitingIssueId(null);
      }, 400);
    } else {
      setIssues((prev) =>
        prev.map((i) => (i.id === issue.id ? { ...i, status: nextStatus } : i)),
      );
    }

    api
      .patch(`/issues/${issue.id}/status`, { status: nextStatus })
      .catch((e) => {
        console.error(e);
        setIssues((prev) =>
          prev.map((i) =>
            i.id === issue.id ? { ...i, status: issue.status } : i,
          ),
        );
      });
  };

  const currentCityData = cities?.find((c: City) => c.id === selectedCity?.id);
  const totalEvents =
    (currentCityData?.plannedEvents || 0) +
    (currentCityData?.completedEvents || 0);
  const schoolsCount = currentCityData?.schoolsCount || 0;

  return (
    <div className="md:hidden flex flex-col gap-4 mb-4">
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 1; transform: translateY(0); max-height: 200px; }
          to { opacity: 0; transform: translateY(-8px); max-height: 0; }
        }
        @keyframes expandDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cityNameChange {
          0% { opacity: 1; transform: translateY(0); }
          40% { opacity: 0; transform: translateY(-6px); }
          60% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .city-name-change {
          animation: cityNameChange 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .issues-enter {
          animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .issues-exit {
          animation: slideUp 0.3s ease-in forwards;
          overflow: hidden;
        }
        .expand-enter {
          animation: expandDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        @keyframes collapseUp {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-8px); }
        }
        .expand-exit {
          animation: collapseUp 0.22s ease-in forwards;
        }
        @keyframes statusFlash {
          0% { transform: scale(1); }
          40% { transform: scale(0.95); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        .status-flash {
          animation: statusFlash 0.2s ease-out;
        }
      `}</style>

      {/* Сповіщення про проблему з розгортанням */}
      {issuesVisible && (
        <div
          className={`bg-danger-subtle border border-red-100 rounded-2xl p-4 flex flex-col gap-3 shadow-sm ${issuesExiting ? "issues-exit" : "issues-enter"}`}
        >
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => {
              if (isExpanded) {
                setIsListExiting(true);
                setTimeout(() => {
                  setIsExpanded(false);
                  setIsListExiting(false);
                }, 250);
              } else {
                setIsExpanded(true);
              }
            }}
          >
            <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0 text-xl shadow-sm">
              🔔
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 text-sm">
                {issues.length} активн
                {issues.length === 1
                  ? "а проблема"
                  : issues.length < 5
                    ? "і проблеми"
                    : "их проблем"}
              </p>
              {!isExpanded && (
                <p className="text-xs text-content-secondary truncate mt-0.5">
                  {issues[0]?.schoolName}
                </p>
              )}
            </div>
            <button
              className="text-slate-400 hover:text-slate-600 text-2xl font-light transition-transform duration-300"
              style={{
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              ›
            </button>
          </div>

          {/* Розгорнутий список проблем */}
          {isExpanded && (
            <div
              className={`flex flex-col gap-3 mt-2 pt-3 border-t border-red-100/50 ${isListExiting ? "expand-exit" : "expand-enter"}`}
            >
              {issues.map((issue) => {
                const isExiting = exitingIssueId === issue.id;
                return (
                  <div
                    key={issue.id}
                    className={`bg-white rounded-2xl p-4 border border-red-100 shadow-sm relative transition-all duration-400 ease-in-out transform origin-top ${
                      isExiting
                        ? "opacity-0 scale-95 h-0 overflow-hidden !p-0 border-0"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    <p className="text-[11px] text-slate-400 mb-1">
                      {new Date(issue.createdAt).toLocaleDateString("uk-UA", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
              <p className="font-bold text-content-primary text-sm">
                      {issue.schoolName}
                    </p>
                    <p className="text-[11px] text-slate-500 mb-3">
                      {issue.eventName}
                    </p>

                    <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 italic leading-relaxed border border-slate-100 mb-3">
                      "{issue.message}"
                    </p>

                    <button
                      onClick={() => handleStatusToggle(issue)}
                      key={issue.status}
                      className={`status-flash w-full text-xs font-bold px-3 py-2.5 rounded-lg border transition-colors text-left flex items-center gap-1.5 ${STATUS_STYLES[issue.status] || STATUS_STYLES["Планується"]}`}
                    >
                      <span className="text-[10px]">●</span> {issue.status}{" "}
                      <span className="font-normal opacity-70">
                        → натисни щоб змінити
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Поточне місто */}
      {selectedCity?.id && (
        <div className="bg-white border border-blue-50 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
              Поточне місто
            </span>
            <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
              ✓ Активне місто
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full text-lg city-name-change">
              {CITY_ICONS[selectedCity.name] || DEFAULT_CITY_ICON}
            </div>
            <h2
              key={selectedCity.id}
              className="text-2xl font-bold text-slate-800 city-name-change"
            >
              {selectedCity.name}
            </h2>
          </div>

          <div className="flex items-center justify-between text-xs font-medium gap-2">
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
              <span className="text-blue-500 text-sm">📅</span> {totalEvents}{" "}
              подій
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
              <span className="text-blue-500 text-sm">🏫</span> {schoolsCount}{" "}
              шкіл
            </div>
            <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-2 rounded-xl">
              <span className="text-sm">⚠️</span> {issues.length} проблем
            </div>
            {/* <button 
              onClick={() => navigate(`/cities/${selectedCity.id}`)} 
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-blue-600 shadow-sm shrink-0"
            >
              →
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}
