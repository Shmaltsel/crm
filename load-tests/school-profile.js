import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";

export const options = {
  scenarios: {
    baseline: {
      executor: "constant-vus",
      vus: 10,
      duration: "1m",
      startTime: "0s",
    },
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
    "http_req_duration{endpoint:school}": ["p(95)<600"],
    "http_req_duration{endpoint:events}": ["p(95)<600"],
    http_req_failed: ["rate<0.02"],
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";
const PASSWORD = __ENV.TEST_PASSWORD;
const SCHOOL_ID = __ENV.TEST_SCHOOL_ID;
const USER_COUNT = 10;

export function setup() {
  const cookieHeaders = [];
  for (let i = 1; i <= USER_COUNT; i++) {
    const email = `loadtest${i}@svitlo-znan.app`;
    const res = http.post(
      `${BASE_URL}/auth/login`,
      JSON.stringify({ email, password: PASSWORD }),
      { headers: { "Content-Type": "application/json" } },
    );
    if (res.status !== 200) {
      throw new Error(`Login failed for ${email}: ${res.status} ${res.body}`);
    }
    const accessToken = res.cookies.access_token[0].value;
    cookieHeaders.push(`access_token=${accessToken}`);
  }
  return { cookieHeaders };
}

export default function (data) {
  const idx = (exec.vu.idInTest - 1) % USER_COUNT;
  const cookie = data.cookieHeaders[idx];
  const headers = { Cookie: cookie };

  const schoolRes = http.get(`${BASE_URL}/schools/${SCHOOL_ID}`, {
    headers,
    tags: { endpoint: "school" },
  });
  check(schoolRes, { "school status 200": (r) => r.status === 200 });

  const eventsRes = http.get(`${BASE_URL}/events/school/${SCHOOL_ID}`, {
    headers,
    tags: { endpoint: "events" },
  });
  check(eventsRes, { "events status 200": (r) => r.status === 200 });

  sleep(Math.random() * 2 + 1);
}
