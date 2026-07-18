import type { Page, Route } from "@playwright/test";

export type MockRole = "MANAGER" | "SUPERADMIN";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: MockRole;
  cityId: string;
  cityName: string;
}

const USERS: Record<MockRole, MockUser> = {
  MANAGER: {
    id: "user-manager",
    name: "Марія Демчук",
    email: "demo.manager@svitlo-znan.app",
    role: "MANAGER",
    cityId: "city-1",
    cityName: "Демо Місто",
  },
  SUPERADMIN: {
    id: "user-admin",
    name: "Адміністратор",
    email: "admin@example.com",
    role: "SUPERADMIN",
    cityId: "city-1",
    cityName: "Демо Місто",
  },
};

const CITY_ID = "city-1";

const events = [
  {
    id: "ev-1",
    schoolId: "sch-1",
    cityId: CITY_ID,
    project: "Голографічне шоу «Космос»",
    date: "2026-07-20",
    time: "10:00",
    status: "PREPARATION",
    childrenPlanned: 120,
    price: 12000,
    contactPerson: "Наталія Іванівна",
    contactPhone: "+380321234567",
    crew: {
      id: "crew-1",
      name: "Екіпаж №1",
      host: { id: "h1", name: "Олег Ведучий" },
      driver: { id: "d1", name: "Ігор Водій" },
    },
    school: { id: "sch-1", name: "Ліцей №5", type: "Школа" },
    city: { id: CITY_ID, name: "Демо Місто" },
  },
  {
    id: "ev-2",
    schoolId: "sch-2",
    cityId: CITY_ID,
    project: "Голографічне шоу «Космос»",
    date: "2026-07-15",
    time: "12:30",
    status: "DATE_CONFIRMED",
    childrenPlanned: 60,
    price: 8000,
    contactPerson: "Оксана Петрівна",
    contactPhone: "+380321234568",
    crew: {
      id: "crew-1",
      name: "Екіпаж №1",
      host: { id: "h1", name: "Олег Ведучий" },
      driver: { id: "d1", name: "Ігор Водій" },
    },
    school: { id: "sch-2", name: "Дитячий садок «Сонечко»", type: "Садочок" },
    city: { id: CITY_ID, name: "Демо Місто" },
  },
];

const cities = [
  {
    id: CITY_ID,
    name: "Демо Місто",
    plannedEvents: 14,
    completedEvents: 9,
    schoolsCount: 3,
    manager: { id: "user-manager", name: "Марія Демчук", phone: "+380671112233" },
  },
  {
    id: "city-2",
    name: "Київ",
    plannedEvents: 22,
    completedEvents: 18,
    schoolsCount: 7,
    manager: { id: "m2", name: "Олена Київ", phone: "+380671112200" },
  },
  {
    id: "city-3",
    name: "Одеса",
    plannedEvents: 8,
    completedEvents: 5,
    schoolsCount: 4,
    manager: null,
  },
];

const cityProfile = {
  ...cities[0],
  events,
  crews: [
    {
      id: "crew-1",
      name: "Екіпаж №1",
      cityId: CITY_ID,
      host: { id: "h1", name: "Олег Ведучий" },
      driver: { id: "d1", name: "Ігор Водій" },
      car: "Volkswagen Transporter",
      phone: "+380671112235",
    },
  ],
  schools: [
    {
      id: "sch-1",
      name: "Ліцей №5",
      type: "Школа",
      cityId: CITY_ID,
      address: "вул. Шевченка, 10",
      director: "Наталія Іванівна",
      phone: "+380321234567",
      childrenCount: 320,
      isHotClient: true,
    },
  ],
};

const schoolsData = {
  data: [
    {
      id: "sch-1",
      name: "Ліцей №5",
      type: "Школа",
      cityId: CITY_ID,
      address: "вул. Шевченка, 10",
      director: "Наталія Іванівна",
      phone: "+380321234567",
      email: "lyceum5@example.com",
      childrenCount: 320,
      isHotClient: true,
      city: { id: CITY_ID, name: "Демо Місто" },
    },
    {
      id: "sch-2",
      name: "Дитячий садок «Сонечко»",
      type: "Садочок",
      cityId: CITY_ID,
      address: "вул. Франка, 22",
      director: "Оксана Петрівна",
      phone: "+380321234568",
      email: "sun@example.com",
      childrenCount: 90,
      isHotClient: false,
      city: { id: CITY_ID, name: "Демо Місто" },
    },
    {
      id: "sch-3",
      name: "Гімназія «Львів'янка»",
      type: "Школа",
      cityId: CITY_ID,
      address: "вул. Городоцька, 5",
      director: "Андрій Богданович",
      phone: "+380321234569",
      email: "gimn@example.com",
      childrenCount: 210,
      isHotClient: false,
      city: { id: CITY_ID, name: "Демо Місто" },
    },
  ],
  meta: { totalItems: 3, page: 1, take: 30, pageCount: 1, hasNextPage: false },
};

