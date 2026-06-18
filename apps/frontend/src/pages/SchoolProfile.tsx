import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// Імпортуємо наші UI модулі
import SchoolInfoCard from '../components/school-profile/SchoolInfoCard';
import HistoryTimeline from '../components/school-profile/HistoryTimeline';
import Pipeline from '../components/school-profile/Pipeline';
import EventDetails from '../components/school-profile/EventDetails';
import EventsTable from '../components/school-profile/EventsTable';
import EventPreparation from '../components/school-profile/EventPreparation';
import AssignedCrew from '../components/school-profile/AssignedCrew';

// Імпортуємо модальні вікна
import EditSchoolModal from '../components/school-profile/modals/EditSchoolModal';
import EventModal from '../components/school-profile/modals/EventModal';
import CommentModal from '../components/school-profile/modals/CommentModal';
import CrewModal from '../components/school-profile/modals/CrewModal';

const PIPELINE_STAGES = [
  { id: 1, key: 'BASE', name: 'База' },
  { id: 2, key: 'FIRST_CONTACT', name: 'Перший контакт' },
  { id: 3, key: 'INTERESTED', name: 'Зацікавлений' },
  { id: 4, key: 'PRE_APPROVAL', name: 'Попереднє погодження' },
  { id: 5, key: 'DATE_CONFIRMED', name: 'Підтвердження дати' },
  { id: 6, key: 'PREPARATION', name: 'Підготовка' },
  { id: 7, key: 'IN_PROGRESS', name: 'Подія в роботі' },
  { id: 8, key: 'DONE', name: 'Проведено' },
  { id: 9, key: 'REPORT', name: 'Звіт' },
  { id: 10, key: 'RE_SALE', name: 'Повторний продаж' },
];

