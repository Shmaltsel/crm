export interface City {
  id: string;
  name: string;
  manager?: { id: string; name: string; phone: string } | null;
  plannedEvents?: number;
  completedEvents?: number;
}

export interface School {
  id: string;
  name: string;
  type: string;
  cityId: string;
  address?: string;
  director?: string;
  phone?: string;
  email?: string;
  childrenCount?: number;
  notes?: string;
  isHotClient?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  cityId?: string;
  city?: { id: string; name: string };
}

export interface EventHistory {
  id: string;
  action: string;
  comment?: string;
  userName: string;
  role: string;
  createdAt: string;
}

export interface EventReport {
  childrenCount: number;
  totalSum: number;
  remainderSum: number;
  directorSatisfied?: boolean;
  teachersSatisfied?: boolean;
  hadIssues?: boolean;
  comment?: string;
}

export interface Event {
  id: string;
  schoolId: string;
  cityId: string;
  project: string;
  date: string;
  time?: string;
  status: string;
  childrenPlanned?: number;
  price?: number;
  address?: string;
  contactPerson?: string;
  contactPhone?: string;
  crew?: Crew;
  report?: EventReport;
  history?: EventHistory[];
  preparation?: EventPreparation;
  school?: { id: string; name: string; type: string }; // ← додай це
}

export interface Crew {
  id: string;
  name: string;
  cityId: string;
  hostId?: string;
  driverId?: string;
  host?: { id: string; name: string };
  driver?: { id: string; name: string };
  car?: string;
  phone?: string;
}

export interface EventPreparation {
  assignCrew: string;
  bookEquipment: string;
  prepareDocs: string;
  prepareMaterials: string;
  remindSchool: string;
}

export interface CityProfile extends City {
  events: Event[];
  crews: Crew[];
  schools?: School[]; // ← додай це
}