const schoolProfileData = {
  id: "sch-1",
  cityId: CITY_ID,
  name: "Ліцей №5",
  type: "Школа",
  city: "Демо Місто",
  address: "вул. Шевченка, 10",
  director: "Наталія Іванівна",
  phone: "+380321234567",
  email: "lyceum5@example.com",
  childrenCount: 320,
  notes: "",
};

const inventory = [
  {
    id: "inv-1",
    name: "Голограма проєктор",
    sku: "PRJ-001",
    category: "Обладнання",
    unit: "шт",
    project: "Голографічне шоу «Космос»",
    minStock: 2,
    currentStock: 5,
    notes: null,
    cityId: CITY_ID,
    schoolId: null,
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-06-01T10:00:00Z",
    city: { id: CITY_ID, name: "Демо Місто" },
    school: null,
  },
  {
    id: "inv-2",
    name: "Матеріали для майстер-класу",
    sku: null,
    category: "Витратні",
    unit: "набір",
    project: null,
    minStock: 10,
    currentStock: 3,
    notes: "Потрібно докупити",
    cityId: CITY_ID,
    schoolId: null,
    createdAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-06-10T10:00:00Z",
    city: { id: CITY_ID, name: "Демо Місто" },
    school: null,
  },
];

const projects = [
  { id: "p-1", name: "Голографічне шоу «Космос»", color: "blue" },
  { id: "p-2", name: "Наукове шоу", color: "green" },
];

const financeDashboard = {
  kpi: { totalRevenue: 480000, totalExpenses: 210000, totalProfit: 270000, totalEvents: 42 },
  monthly: Array.from({ length: 12 }, (_, i) => ({
    month: String(i + 1),
    revenue: 30000 + i * 1500,
    profit: 16000 + i * 900,
  })),
  expectedRevenue: 520000,
  filters: {
    projects: ["Голографічне шоу «Космос»", "Наукове шоу"],
    cities: [
      { id: CITY_ID, name: "Демо Місто" },
      { id: "city-2", name: "Київ" },
    ],
  },
  byProject: [
    { name: "Голографічне шоу «Космос»", value: 300000 },
    { name: "Наукове шоу", value: 180000 },
  ],
  byExpenseCategory: [
    { name: "Зарплата", value: 120000 },
    { name: "Пальне", value: 60000 },
    { name: "Матеріали", value: 30000 },
  ],
  topSchools: [
    { name: "Ліцей №5", count: 8, revenue: 96000 },
    { name: "Гімназія «Львів'янка»", count: 5, revenue: 60000 },
  ],
  topEvents: [
    { id: "ev-1", date: "2026-07-20", school: "Ліцей №5", profit: 5000, revenue: 12000 },
  ],
  worstEvents: [
    { id: "ev-2", date: "2026-06-15", school: "Гімназія", profit: -500, revenue: 8000 },
  ],
};

const dashboardSummary = {
  todayEvents: [
    {
      id: "ev-1",
      time: "10:00",
      project: "Голографічне шоу «Космос»",
      school: { id: "sch-1", name: "Ліцей №5" },
      crew: {
        id: "crew-1",
        name: "Екіпаж №1",
        host: { id: "h1", name: "Олег Ведучий" },
        driver: { id: "d1", name: "Ігор Водій" },
      },
    },
  ],
  upcomingEvents: [
    {
      id: "ev-3",
      date: "2026-07-22",
      time: "09:30",
      project: "Наукове шоу",
      school: { id: "sch-3", name: "Гімназія «Львів'янка»" },
      crew: null,
    },
    {
      id: "ev-4",
      date: "2026-07-25",
      time: "11:00",
      project: "Голографічне шоу «Космос»",
      school: { id: "sch-2", name: "Дитячий садок «Сонечко»" },
      crew: null,
    },
  ],
  funnel: { FIRST_CONTACT: 5, DATE_CONFIRMED: 3, PREPARATION: 2, REPORT: 1, CLOSED: 8 },
  totalSchools: 3,
  monthlyKpi: { revenue: 48000, profit: 26000, children: 320, count: 4 },
  staleSchools: [
    {
      id: "sch-3",
      name: "Гімназія «Львів'янка»",
      status: "FIRST_CONTACT",
      lastActivity: "2026-05-01T10:00:00Z",
      daysStale: 40,
    },
  ],
  activityFeed: [
    {
      id: "a1",
      userName: "Марія Демчук",
      role: "MANAGER",
      action: "Створено подію",
      comment: null,
      createdAt: "2026-07-10T10:00:00Z",
      schoolId: "sch-1",
      schoolName: "Ліцей №5",
      eventId: "ev-1",
    },
  ],
  citiesStats: [
    { cityId: CITY_ID, cityName: "Демо Місто", schoolsCount: 3, activeEvents: 5, monthRevenue: 48000 },
  ],
};