export default function SchoolProfile() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [employees, setEmployees] = useState<any[]>([]);
  const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);

  const [schoolData, setSchoolData] = useState<any>({
    id: '', cityId: '', name: '', type: 'Школа', city: '', 
    address: '', director: '', phone: '', email: '', 
    childrenCount: 0, notes: '',
  });
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [commentModal, setCommentModal] = useState({
    isOpen: false, mode: 'pipeline', stepId: null as number | null, historyId: null as string | null, text: ''
  });

  const [editForm, setEditForm] = useState(schoolData);
  const [eventForm, setEventForm] = useState({
    project: 'Голограма для школи', date: '', time: '11:00',
    childrenPlanned: '', price: '', address: '', contactPerson: '', contactPhone: '',
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      // Завантажуємо школу
      const schoolRes = await axios.get(`https://crm-57qd.onrender.com/schools/${id}`, { headers });
      if (schoolRes.data) {
        setSchoolData({
          id: schoolRes.data.id, cityId: schoolRes.data.cityId, name: schoolRes.data.name || '',
          type: schoolRes.data.type || 'Школа', city: schoolRes.data.city?.name || '',
          address: schoolRes.data.address || '', director: schoolRes.data.director || '',
          phone: schoolRes.data.phone || '', email: schoolRes.data.email || '',
          childrenCount: schoolRes.data.childrenCount || 0, notes: schoolRes.data.notes || '',
        });
        setEditForm({ ...schoolRes.data, city: schoolRes.data.city?.name || '' });
      }

      // Завантажуємо події
      const eventsRes = await axios.get(`https://crm-57qd.onrender.com/events/school/${id}`, { headers });
      setEvents(eventsRes.data);
      if (eventsRes.data.length > 0 && !selectedEventId) {
        setSelectedEventId(eventsRes.data[0].id);
      }

      // Завантажуємо працівників для екіпажів
      const empRes = await axios.get('https://crm-57qd.onrender.com/employees', { headers });
      setEmployees(empRes.data);

    } catch (error) {
      console.error('Помилка завантаження даних:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  const currentEvent = events.find(ev => ev.id === selectedEventId) || events[0];
  const currentStageIndex = PIPELINE_STAGES.findIndex(s => s.key === currentEvent?.status) !== -1 
    ? PIPELINE_STAGES.findIndex(s => s.key === currentEvent?.status) : 0;
  
  const creatorName = currentEvent?.history?.length > 0 
    ? currentEvent.history[currentEvent.history.length - 1].userName 
    : 'Андрій (Суперадмін)';

  const handlePipelineClick = (stepId: number) => {
    if (!currentEvent) return;
    const activeStage = PIPELINE_STAGES[currentStageIndex];
    if (!activeStage || stepId !== activeStage.id) return;
    setCommentModal({ isOpen: true, mode: 'pipeline', stepId, historyId: null, text: '' });
  };

  const handleHistoryClick = (historyItem: any) => {
    setCommentModal({ isOpen: true, mode: 'history', stepId: null, historyId: historyItem.id, text: historyItem.comment || '' });
  };

  const handleSaveComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      if (commentModal.mode === 'pipeline' && commentModal.stepId) {
        const activeStage = PIPELINE_STAGES[currentStageIndex];
        const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
        const res = await axios.patch(`https://crm-57qd.onrender.com/events/${currentEvent.id}/status`, {
          status: nextStage.key, actionName: `Етап пройдено: ${activeStage.name}`, comment: commentModal.text
        }, { headers });
        setEvents(prev => prev.map(ev => ev.id === currentEvent.id ? res.data : ev));
      } else if (commentModal.mode === 'history' && commentModal.historyId) {
        await axios.patch(`https://crm-57qd.onrender.com/events/history/${commentModal.historyId}`, { comment: commentModal.text }, { headers });
        setEvents(prev => prev.map(ev => ev.id === currentEvent.id ? { ...ev, history: ev.history.map((h: any) => h.id === commentModal.historyId ? { ...h, comment: commentModal.text } : h) } : ev));
      }
      setCommentModal({ isOpen: false, mode: 'pipeline', stepId: null, historyId: null, text: '' });
    } catch (e) { console.error(e); }
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...eventForm, schoolId: schoolData.id, cityId: schoolData.cityId, childrenPlanned: Number(eventForm.childrenPlanned), price: Number(eventForm.price) };
      const res = await axios.post('https://crm-57qd.onrender.com/events', payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setIsEventModalOpen(false);
      setEvents(prev => [res.data, ...prev]);
      setSelectedEventId(res.data.id);
    } catch (e) { console.error(e); }
  };

  const handleSaveSchoolInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`https://crm-57qd.onrender.com/schools/${id}`, editForm, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setSchoolData(editForm);
      setIsEditModalOpen(false);
    } catch (e) { console.error(e); }
  };

  const handleUpdatePreparation = async (field: string, status: string) => {
    if (!currentEvent) return;
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      await axios.patch(`https://crm-57qd.onrender.com/events/${currentEvent.id}/preparation`, { field, status }, { headers });
      
      // Оновлюємо стан миттєво для плавного UI
      setEvents(prev => prev.map(ev => {
        if (ev.id === currentEvent.id) {
          return { ...ev, preparation: { ...(ev.preparation || {}), [field]: status } };
        }
        return ev;
      }));
    } catch (e) {
      console.error('Помилка оновлення підготовки', e);
    }
  };

  const handleAssignCrew = async (hostId: string, driverId: string) => {
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      
      // 1. Відправляємо запит на створення/прив'язку екіпажу до події
      const res = await axios.post(`https://crm-57qd.onrender.com/events/${currentEvent.id}/assign-crew`, {
        hostId, 
        driverId, 
        cityId: schoolData.cityId
      }, { headers });

      // 2. Ставимо галочку "Виконано" для задачі
      await handleUpdatePreparation('assignCrew', 'Виконано');
      
      // 3. Оновлюємо стейт подій, щоб відмалювався AssignedCrew компонент
      setEvents(prev => prev.map(ev => ev.id === currentEvent.id ? res.data : ev));
      setIsCrewModalOpen(false);
    } catch (e) {
      console.error('Помилка при призначенні екіпажу', e);
    }
  };

  if (isLoading) return <div className="p-8 text-slate-500">Завантаження...</div>;

  return (
    
    <div className="p-8 bg-slate-50 min-h-screen text-slate-800 font-sans">
      <div className="text-sm text-slate-500 mb-4">
        <Link to="/schools" className="hover:text-blue-600 transition-colors">Школи / Садочки</Link> 
        <span className="mx-2">›</span> 
        <span className="text-slate-800 font-medium">{schoolData.type} "{schoolData.name}"</span>
      </div>

      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold text-slate-800">{schoolData.type} "{schoolData.name}"</h1>
        <div className="flex gap-3">
          <div className="relative">
            <button onClick={() => setIsEditMenuOpen(!isEditMenuOpen)} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-medium">✏️ Редагувати</button>
            {isEditMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-20">
                <button onClick={() => { setIsEditMenuOpen(false); setEditForm(schoolData); setIsEditModalOpen(true); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium text-slate-700">Інформація про заклад</button>
              </div>
            )}
          </div>
          <button onClick={() => {
            setEventForm(prev => ({...prev, address: schoolData.address, contactPerson: schoolData.director, contactPhone: schoolData.phone, childrenPlanned: String(schoolData.childrenCount)}));
            setIsEventModalOpen(true);
          }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
            ⏱ Додати подію
          </button>
        </div>
      </div>

      

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="w-full xl:w-80 flex flex-col gap-6">
          <SchoolInfoCard schoolData={schoolData} />
          {currentEvent && currentStageIndex >= 1 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all duration-500">
              <h3 className="font-bold text-slate-800 mb-4">Відповідальна особа</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-slate-500">Менеджер:</span> <span className="font-medium text-blue-600">{creatorName}</span></li>
              </ul>
            </div>
          )}
          <HistoryTimeline currentEvent={currentEvent} onHistoryClick={handleHistoryClick} />
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <Pipeline currentStageIndex={currentStageIndex} currentEvent={currentEvent} onPipelineClick={handlePipelineClick} stages={PIPELINE_STAGES} />
          
          {currentEvent && currentStageIndex >= 5 && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <EventPreparation 
                data={currentEvent.preparation || {}} 
                onUpdate={handleUpdatePreparation} 
                onOpenCrewModal={() => setIsCrewModalOpen(true)} 
              />
              <AssignedCrew 
                currentEvent={currentEvent} 
                employees={employees} 
              />
            </div>
          )}

          <EventDetails currentEvent={currentEvent} />
          <EventsTable 
              events={events} 
              selectedEventId={selectedEventId} 
              onEventSelect={setSelectedEventId}
              onDeleteSuccess={fetchData} 
            />
        </div>
      </div>

      <EditSchoolModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} editForm={editForm} setEditForm={setEditForm} onSave={handleSaveSchoolInfo} />
      <EventModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} eventForm={eventForm} setEventForm={setEventForm} onSave={handleSaveEvent} />
      <CommentModal isOpen={commentModal.isOpen} onClose={() => setCommentModal({...commentModal, isOpen: false})} mode={commentModal.mode} text={commentModal.text} setText={(t) => setCommentModal({...commentModal, text: t})} onSave={handleSaveComment} />
      <CrewModal isOpen={isCrewModalOpen} onClose={() => setIsCrewModalOpen(false)} city={schoolData.city} employees={employees} onSave={handleAssignCrew} />
    </div>

  );
}