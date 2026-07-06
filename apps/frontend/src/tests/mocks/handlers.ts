import { http, HttpResponse } from "msw";

const BASE = "http://localhost:3000/api";

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

  http.post(`${BASE}/auth/login`, () =>
    HttpResponse.json({ access_token: "test-token" })
  ),
];