import { http, HttpResponse } from "msw";

const BASE = "/api";

export const handlers = [
  http.get(`${BASE}/cities`, () =>
    HttpResponse.json([
      { id: "city-1", name: "Львів", plannedEvents: 3, completedEvents: 10, schoolsCount: 50 },
      { id: "city-2", name: "Київ", plannedEvents: 1, completedEvents: 5, schoolsCount: 30 },
    ])
  ),

  http.get(`${BASE}/schools`, () =>
    HttpResponse.json([
      { id: "school-1", name: "Школа №1", type: "Школа", cityId: "city-1", childrenCount: 300, events: [] },
      { id: "school-2", name: "Школа №5", type: "Школа", cityId: "city-1", childrenCount: 100, events: [] },
    ])
  ),

  http.get(`${BASE}/schools/:id`, ({ params }) =>
    HttpResponse.json({
      id: params.id,
      name: "Школа №1",
      type: "Школа",
      cityId: "city-1",
      city: { id: "city-1", name: "Львів" },
      director: "Іван Петренко",
      phone: "0671234567",
      address: "вул. Тестова 1",
      childrenCount: 300,
    })
  ),

  http.get(`${BASE}/events/school/:schoolId`, () =>
    HttpResponse.json([
      {
        id: "event-1",
        project: "Голограма для школи",
        date: "2026-07-01T10:00:00Z",
        time: "10:00",
        status: "BASE",
        price: 5000,
        childrenPlanned: 100,
        address: "вул. Тестова 1",
        contactPerson: "Іван",
        contactPhone: "0671234567",
      },
    ])
  ),

  http.get(`${BASE}/users`, () =>
    HttpResponse.json([
      { id: "user-1", name: "Адміністратор", email: "admin@crm.com", role: "SUPERADMIN" },
    ])
  ),

  http.get(`${BASE}/dashboard/summary`, () =>
    HttpResponse.json({
      todayEvents: [],
      upcomingEvents: [],
      funnel: { BASE: 10, FIRST_CONTACT: 5 },
      totalSchools: 50,
      monthlyKpi: { revenue: 50000, profit: 20000, children: 500, count: 10 },
      staleSchools: [],
      activityFeed: [],
      citiesStats: [],
    })
  ),

  // Finance endpoints
  http.get(`${BASE}/finance/staff-revenue`, () =>
    HttpResponse.json([
      { staffId: "user-1", name: "Адміністратор", revenue: 50000, eventsCount: 10 },
    ])
  ),

  // Analytics endpoints
  http.get(`${BASE}/analytics/city-leaderboard`, () =>
    HttpResponse.json([
      { cityId: "city-1", cityName: "Львів", value: 100 },
      { cityId: "city-2", cityName: "Київ", value: 80 },
    ])
  ),

  http.get(`${BASE}/issues`, () =>
    HttpResponse.json([
      { id: "issue-1", title: "Test issue", cityId: "city-1", status: "OPEN" },
    ])
  ),

  http.get(`${BASE}/analytics/kpi/managers`, () =>
    HttpResponse.json([
      { userId: "user-1", name: "Manager 1", events: 10, revenue: 50000 },
    ])
  ),

  http.get(`${BASE}/analytics/kpi/hosts`, () =>
    HttpResponse.json([
      { userId: "user-1", name: "Host 1", events: 5, children: 200 },
    ])
  ),

  http.get(`${BASE}/analytics/kpi/projects`, () =>
    HttpResponse.json([
      { projectId: "proj-1", name: "Project 1", revenue: 50000, events: 3 },
    ])
  ),

  http.get(`${BASE}/analytics/revenue-by-month`, () =>
    HttpResponse.json([
      { month: "2026-01", revenue: 10000 },
      { month: "2026-02", revenue: 15000 },
    ])
  ),

  http.get(`${BASE}/analytics/events-by-city`, () =>
    HttpResponse.json([
      { cityId: "city-1", cityName: "Львів", events: 10 },
      { cityId: "city-2", cityName: "Київ", events: 5 },
    ])
  ),

  http.get(`${BASE}/analytics/salary-fund`, () =>
    HttpResponse.json([
      { month: "2026-01", fund: 50000 },
      { month: "2026-02", fund: 60000 },
    ])
  ),


  // Reports
  http.get(`${BASE}/reports/submitted`, () =>
    HttpResponse.json([
      { id: "report-1", eventId: "event-1", schoolName: "School 1", status: "APPROVED" },
    ])
  ),

  http.post(`${BASE}/auth/login`, () =>
    HttpResponse.json({ access_token: "test-token" })
  ),

  http.get(`${BASE}/auth/me`, () =>
    HttpResponse.json({
      user: { id: "user-1", name: "Тестовий", email: "test@crm.com", role: "SUPERADMIN", cityId: "city-1", cityName: "Львів" },
    })
  ),

  http.post(`${BASE}/auth/logout`, () =>
    HttpResponse.json({ ok: true })
  ),
];
