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
  pricePerChild?: number;
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
  role: UserRole;
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

export interface SchoolComment {
  id: string;
  schoolId: string;
  type: "NOTE" | "CALL" | "RESCHEDULE" | "CONFIRMATION" | "PROBLEM";
  text: string;
  createdAt: string;
  author: { id: string; name: string; role: string };
}

export interface ExpenseItem {
  category?: string;
  name?: string;
  amount: number;
}

export type SalaryStatus = "PENDING" | "PAID" | "CANCELLED";

export interface SalaryRecord {
  id: string;
  employeeId: string;
  eventId?: string;
  reportId?: string;
  amount: number;
  comment?: string;
  status: SalaryStatus;
  paidAt?: string;
  paidBy?: string;
  createdBy: string;
  createdAt: string;
  employee?: { id: string; name: string; role: string };
  event?: { id: string; date: string; project: string; cityId: string };
  report?: { status: string };
}

export type ReportStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "NEEDS_REVISION"
  | "APPROVED"
  | "REJECTED"
  | "CLOSED";

export interface InventoryUsage {
  id: string;
  itemId: string;
  reportId: string;
  quantity: number;
}

export interface EventReport {
  id: string;
  eventId: string;
  status: ReportStatus;
  announcementDone: boolean;
  materialShown: boolean;
  childrenCount: number;
  classesCount: number;
  privilegedCount: number;
  showingsCount: number;
  totalSum: number;
  schoolSum: number;
  remainderSum: number;
  rating: number;
  directorSatisfied?: boolean;
  teachersSatisfied?: boolean;
  hadIssues?: boolean;
  comment?: string;
  revisionComment?: string;
  submittedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
  expenseItems: ExpenseItem[];
  salaryRecords: SalaryRecord[];
  inventoryUsages?: InventoryUsage[];
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

export interface DayOff {
  id: string;
  userId: string;
  date: string;
  user: { id: string; name: string; role: string; cityId: string | null };
}

export type DayOffRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface DayOffRequest {
  id: string;
  userId: string;
  date: string;
  reason: string | null;
  status: DayOffRequestStatus;
  managerNote: string | null;
  dayOffId: string | null;
  createdBy: string;
  reviewedBy: string | null;
  createdAt: string;
  updatedAt: string;
  reviewedAt: string | null;
  user: { id: string; name: string; role: string; cityId: string | null };
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

export interface FinanceKpi {
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
  totalEvents: number;
}

export interface MonthlyFinance {
  month: string;
  revenue: number;
  profit: number;
}

export interface FinanceByProject {
  name: string;
  value: number;
}

export interface FinanceByCategory {
  name: string;
  value: number;
}

export interface FinanceTopSchool {
  name: string;
  count: number;
  revenue: number;
}

export interface FinanceEventItem {
  id: string;
  date: string;
  school: string;
  schoolId: string;
  profit: number;
  revenue: number;
}

export interface FinanceFilterOptions {
  projects: string[];
  cities: { id: string; name: string }[];
}

export interface FinanceDashboardData {
  kpi: FinanceKpi;
  monthly: MonthlyFinance[];
  expectedRevenue: number;
  filters: FinanceFilterOptions;
  byProject?: FinanceByProject[];
  byExpenseCategory?: FinanceByCategory[];
  topSchools?: FinanceTopSchool[];
  topEvents?: FinanceEventItem[];
  worstEvents?: FinanceEventItem[];
}

export interface CompanyBalance {
  totalRevenue: number;
  totalExpenses: number;
  totalPaidSalaries: number;
  totalPendingSalaries: number;
  companyBalance: number;
}

export type CommentType = "NOTE" | "CALL" | "RESCHEDULE" | "CONFIRMATION" | "PROBLEM";

export type UserRole = "SUPERADMIN" | "OWNER" | "MANAGER" | "HOST" | "DRIVER";

export interface InventoryItem {
  id: string;
  name: string;
  sku: string | null;
  category: string;
  unit: string;
  project: string | null;
  minStock: number;
  currentStock: number;
  notes: string | null;
  cityId: string | null;
  schoolId: string | null;
  createdAt: string;
  updatedAt: string;
  city?: { id: string; name: string } | null;
  school?: { id: string; name: string } | null;
}

export interface CreateInventoryPayload {
  name: string;
  sku?: string;
  category?: string;
  unit?: string;
  project?: string;
  minStock?: number;
  currentStock?: number;
  notes?: string;
  cityId?: string;
  schoolId?: string;
}

export interface UpdateInventoryPayload extends Partial<CreateInventoryPayload> {
  id: string;
}
