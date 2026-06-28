import { useState, useMemo, useCallback, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSchoolCompletedEvents } from "../hooks/useSchoolProfile";
import {
  useSchool,
  useSchoolEvents,
  useUsers,
  useUpdateEventStatus,
  useUpdatePreparation,
  useAssignCrew,
  useSubmitReport,
  useAddComment,
  useUpdateHistoryComment,
  useEventFull,
} from "../hooks/useSchoolProfile";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

const Pipeline = lazy(() => import("../components/school-profile/Pipeline"));
const HistoryTimeline = lazy(
  () => import("../components/school-profile/HistoryTimeline"),
);
const EventDetails = lazy(
  () => import("../components/school-profile/EventDetails"),
);

// Імпортуємо UI компоненти
import SchoolProfileHeader from "../components/school-profile/SchoolProfileHeader";
const SchoolInfoCard = lazy(
  () => import("../components/school-profile/SchoolInfoCard"),
);
const EventsTable = lazy(
  () => import("../components/school-profile/EventsTable"),
);
const EventPreparation = lazy(
  () => import("../components/school-profile/EventPreparation"),
);
const AssignedCrew = lazy(
  () => import("../components/school-profile/AssignedCrew"),
);
// Імпортуємо модальні вікна
import EditSchoolModal from "../components/school-profile/modals/EditSchoolModal";
import EventModal from "../components/school-profile/modals/EventModal";
import CommentModal from "../components/school-profile/modals/CommentModal";
import CrewModal from "../components/school-profile/modals/CrewModal";
import ReportModal from "../components/school-profile/modals/ReportModal";

const PIPELINE_STAGES = [
  { id: 1, key: "BASE", name: "Новий заклад" },
  { id: 2, key: "FIRST_CONTACT", name: "Знайомство" },
  { id: 3, key: "DATE_CONFIRMED", name: "Підтвердження дати" },
  { id: 4, key: "PREPARATION", name: "Оголошення" },
  { id: 5, key: "IN_PROGRESS", name: "Підготовка" },
  { id: 6, key: "DONE", name: "Проведення заходу" },
  { id: 7, key: "REPORT", name: "Звіт" },
];