const notifications = [
  {
    id: "n1",
    userId: "user-manager",
    type: "EVENT_RESCHEDULED",
    payload: { title: "Подію «Ліцей №5» перенесено", entityType: "events", entityId: "ev-1" },
    readAt: null,
    createdAt: "2026-07-10T09:00:00Z",
  },
  {
    id: "n2",
    userId: "user-manager",
    type: "REPORT_APPROVED",
    payload: { title: "Звіт схвалено", entityType: "reports", entityId: "rep-1" },
    readAt: null,
    createdAt: "2026-07-10T08:00:00Z",
  },
  {
    id: "n3",
    userId: "user-manager",
    type: "ISSUE_CREATED",
    payload: { title: "Створено зауваження", entityType: "events", entityId: "ev-2" },
    readAt: "2026-07-09T12:00:00Z",
    createdAt: "2026-07-09T12:00:00Z",
  },
];

const analyticsLeaderboard = [
  { cityId: CITY_ID, cityName: "Демо Місто", events: 14, revenue: 480000, profit: 270000, children: 1200, schools: 3 },
  { cityId: "city-2", cityName: "Київ", events: 22, revenue: 720000, profit: 410000, children: 2100, schools: 7 },
  { cityId: "city-3", cityName: "Одеса", events: 8, revenue: 210000, profit: 110000, children: 640, schools: 4 },
];

const monthlyRevenue = Array.from({ length: 12 }, (_, i) => ({
  month: String(i + 1),
  revenue: 30000 + i * 1500,
  profit: 16000 + i * 900,
  events: 2 + (i % 5),
}));

const eventsByCity = [
  { cityId: CITY_ID, cityName: "Демо Місто", events: 14 },
  { cityId: "city-2", cityName: "Київ", events: 22 },
  { cityId: "city-3", cityName: "Одеса", events: 8 },
];

const salaryFund = { total: 120000, month: 7, year: 2026, byCity: { [CITY_ID]: 80000 } };

const kpiManagers = [{ userId: "user-manager", name: "Марія Демчук", approvedReports: 12 }];
const kpiHosts = [{ userId: "h1", name: "Олег Ведучий", avgRating: 4.8, reportsCount: 9 }];
const kpiProjects = [
  { project: "Голографічне шоу «Космос»", eventsCount: 20, childrenTotal: 2400, profit: 150000 },
];

const submittedReports = [
  {
    id: "rep-1",
    eventId: "ev-1",
    status: "SUBMITTED",
    announcementDone: true,
    materialShown: true,
    childrenCount: 98,
    classesCount: 5,
    privilegedCount: 10,
    showingsCount: 1,
    totalSum: 12000,
    schoolSum: 12000,
    remainderSum: 0,
    rating: 5,
    directorSatisfied: true,
    teachersSatisfied: true,
    hadIssues: false,
    comment: "Чудовий захід!",
    revisionComment: null,
    submittedAt: "2026-07-05T10:00:00Z",
    approvedAt: null,
    approvedBy: null,
    createdAt: "2026-07-05T09:00:00Z",
    updatedAt: "2026-07-05T10:00:00Z",
    expenseItems: [{ category: "Пальне", name: "Заправка авто", amount: 800 }],
    salaryRecords: [
      { id: "sr-1", employeeId: "h1", amount: 2500, status: "PAID", createdBy: "user-manager", createdAt: "2026-07-05T09:30:00Z", employee: { id: "h1", name: "Олег Ведучий", role: "HOST" } },
    ],
  },
];

