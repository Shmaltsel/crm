import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  scenarios: {
    baseline: { executor: "constant-vus", vus: 10, duration: "1m" },
    peak: {
      executor: "constant-vus",
      vus: 30,
      duration: "1m",
      startTime: "1m10s",
    },
    stress: {
      executor: "constant-vus",
      vus: 60,
      duration: "1m",
      startTime: "2m20s",
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<600"],
    http_req_failed: ["rate<0.02"],
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";
const EMAIL = __ENV.TEST_EMAIL;
const PASSWORD = __ENV.TEST_PASSWORD;
const SCHOOL_ID = __ENV.TEST_SCHOOL_ID;

export default function () {
  http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: EMAIL, password: PASSWORD }),
    { headers: { "Content-Type": "application/json" } },
  );

  const schoolRes = http.get(`${BASE_URL}/schools/${SCHOOL_ID}`);
  check(schoolRes, { "school status 200": (r) => r.status === 200 });

  const eventsRes = http.get(`${BASE_URL}/events/school/${SCHOOL_ID}`);
  check(eventsRes, { "events status 200": (r) => r.status === 200 });

  sleep(Math.random() * 2 + 1);
}