export default function SchoolProfile() {
  const { id } = useParams();
  const qc = useQueryClient();

  // 1. Спочатку завантажуємо базові дані
  const { data: schoolRaw, isLoading: schoolLoading } = useSchool(id);
  const { data: eventsRaw = [], isLoading: eventsLoading } = useSchoolEvents(
    id,
    false,
  );

  // 2. Оголошуємо стейти, які потрібні для наступних запитів
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [exitingEventId, setExitingEventId] = useState<string | null>(null);

  // 3. ТЕПЕР безпечно викликаємо useEventFull, оскільки selectedEventId вже існує
  const { data: eventFull, isLoading: eventFullLoading } = useEventFull(
    selectedEventId ?? eventsRaw[0]?.id,
  );

  const { data: users = [] } = useUsers();
  const { data: completedEvents = [] } = useSchoolCompletedEvents(id);
  const [selectedReportEvent, setSelectedReportEvent] = useState<any>(null);
  const updateStatus = useUpdateEventStatus();
  const updatePreparation = useUpdatePreparation();
  const assignCrewMutation = useAssignCrew();
  const submitReportMutation = useSubmitReport();
  const addCommentMutation = useAddComment();
  const updateHistoryMutation = useUpdateHistoryComment();

  // 4. Формуємо schoolData
  const schoolData = schoolRaw
    ? {
        id: schoolRaw.id,
        cityId: schoolRaw.cityId,
        name: schoolRaw.name || "",
        type: schoolRaw.type || "Школа",
        city: schoolRaw.city?.name || "",
        address: schoolRaw.address || "",
        director: schoolRaw.director || "",
        phone: schoolRaw.phone || "",
        email: schoolRaw.email || "",
        childrenCount: schoolRaw.childrenCount || 0,
        notes: schoolRaw.notes || "",
      }
    : {
        id: "",
        cityId: "",
        name: "",
        type: "Школа",
        city: "",
        address: "",
        director: "",
        phone: "",
        email: "",
        childrenCount: 0,
        notes: "",
      };

  const events = eventsRaw;

  // 5. Оголошуємо решту стейтів (editForm залежить від schoolData, тому він тут)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [commentModal, setCommentModal] = useState({
    isOpen: false,
    mode: "pipeline",
    stepId: null as number | null,
    historyId: null as string | null,
    text: "",
  });

  const [editForm, setEditForm] = useState(schoolData);
  const [eventForm, setEventForm] = useState({
    project: "Голограма для школи",
    date: "",
    time: "11:00",
    childrenPlanned: "",
    price: "",
    address: "",
    contactPerson: "",
    contactPhone: "",
  });

  const currentEventBase = useMemo(
    () => eventsRaw.find((ev) => ev.id === selectedEventId) ?? eventsRaw[0],
    [eventsRaw, selectedEventId],
  );
  const currentEvent = useMemo(
    () =>
      eventFull?.id === currentEventBase?.id
        ? { ...currentEventBase, ...eventFull }
        : currentEventBase,
    [currentEventBase, eventFull],
  );
  const currentStageIndex = useMemo(() => {
    const idx = PIPELINE_STAGES.findIndex(
      (s) => s.key === currentEvent?.status,
    );
    return idx !== -1 ? idx : 0;
  }, [currentEvent?.status]);
  const creatorName = useMemo(
    () =>
      currentEvent?.history?.length > 0
        ? currentEvent.history[currentEvent.history.length - 1].userName
        : "Немає даних",
    [currentEvent?.history],
  );

  const handlePipelineClick = useCallback(
    (stepId: number) => {
      if (!currentEvent) return;
      const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
      if (nextStage?.id !== stepId) return;
      if (nextStage.key === "REPORT") return setIsReportModalOpen(true);
      setCommentModal({
        isOpen: true,
        mode: "pipeline",
        stepId: nextStage.id,
        historyId: null,
        text: "",
      });
    },
    [currentEvent, currentStageIndex],
  );

  const handleHistoryClick = useCallback((historyItem: any) => {
    setCommentModal({
      isOpen: true,
      mode: "history",
      stepId: null,
      historyId: historyItem.id,
      text: historyItem.comment || "",
    });
  }, []);

  const handleAddCommentClick = useCallback(() => {
    setCommentModal({
      isOpen: true,
      mode: "add_comment",
      stepId: null,
      historyId: null,
      text: "",
    });
  }, []);

  const handleSaveComment = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (commentModal.mode === "pipeline") {
        const activeStage = PIPELINE_STAGES[currentStageIndex];
        const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
        if (!nextStage) return;
        await updateStatus.mutateAsync({
          eventId: currentEvent.id,
          status: nextStage.key,
          actionName: `Етап пройдено: ${activeStage.name}`,
          comment: commentModal.text,
        });
        if (nextStage.key === "RE_SALE") {
          setExitingEventId(currentEvent.id);
          setTimeout(() => {
            setSelectedEventId(null);
            setExitingEventId(null);
          }, 500);
        }
      } else if (commentModal.mode === "add_comment") {
        await addCommentMutation.mutateAsync({
          eventId: currentEvent.id,
          comment: commentModal.text,
        });
      } else if (commentModal.mode === "history" && commentModal.historyId) {
        await updateHistoryMutation.mutateAsync({
          historyId: commentModal.historyId,
          comment: commentModal.text,
          eventId: currentEvent.id,
        });
      }
      setCommentModal({
        isOpen: false,
        mode: "pipeline",
        stepId: null,
        historyId: null,
        text: "",
      });
    },
    [
      commentModal,
      currentEvent,
      currentStageIndex,
      updateStatus,
      addCommentMutation,
      updateHistoryMutation,
    ],
  );

  const handleSaveEvent = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const payload = {
          ...eventForm,
          schoolId: schoolData.id,
          cityId: schoolData.cityId,
          childrenPlanned: Number(eventForm.childrenPlanned),
          price: Number(eventForm.price),
        };
        const res = await api.post("/events", payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setIsEventModalOpen(false);
        qc.invalidateQueries({ queryKey: ["schoolEvents", id] });
        setSelectedEventId(res.data.id);
      } catch (e) {
        console.error(e);
      }
    },
    [eventForm, schoolData, id, qc],
  );

  const handleSaveSchoolInfo = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await api.patch(`/schools/${id}`, editForm, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        qc.invalidateQueries({ queryKey: ["school", id] });
        setIsEditModalOpen(false);
      } catch (e) {
        console.error(e);
      }
    },
    [editForm, id, qc],
  );

  const handleUpdatePreparation = useCallback(
    async (field: string, status: string) => {
      if (!currentEvent) return;
      await updatePreparation.mutateAsync({
        eventId: currentEvent.id,
        field,
        status,
      });
    },
    [currentEvent, updatePreparation],
  );

  const handleSubmitReport = useCallback(
    async (reportData: any) => {
      if (!currentEvent) return;
      await submitReportMutation.mutateAsync({
        eventId: currentEvent.id,
        reportData,
      });
      await updateStatus.mutateAsync({
        eventId: currentEvent.id,
        status: "RE_SALE",
        actionName: "Звіт сформовано. Захід завершено.",
      });
      setExitingEventId(currentEvent.id);
      setTimeout(() => {
        setSelectedEventId(null);
        setExitingEventId(null);
      }, 500);
      setIsReportModalOpen(false);
    },
    [currentEvent, submitReportMutation, updateStatus],
  );

  const handleAssignCrew = useCallback(
    async (crewId: string) => {
      await assignCrewMutation.mutateAsync({
        eventId: currentEvent.id,
        crewId,
      });
      return updatePreparation.mutateAsync({
        eventId: currentEvent.id,
        field: "assignCrew",
        status: "Виконано",
      });
      setIsCrewModalOpen(false);
    },
    [currentEvent, assignCrewMutation, updatePreparation],
  );

  const openAddEventModal = useCallback(() => {
    setEventForm((prev) => ({
      ...prev,
      address: schoolData.address,
      contactPerson: schoolData.director,
      contactPhone: schoolData.phone,
      childrenPlanned: String(schoolData.childrenCount),
    }));
    setIsEventModalOpen(true);
  }, [schoolData]);
  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: 0.1 + i * 0.07, ease: "easeOut" },
  });

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen text-slate-800 font-sans w-full overflow-x-hidden pb-24 md:pb-8">
      <SchoolProfileHeader
        schoolData={schoolData}
        onEdit={() => {
          setEditForm(schoolData);
          setIsEditModalOpen(true);
        }}
        onAddEvent={openAddEventModal}
      />

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Ліва колонка */}
        <div className="w-full xl:w-80 flex flex-col gap-6">
          <motion.div {...stagger(0)}>
            <Suspense
              fallback={
                <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
              }
            >
              <SchoolInfoCard schoolData={schoolData} />
            </Suspense>
          </motion.div>

          <AnimatePresence>
            {currentEvent && currentStageIndex >= 1 && (
              <motion.div
                key="responsible"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
              >
                <h3 className="font-bold text-slate-800 mb-4">
                  Відповідальна особа
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-slate-500">Остання дія:</span>
                    <span className="font-medium text-blue-600">
                      {creatorName}
                    </span>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div {...stagger(1)}>
            <Suspense
              fallback={
                <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
              }
            >
              <HistoryTimeline
                currentEvent={
                  eventFullLoading ? currentEventBase : currentEvent
                }
                onHistoryClick={handleHistoryClick}
                onAddCommentClick={handleAddCommentClick}
              />
            </Suspense>
          </motion.div>
        </div>

        {/* Права колонка */}
        <motion.div
          className={`flex-1 flex flex-col gap-6 transition-all duration-500 ease-in-out transform origin-top ${
            exitingEventId === currentEvent?.id
              ? "opacity-0 scale-95 -translate-y-4 pointer-events-none"
              : ""
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {currentEvent && (
            <Suspense
              fallback={
                <div className="bg-white rounded-2xl h-24 animate-pulse border border-slate-100" />
              }
            >
              <Pipeline
                currentStageIndex={currentStageIndex}
                currentEvent={currentEvent}
                onPipelineClick={handlePipelineClick}
                stages={PIPELINE_STAGES}
              />
            </Suspense>
          )}

          <AnimatePresence>
            {currentEvent && currentStageIndex >= 4 && (
              <motion.div
                key="preparation"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 xl:grid-cols-2 gap-6"
              >
                {eventFullLoading ? (
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-pulse h-48" />
                ) : (
                  <Suspense
                    fallback={
                      <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
                    }
                  >
                    <EventPreparation
                      data={currentEvent.preparation || {}}
                      onUpdate={handleUpdatePreparation}
                      onOpenCrewModal={() => setIsCrewModalOpen(true)}
                    />
                  </Suspense>
                )}
                <Suspense
                  fallback={
                    <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
                  }
                >
                  <AssignedCrew currentEvent={currentEvent} employees={users} />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div {...stagger(2)}>
            <Suspense
              fallback={
                <div className="bg-white rounded-2xl h-32 animate-pulse border border-slate-100" />
              }
            >
              <EventDetails
                currentEvent={currentEvent}
                schoolName={schoolData.name}
                cityId={schoolData.cityId}
                onEventUpdated={() =>
                  qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
                }
              />
            </Suspense>
          </motion.div>

          <motion.div {...stagger(3)}>
            <Suspense
              fallback={
                <div className="bg-white rounded-2xl h-32 animate-pulse border border-slate-100" />
              }
            >
              <EventsTable
                events={events}
                selectedEventId={selectedEventId}
                onEventSelect={setSelectedEventId}
                onDeleteSuccess={() =>
                  qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
                }
              />
            </Suspense>
            {completedEvents.length > 0 && (
              <motion.div {...stagger(4)}>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800">
                      Завершені події ({completedEvents.length})
                    </h3>
                  </div>
                  <div className="md:hidden divide-y divide-slate-50">
                    {completedEvents.map((ev: any) => (
                      <div
                        key={ev.id}
                        onClick={() => setSelectedReportEvent(ev)}
                        className="flex items-center justify-between gap-3 p-4 active:bg-slate-50 cursor-pointer"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-blue-600 truncate">
                            {ev.project}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {new Date(ev.date).toLocaleDateString("uk-UA")}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            👶{" "}
                            {ev.report?.childrenCount ||
                              ev.childrenPlanned ||
                              "—"}{" "}
                            дітей
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-semibold text-slate-800 text-sm">
                            {new Intl.NumberFormat("uk-UA").format(
                              ev.report?.totalSum || ev.price || 0,
                            )}{" "}
                            грн
                          </p>
                          <p className="text-xs font-medium text-emerald-600 mt-0.5">
                            +
                            {new Intl.NumberFormat("uk-UA").format(
                              ev.report?.remainderSum || 0,
                            )}{" "}
                            грн
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-white border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                          <th className="p-4">Проєкт</th>
                          <th className="p-4">Дата</th>
                          <th className="p-4">Дітей</th>
                          <th className="p-4">Виручка</th>
                          <th className="p-4">Прибуток</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedEvents.map((ev: any) => (
                          <tr
                            key={ev.id}
                            onClick={() => setSelectedReportEvent(ev)}
                            className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <td className="p-4 text-slate-700 font-medium">
                              {ev.project}
                            </td>
                            <td className="p-4 text-slate-600">
                              {new Date(ev.date).toLocaleDateString("uk-UA")}
                            </td>
                            <td className="p-4 font-medium">
                              {ev.report?.childrenCount ||
                                ev.childrenPlanned ||
                                "—"}
                            </td>
                            <td className="p-4 font-medium text-slate-800">
                              {new Intl.NumberFormat("uk-UA").format(
                                ev.report?.totalSum || ev.price || 0,
                              )}{" "}
                              грн
                            </td>
                            <td className="p-4 font-medium text-emerald-600">
                              {new Intl.NumberFormat("uk-UA").format(
                                ev.report?.remainderSum || 0,
                              )}{" "}
                              грн
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Мобільна FAB */}
      <button
        onClick={openAddEventModal}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 active:scale-95 transition-transform"
      >
        +
      </button>

      {/* Модальні вікна */}
      <EditSchoolModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editForm={editForm}
        setEditForm={setEditForm}
        onSave={handleSaveSchoolInfo}
      />
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        eventForm={eventForm}
        setEventForm={setEventForm}
        onSave={handleSaveEvent}
      />
      <CommentModal
        isOpen={commentModal.isOpen}
        onClose={() => setCommentModal({ ...commentModal, isOpen: false })}
        mode={commentModal.mode}
        text={commentModal.text}
        setText={(t) => setCommentModal({ ...commentModal, text: t })}
        onSave={handleSaveComment}
      />
      <CrewModal
        isOpen={isCrewModalOpen}
        onClose={() => setIsCrewModalOpen(false)}
        city={schoolData.city}
        employees={users}
        onSave={handleAssignCrew}
      />
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSave={handleSubmitReport}
        schoolName={schoolData.name}
        eventType={currentEvent?.project}
        eventDate={currentEvent?.date}
        eventIndex={
          events
            .filter((e) => e.schoolId === schoolData.id)
            .indexOf(currentEvent!) + 1
        }
        crew={
          currentEvent?.crew
            ? {
                host: currentEvent.crew.hostId
                  ? (users.find(
                      (u: any) => u.id === currentEvent.crew.hostId,
                    ) ?? null)
                  : (currentEvent.crew.host ?? null),
                driver: currentEvent.crew.driverId
                  ? (users.find(
                      (u: any) => u.id === currentEvent.crew.driverId,
                    ) ?? null)
                  : (currentEvent.crew.driver ?? null),
              }
            : undefined
        }
      />
      <CompletedEventModal
        isOpen={!!selectedReportEvent}
        onClose={() => setSelectedReportEvent(null)}
        event={selectedReportEvent}
      />
    </div>
  );
  function CompletedEventModal({
    isOpen,
    onClose,
    event,
  }: {
    isOpen: boolean;
    onClose: () => void;
    event: any;
  }) {
    if (!isOpen || !event) return null;
    const fmt = (n: number) =>
      new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));
    const report = event.report;

    return (
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
        <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl overflow-hidden max-h-[92vh] flex flex-col">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Звіт: {event.project}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {new Date(event.date).toLocaleDateString("uk-UA")}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-2 -mr-2 -mt-2 shrink-0 h-fit text-lg"
            >
              ✕
            </button>
          </div>

          <div className="p-5 sm:p-6 flex-1 overflow-y-auto bg-slate-50/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Результати */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4">📊 Результати</h4>
                <div className="space-y-3 text-sm">
                  {[
                    ["Дітей (факт)", report?.childrenCount || 0],
                    ["Класів", report?.classesCount || 0],
                    ["Пільговиків", report?.privilegedCount || 0],
                    ["Сеансів", report?.showingsCount || 0],
                  ].map(([label, val]) => (
                    <div
                      key={label}
                      className="flex justify-between border-b border-slate-50 pb-2"
                    >
                      <span className="text-slate-500">{label}:</span>
                      <span className="font-medium">{val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pb-1">
                    <span className="text-slate-500">Оцінка:</span>
                    <span className="font-bold text-amber-500">
                      ⭐ {report?.rating || 0}/10
                    </span>
                  </div>
                </div>
              </div>

              {/* Фінанси */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4">💰 Фінанси</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Загальна виручка:</span>
                    <span className="font-bold">
                      {fmt(report?.totalSum)} грн
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">На заклад:</span>
                    <span className="font-medium text-rose-500">
                      − {fmt(report?.schoolSum)} грн
                    </span>
                  </div>

                  {/* Витрати */}
                  {Array.isArray(report?.expenses) &&
                    report.expenses.map((exp: any, i: number) => (
                      <div
                        key={i}
                        className="flex justify-between text-xs pl-2"
                      >
                        <span className="text-slate-400">
                          — {exp.name || exp.category || "Інше"}
                        </span>
                        <span className="text-rose-500 font-medium">
                          − {fmt(exp.amount)} грн
                        </span>
                      </div>
                    ))}

                  <div className="flex justify-between pt-1 border-t border-slate-100">
                    <span className="font-bold text-slate-800">
                      Чистий прибуток:
                    </span>
                    <span className="font-bold text-emerald-600 text-base">
                      {fmt(report?.remainderSum)} грн
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Зарплати */}
            {Array.isArray(report?.salaries) && report.salaries.length > 0 && (
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mt-4">
                <h4 className="font-bold text-slate-800 mb-4">👥 Зарплати</h4>
                <div className="space-y-2">
                  {report.salaries.map((s: any, i: number) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>
                        {s.name} {s.role ? `(${s.role})` : ""}
                      </span>
                      <span className="font-medium text-blue-600">
                        {fmt(s.amount)} грн
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
