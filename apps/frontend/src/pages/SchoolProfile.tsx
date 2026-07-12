import { useState, useMemo, useCallback, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { DUR, pageVariants, slideUpVariants } from "../lib/motion";
import { tick } from "../lib/haptics";

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
  useSchoolCompletedEvents,
  useUpdateSchool,
  useCreateEvent,
} from "../hooks/useSchoolProfile";

import type { Event, User } from "../types";
import type { ReportData } from "../components/school-profile/modals/ReportModal";

import SchoolProfileHeader from "../components/school-profile/SchoolProfileHeader";
import CompletedEventModal from "../components/school-profile/CompletedEventModal";

import QuickActionsBar from "../components/school-profile/QuickActionsBar";
import SchoolActionSheet from "../components/school-profile/modals/SchoolActionSheet";
import FloatingMobileNav from "../components/school-profile/FloatingMobileNav";

const Pipeline = lazy(() => import("../components/school-profile/Pipeline"));
const HistoryTimeline = lazy(
  () => import("../components/school-profile/HistoryTimeline"),
);
const CommentsTimeline = lazy(
  () => import("../components/school-profile/CommentsTimeline"),
);
const EventDetails = lazy(
  () => import("../components/school-profile/EventDetails"),
);
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

import EditSchoolModal from "../components/school-profile/modals/EditSchoolModal";
import EventModal from "../components/school-profile/modals/EventModal";
import CommentModal from "../components/school-profile/modals/CommentModal";
import type { EventFormValues } from "../components/school-profile/modals/EventSchema";
import type { SchoolEditFormValues } from "../components/school-profile/modals/SchoolEditSchema";
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
] as const;

