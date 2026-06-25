import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useSchool,
  useSchoolEvents,
  useUsers,
  useEventFull,
  useUpdateEventStatus,
  useUpdatePreparation,
  useAssignCrew,
  useSubmitReport,
  useAddComment,
  useUpdateHistoryComment,
} from "../hooks/useSchoolProfile";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

// Імпортуємо UI компоненти
import SchoolProfileHeader from "../components/school-profile/SchoolProfileHeader";
import SchoolInfoCard from "../components/school-profile/SchoolInfoCard";
import HistoryTimeline from "../components/school-profile/HistoryTimeline";
import Pipeline from "../components/school-profile/Pipeline";
import EventDetails from "../components/school-profile/EventDetails";
import EventsTable from "../components/school-profile/EventsTable";
import EventPreparation from "../components/school-profile/EventPreparation";
import AssignedCrew from "../components/school-profile/AssignedCrew";

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

  const { data: schoolRaw, isLoading: schoolLoading } = useSchool(id);
  const { data: eventsRaw = [], isLoading: eventsLoading } = useSchoolEvents(
    id,
    false,
  );
  const { data: eventFull, isLoading: eventFullLoading } = useEventFull(
    selectedEventId ?? eventsRaw[0]?.id,
  );
  const { data: users = [] } = useUsers();

  const updateStatus = useUpdateEventStatus();
  const updatePreparation = useUpdatePreparation();
  const assignCrewMutation = useAssignCrew();
  const submitReportMutation = useSubmitReport();
  const addCommentMutation = useAddComment();
  const updateHistoryMutation = useUpdateHistoryComment();

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
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [exitingEventId, setExitingEventId] = useState<string | null>(null);

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

  const currentEventBase =
    eventsRaw.find((ev) => ev.id === selectedEventId) ?? eventsRaw[0];
  const currentEvent =
    eventFull?.id === currentEventBase?.id
      ? { ...currentEventBase, ...eventFull }
      : currentEventBase;
  const currentStageIndex =
    PIPELINE_STAGES.findIndex((s) => s.key === currentEvent?.status) !== -1
      ? PIPELINE_STAGES.findIndex((s) => s.key === currentEvent?.status)
      : 0;
  const creatorName =
    currentEvent?.history?.length > 0
      ? currentEvent.history[currentEvent.history.length - 1].userName
      : "Немає даних";

  const handlePipelineClick = (stepId: number) => {
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
  };

  const handleHistoryClick = (historyItem: any) => {
    setCommentModal({
      isOpen: true,
      mode: "history",
      stepId: null,
      historyId: historyItem.id,
      text: historyItem.comment || "",
    });
  };

  const handleAddCommentClick = () => {
    setCommentModal({
      isOpen: true,
      mode: "add_comment",
      stepId: null,
      historyId: null,
      text: "",
    });
  };

  const handleSaveComment = async (e: React.FormEvent) => {
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
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
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
  };

  const handleSaveSchoolInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch(`/schools/${id}`, editForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      qc.invalidateQueries({ queryKey: ["schoolInfo", id] });
      setIsEditModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdatePreparation = async (field: string, status: string) => {
    if (!currentEvent) return;
    await updatePreparation.mutateAsync({
      eventId: currentEvent.id,
      field,
      status,
    });
  };

  const handleSubmitReport = async (reportData: any) => {
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
  };

  const handleAssignCrew = async (crewId: string) => {
    await assignCrewMutation.mutateAsync({ eventId: currentEvent.id, crewId });
    await updatePreparation.mutateAsync({
      eventId: currentEvent.id,
      field: "assignCrew",
      status: "Виконано",
    });
    setIsCrewModalOpen(false);
  };

  const openAddEventModal = () => {
    setEventForm((prev) => ({
      ...prev,
      address: schoolData.address,
      contactPerson: schoolData.director,
      contactPhone: schoolData.phone,
      childrenPlanned: String(schoolData.childrenCount),
    }));
    setIsEventModalOpen(true);
  };

  if (schoolLoading || eventsLoading)
    return <div className="p-8 text-slate-500">Завантаження...</div>;

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
        <div className="w-full xl:w-80 flex flex-col gap-6">
          <SchoolInfoCard schoolData={schoolData} />
          {currentEvent && currentStageIndex >= 1 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all duration-500">
              <h3 className="font-bold text-slate-800 mb-4">
                Відповідальна особа
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-slate-500">Остання дія:</span>{" "}
                  <span className="font-medium text-blue-600">
                    {creatorName}
                  </span>
                </li>
              </ul>
            </div>
          )}
          <HistoryTimeline
            currentEvent={eventFullLoading ? currentEventBase : currentEvent}
            onHistoryClick={handleHistoryClick}
            onAddCommentClick={handleAddCommentClick}
          />
        </div>

        <div
          className={`flex-1 flex flex-col gap-6 transition-all duration-500 ease-in-out transform origin-top ${exitingEventId === currentEvent?.id ? "opacity-0 scale-95 -translate-y-4 pointer-events-none" : "opacity-100 scale-100 translate-y-0"}`}
        >
          {currentEvent && (
            <Pipeline
              currentStageIndex={currentStageIndex}
              currentEvent={currentEvent}
              onPipelineClick={handlePipelineClick}
              stages={PIPELINE_STAGES}
            />
          )}

          {currentEvent && currentStageIndex >= 4 && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {eventFullLoading ? (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-pulse h-48" />
              ) : (
                <EventPreparation
                  data={currentEvent.preparation || {}}
                  onUpdate={handleUpdatePreparation}
                  onOpenCrewModal={() => setIsCrewModalOpen(true)}
                />
              )}
              <AssignedCrew currentEvent={currentEvent} employees={users} />
            </div>
          )}

          <EventDetails
            currentEvent={currentEvent}
            schoolName={schoolData.name}
            cityId={schoolData.cityId}
            onEventUpdated={() =>
              qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
            }
          />
          <EventsTable
            events={events}
            selectedEventId={selectedEventId}
            onEventSelect={setSelectedEventId}
            onDeleteSuccess={() =>
              qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
            }
          />
        </div>
      </div>

      {/* Мобільна FAB для додавання події */}
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
    </div>
  );
}