const users = [
  { id: "user-manager", name: "Марія Демчук", email: "demo.manager@svitlo-znan.app", phone: "+380671112233", role: "MANAGER", cityId: CITY_ID, city: { id: CITY_ID, name: "Демо Місто" } },
  { id: "h1", name: "Олег Ведучий", email: "demo.host@svitlo-znan.app", phone: "+380671112234", role: "HOST", cityId: CITY_ID, city: { id: CITY_ID, name: "Демо Місто" } },
  { id: "d1", name: "Ігор Водій", email: "demo.driver@svitlo-znan.app", phone: "+380671112235", role: "DRIVER", cityId: CITY_ID, city: { id: CITY_ID, name: "Демо Місто" } },
  { id: "user-admin", name: "Адміністратор", email: "admin@example.com", phone: null, role: "SUPERADMIN", cityId: null, city: null },
];

interface MockResult {
  status: number;
  body: unknown;
}

function resolve(apiPath: string, method: string, role: MockRole | null): MockResult | null {
  if (apiPath === "/auth/me") {
    if (role === null) return { status: 401, body: { message: "Не авторизовано" } };
    return { status: 200, body: { user: USERS[role] } };
  }
  if (apiPath === "/auth/login") {
    if (role === null) return { status: 401, body: { message: "Невірний email або пароль" } };
    return { status: 200, body: { user: USERS[role] } };
  }
  if (apiPath === "/auth/logout") return { status: 204, body: "" };
  if (apiPath === "/auth/refresh") return { status: 200, body: {} };

  if (apiPath === "/notifications/unread-count") return { status: 200, body: { count: 3 } };
  if (apiPath === "/notifications") {
    return { status: 200, body: { items: notifications, total: notifications.length, page: 1, pageCount: 1 } };
  }

  if (apiPath === "/dashboard/summary") return { status: 200, body: dashboardSummary };

  if (apiPath === "/cities/leaderboard" || apiPath === "/analytics/city-leaderboard") {
    return { status: 200, body: analyticsLeaderboard };
  }
  if (apiPath === "/analytics/revenue-by-month") return { status: 200, body: monthlyRevenue };
  if (apiPath === "/analytics/events-by-city") return { status: 200, body: eventsByCity };
  if (apiPath === "/analytics/salary-fund") return { status: 200, body: salaryFund };
  if (apiPath === "/analytics/kpi/managers") return { status: 200, body: kpiManagers };
  if (apiPath === "/analytics/kpi/hosts") return { status: 200, body: kpiHosts };
  if (apiPath === "/analytics/kpi/projects") return { status: 200, body: kpiProjects };

  if (apiPath === "/cities") return { status: 200, body: cities };
  if (apiPath.startsWith("/cities/") && apiPath.split("/")[2] !== "leaderboard") {
    return { status: 200, body: cityProfile };
  }

  if (apiPath === "/schools/stats") {
    return { status: 200, body: { total: 3, byType: { Школа: 2, Садочок: 1 }, byStage: { new: 1, planned: 1, inProgress: 1, done: 0 } } };
  }
  if (apiPath === "/schools/supported-cities") return { status: 200, body: ["Демо Місто", "Київ", "Одеса", "Львів"] };
  if (apiPath.startsWith("/schools/")) return { status: 200, body: schoolProfileData };
  if (apiPath === "/schools") return { status: 200, body: schoolsData };

  if (apiPath === "/events") return { status: 200, body: { data: events } };
  if (apiPath === "/projects") return { status: 200, body: { data: projects } };
  if (apiPath === "/users") return { status: 200, body: users };

  if (apiPath === "/inventory/low-stock") return { status: 200, body: inventory.filter((i) => i.currentStock <= i.minStock) };
  if (apiPath.startsWith("/inventory/by-project")) return { status: 200, body: inventory };
  if (apiPath === "/inventory") return { status: 200, body: inventory };

  if (apiPath === "/finance/dashboard") return { status: 200, body: financeDashboard };
  if (apiPath === "/reports/submitted") return { status: 200, body: submittedReports };

  if (method === "GET") return { status: 200, body: [] };
  return { status: 200, body: {} };
}

function handleRoute(route: Route, role: MockRole | null): void {
  const request = route.request();
  const url = new URL(request.url());
  const segments = url.pathname.split("/").filter(Boolean);

  if (segments[0] !== "api") {
    void route.continue();
    return;
  }

  const apiPath = "/" + segments.slice(1).join("/");
  const result = resolve(apiPath, request.method(), role);

  if (!result) {
    void route.continue();
    return;
  }

  if (result.status === 204) {
    void route.fulfill({ status: 204, body: "" });
    return;
  }

  void route.fulfill({
    status: result.status,
    contentType: "application/json",
    body: JSON.stringify(result.body),
  });
}

export function setupApiMocking(page: Page, role: MockRole | null): void {
  void page.route("**/api/**", (route) => handleRoute(route, role));
}