export default function SchoolProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isLeavingPage, setIsLeavingPage] = useState(false);
  const [actionSheetOpen, setActionSheetOpen] = useState(false);

  const { data: schoolRaw } = useSchool(id);
  const { data: eventsRaw = [] } = useSchoolEvents(id, false);

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [exitingEventId, setExitingEventId] = useState<string | null>(null);

  const { data: eventFull, isLoading: eventFullLoading } = useEventFull(
    selectedEventId ?? eventsRaw[0]?.id,
  );

  const { data: users = [] } = useUsers();
  const { data: completedEvents = [] } = useSchoolCompletedEvents(id);
  const [selectedReportEvent, setSelectedReportEvent] = useState<Event | null>(
    null,
  );
  const updateStatus = useUpdateEventStatus();
  const updatePreparation = useUpdatePreparation();
  const assignCrewMutation = useAssignCrew();
  const submitReportMutation = useSubmitReport();
  const addCommentMutation = useAddComment();
  const updateHistoryMutation = useUpdateHistoryComment();

  const schoolData = useMemo(() => {
    if (!schoolRaw) {
      return {
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
    }

    return {
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
    };
  }, [schoolRaw]);

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

  const currentEventBase = useMemo(
    () => eventsRaw.find((ev) => ev.id === selectedEventId) ?? eventsRaw[0],
    [eventsRaw, selectedEventId],
  );

  const currentEvent = useMemo(() => {
    if (!currentEventBase) return null;
    if (eventFull?.id === currentEventBase.id) {
      return { ...currentEventBase, ...eventFull };
    }
    return currentEventBase;
  }, [currentEventBase, eventFull]);
  const currentStageIndex = useMemo(() => {
    if (!currentEvent?.status) return 0;
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

  const handleHistoryClick = useCallback(
    (historyItem: { id: string; comment?: string }) => {
      setCommentModal({
        isOpen: true,
        mode: "history",
        stepId: null,
        historyId: historyItem.id,
        text: historyItem.comment || "",
      });
    },
    [],
  );

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
        if (!nextStage || !currentEvent) return;

        await updateStatus.mutateAsync({
          eventId: currentEvent.id,
          status: nextStage.key,
          actionName: `Етап пройдено: ${activeStage.name}`,
          comment: commentModal.text,
        });
        tick();
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
        tick();
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

  const updateSchoolMutation = useUpdateSchool();
  const createEventMutation = useCreateEvent();

  const handleSaveEvent = useCallback(
    async (data: EventFormValues) => {
      if (!schoolData.id) return;

      const payload = {
        ...data,
        schoolId: schoolData.id,
        cityId: schoolData.cityId,
        childrenPlanned: Number(data.childrenPlanned) || 0,
        price: Number(data.price) || 0,
      };

      const newEvent = await createEventMutation.mutateAsync(payload);

      setIsEventModalOpen(false);
      setSelectedEventId(newEvent.id);
    },
    [schoolData, createEventMutation],
  );

  const handleSaveSchoolInfo = useCallback(
    async (data: SchoolEditFormValues) => {
      if (!id) return;

      await updateSchoolMutation.mutateAsync({
        ...data,
        childrenCount: Number(data.childrenCount) || 0,
        id,
      });
      setIsEditModalOpen(false);
    },
    [id, updateSchoolMutation],
  );

  const editDefaultValues = useMemo<SchoolEditFormValues>(
    () => ({
      type: (schoolData.type as "Школа" | "Садочок") || "Школа",
      address: schoolData.address,
      director: schoolData.director,
      phone: schoolData.phone,
      email: schoolData.email,
      childrenCount: schoolData.childrenCount
        ? String(schoolData.childrenCount)
        : "",
    }),
    [schoolData],
  );

  const handleUpdatePreparation = useCallback(
    async (field: string, status: "PLANNED" | "IN_PROGRESS" | "DONE") => {
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
    async (reportData: ReportData) => {
      if (!currentEvent) return;
      setIsReportModalOpen(false);
      setExitingEventId(currentEvent.id);
      await submitReportMutation.mutateAsync({
        eventId: currentEvent.id,
        reportData,
      });
      setIsLeavingPage(true);
      setTimeout(() => {
        navigate("/schools");
      }, 300);
    },
    [currentEvent, submitReportMutation, navigate],
  );

  const handleAssignCrew = useCallback(
    async (crewId: string) => {
      if (!currentEvent) return;

      setIsCrewModalOpen(false);

      await Promise.all([
        assignCrewMutation.mutateAsync({
          eventId: currentEvent.id,
          crewId,
        }),
        updatePreparation.mutateAsync({
          eventId: currentEvent.id,
          field: "assignCrew",
          status: "DONE",
        }),
      ]);
    },
    [currentEvent, assignCrewMutation, updatePreparation],
  );

  const events = eventsRaw;

  const openAddEventModal = useCallback(() => {
    setIsEventModalOpen(true);
  }, []);

  const openActionSheet = useCallback(() => {
    setActionSheetOpen(true);
  }, []);

  const eventDefaultValues = useMemo<Partial<EventFormValues>>(
    () => ({
      project: "Голограма для школи",
      time: "11:00",
      address: schoolData.address,
      contactPerson: schoolData.director,
      contactPhone: schoolData.phone,
      childrenPlanned: String(schoolData.childrenCount),
    }),
    [schoolData],
  );
  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: 0.1 + i * 0.07, ease: "easeOut" },
  });

  const completedEventsBlock = (anchorId?: string) => (
    completedEvents.length > 0 && (
      <motion.div id={anchorId}>
        <div className="bg-surface rounded-card shadow-card border border-border overflow-hidden">
          <div className="p-6 border-b border-border bg-surface-muted">
            <h3 className="font-bold text-content-primary">
              Завершені події ({completedEvents.length})
            </h3>
          </div>
          <div className="md:hidden divide-y divide-border">
            {completedEvents.map((ev: Event) => (
              <div
                key={ev.id}
                onClick={() => setSelectedReportEvent(ev)}
                className="flex items-center justify-between gap-3 p-4 active:bg-surface-muted cursor-pointer"
              >
                <div className="min-w-0">
                  <p className="font-medium text-brand truncate">{ev.project}</p>
                  <p className="text-xs text-content-muted mt-0.5">
                    {new Date(ev.date).toLocaleDateString("uk-UA")}
                  </p>
                  <p className="text-xs text-content-secondary mt-1">
                    👶 {ev.report?.childrenCount || ev.childrenPlanned || "—"} дітей
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-content-primary text-sm">
                    {new Intl.NumberFormat("uk-UA").format(
                      Math.round(Number(ev.report?.totalSum || ev.price || 0)),
                    )}{" "}
                    грн
                  </p>
                  <p className="text-xs font-medium text-success-600 mt-0.5">
                    +{new Intl.NumberFormat("uk-UA").format(
                      Math.round(Number(ev.report?.remainderSum || 0)),
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
                <tr className="bg-surface border-b border-border text-content-muted text-xs font-semibold uppercase tracking-wider">
                  <th className="p-4">Проєкт</th>
                  <th className="p-4">Дата</th>
                  <th className="p-4">Дітей</th>
                  <th className="p-4">Виручка</th>
                  <th className="p-4">Прибуток</th>
                </tr>
              </thead>
              <tbody>
                {completedEvents.map((ev: Event) => (
                  <tr
                    key={ev.id}
                    onClick={() => setSelectedReportEvent(ev)}
                    className="border-b border-surface-muted hover:bg-surface-muted transition-colors cursor-pointer"
                  >
                    <td className="p-4 text-content-secondary font-medium">{ev.project}</td>
                    <td className="p-4 text-content-muted">
                      {new Date(ev.date).toLocaleDateString("uk-UA")}
                    </td>
                    <td className="p-4 font-medium">
                      {ev.report?.childrenCount || ev.childrenPlanned || "—"}
                    </td>
                    <td className="p-4 font-medium text-content-primary">
                      {new Intl.NumberFormat("uk-UA").format(
                        Math.round(Number(ev.report?.totalSum || ev.price || 0)),
                      )}{" "}
                      грн
                    </td>
                    <td className="p-4 font-medium text-success-600">
                      {new Intl.NumberFormat("uk-UA").format(
                        Math.round(Number(ev.report?.remainderSum || 0)),
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
    )
  );

  return (
    <motion.div
      animate={{ opacity: isLeavingPage ? 0 : 1 }}
      transition={{ duration: DUR.slow }}
      className="p-4 md:p-8 bg-gradient-subtle min-h-screen text-content-primary font-sans w-full overflow-x-hidden pb-24 md:pb-8"
    >
      <SchoolProfileHeader
        schoolData={schoolData}
        onEdit={() => setIsEditModalOpen(true)}
        onAddEvent={openAddEventModal}
        onActionMenu={openActionSheet}
      />

      <QuickActionsBar completedEvents={completedEvents} />

      {/* --- Мобільна версія: всі секції одразу --- */}
      <div className="xl:hidden space-y-6">

        <section id="section-events" className="scroll-mt-20 space-y-6">
          {currentEvent && (
            <Suspense
              fallback={
                <div className="bg-surface rounded-card shadow-card h-24 animate-pulse border border-border" />
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
            {currentEvent &&
              currentStageIndex >= 4 &&
              exitingEventId !== currentEvent.id && (
              <motion.div
                key="preparation"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 xl:grid-cols-2 gap-6"
              >
                {eventFullLoading ? (
                  <div className="bg-surface p-6 rounded-card shadow-card border border-border animate-pulse h-48" />
                ) : (
                  <Suspense
                    fallback={
                      <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
                    }
                  >
                    <EventPreparation
                      data={currentEvent.preparation || {}}
                      onUpdate={handleUpdatePreparation}
                      onOpenCrewModal={() => setIsCrewModalOpen(true)}
                      project={currentEvent.project}
                    />
                  </Suspense>
                )}
                <Suspense
                  fallback={
                    <div className="bg-white rounded-2xl h-48 animate-pulse border border-border" />
                  }
                >
                  <AssignedCrew currentEvent={currentEvent} employees={users} />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>

          <Suspense
            fallback={
              <div className="bg-surface rounded-card shadow-card h-32 animate-pulse border border-border" />
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

          <Suspense
            fallback={
              <div className="bg-surface rounded-card shadow-card h-32 animate-pulse border border-border" />
            }
          >
            <EventsTable
              events={events}
              selectedEventId={selectedEventId}
              onEventSelect={setSelectedEventId}
              onDeleteSuccess={() =>
                qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
              }
              schoolId={schoolData.id}
              onAddEvent={openAddEventModal}
            />
          </Suspense>
          {completedEventsBlock()}
        </section>

        <section id="section-notes" className="scroll-mt-20 space-y-4">
          {schoolData.notes && (
            <div className="bg-surface rounded-card shadow-card border border-border p-6">
              <h4 className="font-bold text-content-primary mb-3">Нотатки школи</h4>
              <p className="text-content-secondary whitespace-pre-wrap">{schoolData.notes}</p>
            </div>
          )}
          <Suspense
            fallback={
              <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
            }
          >
            <CommentsTimeline schoolId={schoolData.id} variant="chat" />
          </Suspense>
        </section>

        <section id="section-details" className="scroll-mt-20 space-y-4">
          <Suspense
            fallback={
              <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
            }
          >
            <SchoolInfoCard schoolData={schoolData} />
          </Suspense>
          <Suspense
            fallback={
              <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
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
        </section>

      </div>

      {/* Десктопна версія (≥1280px): 2 колонки */}
      <div className="hidden xl:grid xl:grid-cols-2 xl:gap-6">
        <div className="space-y-6">
          <Suspense
            fallback={
              <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
            }
          >
            <SchoolInfoCard schoolData={schoolData} />
          </Suspense>
          {schoolData.notes && (
            <div className="bg-surface rounded-card shadow-card border border-border p-6">
              <h4 className="font-bold text-content-primary mb-3">Додаткові нотатки</h4>
              <p className="text-content-secondary whitespace-pre-wrap">{schoolData.notes}</p>
            </div>
          )}

          <Suspense
            fallback={
              <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
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

          <Suspense
            fallback={
              <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
            }
          >
            <CommentsTimeline schoolId={schoolData.id} />
          </Suspense>
        </div>

        <div className="space-y-6">
          <Suspense
            fallback={
              <div className="bg-surface rounded-card shadow-card h-32 animate-pulse border border-border" />
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

          {currentEvent &&
            currentStageIndex >= 4 &&
            exitingEventId !== currentEvent.id && (
              <motion.div
                key="preparation-desktop"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 gap-6"
              >
                {eventFullLoading ? (
                  <div className="bg-surface p-6 rounded-card shadow-card border border-border animate-pulse h-48" />
                ) : (
                  <Suspense
                    fallback={
                      <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
                    }
                  >
                    <EventPreparation
                      data={currentEvent.preparation || {}}
                      onUpdate={handleUpdatePreparation}
                      onOpenCrewModal={() => setIsCrewModalOpen(true)}
                      project={currentEvent.project}
                    />
                  </Suspense>
                )}
                <Suspense
                  fallback={
                    <div className="bg-white rounded-2xl h-48 animate-pulse border border-border" />
                  }
                >
                  <AssignedCrew
                    currentEvent={currentEvent}
                    employees={users}
                  />
                </Suspense>
              </motion.div>
            )}

          <div id="events-table-anchor">
            <Suspense
              fallback={
                <div className="bg-surface rounded-card shadow-card h-32 animate-pulse border border-border" />
              }
            >
              <EventsTable
                events={events}
                selectedEventId={selectedEventId}
                onEventSelect={setSelectedEventId}
                onDeleteSuccess={() =>
                  qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
                }
                schoolId={schoolData.id}
                onAddEvent={openAddEventModal}
              />
            </Suspense>
          </div>

          {completedEventsBlock("completed-events-anchor")}
        </div>
      </div>

      {/* Мобільна FAB */}
      <button
        onClick={openAddEventModal}
        className="md:hidden fab"
        aria-label="Додати подію"
      >
        +
      </button>

      {/* Action Sheet */}
      <SchoolActionSheet
        isOpen={actionSheetOpen}
        onClose={() => setActionSheetOpen(false)}
        onEdit={() => {
          setActionSheetOpen(false);
          setIsEditModalOpen(true);
        }}
        onAddEvent={() => {
          setActionSheetOpen(false);
          setIsEventModalOpen(true);
        }}
      />

      {/* Модальні вікна */}
      <EditSchoolModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        defaultValues={editDefaultValues}
        onSave={handleSaveSchoolInfo}
      />
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        defaultValues={eventDefaultValues}
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
        eventDate={currentEvent?.date}
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
            .findIndex((e) => e.id === currentEvent?.id) + 1
        }
        crew={
          currentEvent?.crew
            ? {
                host: currentEvent.crew.hostId
                  ? (users.find(
                      (u: User) => u.id === currentEvent.crew.hostId,
                    ) ?? null)
                  : (currentEvent.crew.host ?? null),
                driver: currentEvent.crew.driverId
                  ? (users.find(
                      (u: User) => u.id === currentEvent.crew.driverId,
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
      <FloatingMobileNav />
    </motion.div>
  );
}