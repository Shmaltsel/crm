export interface City {
  id: string;
  name: string;
  manager?: { id: string; name: string; phone: string } | null;
  plannedEvents?: number;
  completedEvents?: number;
  schoolsCount?: number;
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
  city?: { id: string; name: string };
  events?: Event[];
}

export interface SchoolProfileData {
  id: string;
  cityId: string;
  name: string;
  type: string;
  city: string;
  address: string;
  director: string;
  phone: string;
  email: string;
  childrenCount: number;
  notes: string;
}

export interface SchoolContact {
  contactName: string;
  phone: string;
  role?: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
}

export interface EventFormData {
  project: string;
  date: string;
  time: string;
  childrenPlanned: string;
  price: string;
  address: string;
  contactPerson: string;
  contactPhone: string;
}

export interface CreateEventPayload {
  project: string;
  date: string;
  time: string;
  childrenPlanned: number;
  price: number;
  address: string;
  contactPerson: string;
  contactPhone: string;
  schoolId: string;
  cityId: string;
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

export interface ExpenseItem {
  category?: string;
  name?: string;
  amount: number;
}

export interface SalaryItem {
  userId: string;
  name: string;
  amount: number;
  role?: string;
}

export interface EventReport {
  childrenCount: number;
  totalSum: number;
  schoolSum: number;
  remainderSum: number;
  directorSatisfied?: boolean;
  teachersSatisfied?: boolean;
  hadIssues?: boolean;
  comment?: string;
  rating?: number;
  expenses: ExpenseItem[];
  salaries: SalaryItem[];
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
  paymentMethod?: string;
  address?: string;
  contactPerson?: string;
  contactPhone?: string;
  crew?: Crew;
  report?: EventReport;
  history?: EventHistory[];
  preparation?: EventPreparation;
  school?: { id: string; name: string; type: string };
  city?: { id: string; name: string };
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

import type { PreparationStatus } from '../utils/preparationStatus';

export interface EventPreparation {
  assignCrew: PreparationStatus;
  bookEquipment: PreparationStatus;
  prepareDocs: PreparationStatus;
  prepareMaterials: PreparationStatus;
  remindSchool: PreparationStatus;
}

export interface CityProfile extends City {
  events: Event[];
  crews: Crew[];
  schools?: School[];
}

export interface PipelineStage {
  key: string;
  name: string;
}

export interface IssueReport {
  id: string;
  eventId: string;
  schoolName: string;
  eventName: string;
  message: string;
  cityId: string;
  status: string;
  createdAt: string;
}
