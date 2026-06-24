import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../config/api";

import SchoolProfileHeader from "../components/school-profile/SchoolProfileHeader";
import SchoolInfoCard from "../components/school-profile/SchoolInfoCard";
import HistoryTimeline from "../components/school-profile/HistoryTimeline";
import Pipeline from "../components/school-profile/Pipeline";
import EventDetails from "../components/school-profile/EventDetails";
import EventsTable from "../components/school-profile/EventsTable";
import EventPreparation from "../components/school-profile/EventPreparation";
import AssignedCrew from "../components/school-profile/AssignedCrew";

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
  const [isLoading, setIsLoading] = useState(true);

  const [users, setUsers] = useState<any[]>([]);
  const [schoolData, setSchoolData] = useState<any>({
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
  });
  const [events, setEvents] = useState<any[]>([]);
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

  const fetchData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const schoolRes = await api.get(`/schools/${id}`, { headers });

      if (schoolRes.data) {
        const school = schoolRes.data;

        let director = school.director || "";
        let phone = school.phone || "";

        // Автодоповнення контактів якщо телефон порожній
        if (!phone && school.name) {
          try {
            const cityName = school.city?.name || "";
            const contactsRes = await api.get(
              `/schools/contacts/search?q=${encodeURIComponent(school.name)}&city=${encodeURIComponent(cityName)}`,
              { headers },
            );
            if (contactsRes.data?.length > 0) {
              const contact =
                contactsRes.data.find(
                  (c: any) =>
                    c.role?.includes("Директор") ||
                    c.role?.includes("Завідувач"),
                ) || contactsRes.data[0];

              director = contact.contactName;
              phone = contact.phone;

              await api.patch(
                `/schools/${school.id}`,
                { director, phone },
                { headers },
              );
            }
          } catch (e) {
            console.error("Автодоповнення контактів:", e);
          }
        }

        setSchoolData({
          id: school.id,
          cityId: school.cityId,
          name: school.name || "",
          type: school.type || "Школа",
          city: school.city?.name || "",
          address: school.address || "",
          director,
          phone,
          email: school.email || "",
          childrenCount: school.childrenCount || 0,
          notes: school.notes || "",
        });
        setEditForm({
          ...school,
          city: school.city?.name || "",
          director,
          phone,
        });
      }

      const eventsRes = await api.get(`/events/school/${id}`, { headers });
      setEvents(eventsRes.data.filter((ev: any) => ev.status !== "RE_SALE"));
      if (eventsRes.data.length > 0 && !selectedEventId) {
        setSelectedEventId(eventsRes.data[0].id);
      }
      const usersRes = await api.get("/users", { headers });
      setUsers(usersRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const currentEvent =
    events.find((ev) => ev.id === selectedEventId) || events[0];
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

  const handleSaveComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      if (commentModal.mode === "pipeline") {
        const activeStage = PIPELINE_STAGES[currentStageIndex];
        const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
        if (!nextStage) return;
        const res = await api.patch(
          `/events/${currentEvent.id}/status`,
          {
            status: nextStage.key,
            actionName: `Етап пройдено: ${activeStage.name}`,
            comment: commentModal.text,
          },
          { headers },
        );
        if (nextStage.key === "RE_SALE") {
          setExitingEventId(currentEvent.id);
          setTimeout(() => {
            setEvents((prev) => prev.filter((ev) => ev.id !== currentEvent.id));
            setSelectedEventId(null);
            setExitingEventId(null);
          }, 500);
        } else {
          setEvents((prev) =>
            prev.map((ev) =>
              ev.id === currentEvent.id ? { ...ev, ...res.data } : ev,
            ),
          );
        }
      } else if (commentModal.mode === "history" && commentModal.historyId) {
        await api.patch(
          `/events/history/${commentModal.historyId}`,
          { comment: commentModal.text },
          { headers },
        );
        setEvents((prev) =>
          prev.map((ev) =>
            ev.id === currentEvent.id
              ? {
                  ...ev,
                  history: ev.history.map((h: any) =>
                    h.id === commentModal.historyId
                      ? { ...h, comment: commentModal.text }
                      : h,
                  ),
                }
              : ev,
          ),
        );
      }
      setCommentModal({
        isOpen: false,
        mode: "pipeline",
        stepId: null,
        historyId: null,
        text: "",
      });
    } catch (e) {
      console.error(e);
    }
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
      setEvents((prev) => [res.data, ...prev]);
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
      setSchoolData(editForm);
      setIsEditModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdatePreparation = async (field: string, status: string) => {
    if (!currentEvent) return;
    try {
      await api.patch(
        `/events/${currentEvent.id}/preparation`,
        { field, status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === currentEvent.id
            ? {
                ...ev,
                preparation: { ...(ev.preparation || {}), [field]: status },
              }
            : ev,
        ),
      );
    } catch (e) {
      console.error("Помилка оновлення підготовки", e);
    }
  };

  const handleSubmitReport = async (reportData: any) => {
    if (!currentEvent) return;
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      await api.post(`/events/${currentEvent.id}/report`, reportData, {
        headers,
      });
      await api.patch(
        `/events/${currentEvent.id}/status`,
        { status: "RE_SALE", actionName: "Звіт сформовано. Захід завершено." },
        { headers },
      );
      setExitingEventId(currentEvent.id);
      setTimeout(() => {
        setEvents((prev) => prev.filter((ev) => ev.id !== currentEvent.id));
        setSelectedEventId(null);
        setExitingEventId(null);
      }, 500);
      setIsReportModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAssignCrew = async (crewId: string) => {
    try {
      const res = await api.post(
        `/events/${currentEvent.id}/assign-crew`,
        { crewId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      await handleUpdatePreparation("assignCrew", "Виконано");
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === currentEvent.id ? { ...ev, ...res.data } : ev,
        ),
      );
      setIsCrewModalOpen(false);
    } catch (e) {
      console.error(e);
    }
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

  if (isLoading)
    return <div className="p-8 text-slate-500">Завантаження...</div>;

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen text-slate-800 font-sans w-full pb-24 md:pb-8">
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
                  <span className="text-slate-500">Остання дія:</span>
                  <span className="font-medium text-blue-600">
                    {creatorName}
                  </span>
                </li>
              </ul>
            </div>
          )}
          <HistoryTimeline
            currentEvent={currentEvent}
            onHistoryClick={handleHistoryClick}
          />
        </div>

        <div
          className={`flex-1 flex flex-col gap-6 transition-opacity duration-500 ${
            exitingEventId === currentEvent?.id
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }`}
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
              <EventPreparation
                data={currentEvent.preparation || {}}
                onUpdate={handleUpdatePreparation}
                onOpenCrewModal={() => setIsCrewModalOpen(true)}
              />
              <AssignedCrew currentEvent={currentEvent} employees={users} />
            </div>
          )}

          <EventDetails
            currentEvent={currentEvent}
            schoolName={schoolData.name}
            cityId={schoolData.cityId}
            onEventUpdated={fetchData}
          />
          <EventsTable
            events={events}
            selectedEventId={selectedEventId}
            onEventSelect={setSelectedEventId}
            onDeleteSuccess={fetchData}
          />
        </div>
      </div>

      <button
        onClick={openAddEventModal}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 active:scale-95 transition-transform"
      >
        +
      </button>

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
      />
    </div>
  );
}
