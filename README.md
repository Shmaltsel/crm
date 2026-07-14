# Event CRM

> **Production-ready CRM system for managing educational events at schools and kindergartens**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-11.8-orange)](https://pnpm.io/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Event CRM** is a specialized CRM system designed to automate the complete lifecycle of managing educational entertainment events at schools and kindergartens.

### What It Does

- **Lead Management**: Track schools/kindergartens from first contact to repeat sales
- **Event Planning**: Schedule events, assign crews, manage logistics
- **Financial Tracking**: Revenue, expenses, profit reporting per event/city
- **Team Coordination**: Host & driver assignment, day-off management, workload tracking
- **Analytics**: Real-time dashboards, revenue forecasting, performance metrics

### Who It's For

- Event management companies operating educational programs
- Organizations managing multiple event crews across cities
- Teams needing CRM pipeline + event logistics + financial reporting in one system

---

## ✨ Key Features

### 🔄 Complete CRM Pipeline

```
Base → First Contact → Interested → Pre Approval → Date Confirmed 
  → Preparation → In Progress → Done → Report → Re Sale
```

- Visual pipeline with drag-and-drop (coming soon)
- Automatic status progression
- History tracking for every change

### 📅 Event Management

- **Event Creation**: Link to school, city, date, time, attendance
- **Crew Assignment**: Assign host + driver + vehicle with availability checks
- **Preparation Checklist**: Equipment booking, materials, documents, confirmations
- **Day-off Management**: Prevent crew conflicts, manager notifications

### 🏫 Educational Facility Database

- **Schools & Kindergartens**: Searchable database with auto-complete from open data
- **Contact Management**: Decision makers, phone numbers, notes
- **Interaction History**: Every call, meeting, event tracked
- **Re-sale Tracking**: Automatic pipeline progression after successful events

### 💰 Financial Module

- **Revenue Tracking**: Per event, per city, per project type
- **Expense Management**: Crew salaries, transportation, materials
- **Profit Calculation**: Automatic margin calculation
- **Reports**: Submit, review, approve with PDF export

### 📊 Real-time Analytics

- **KPI Dashboard**: Total revenue, events count, average profit, completion rate
- **Revenue Charts**: Monthly trends, city comparison, project breakdown
- **Forecasting**: Predictive revenue based on confirmed events
- **Performance Metrics**: Best/worst events, crew productivity

### 👥 Role-Based Access Control

| Role | Capabilities |
|------|-------------|
| **Super Admin** | Full system access, user management |
| **Admin** | Manage events, crews, reports across all cities |
| **Manager** | City-specific event & crew management |
| **Host** | View assigned events, submit reports |
| **Driver** | View assigned events, navigation support |
| **Accountant** | Financial reports, expense tracking |

---

## 🛠 Tech Stack

### Backend

| Technology | Purpose | Version |
|-----------|---------|---------|
| **NestJS** | API framework | 11.x |
| **TypeScript** | Type safety | 5.7 |
| **Prisma** | ORM + migrations | 6.x |
| **PostgreSQL** | Primary database | 16+ |
| **Redis** | Caching + rate limiting | 7+ |
| **JWT** | Authentication | - |
| **Bcrypt** | Password hashing | - |
| **Swagger** | API documentation | 8.x |
| **Sentry** | Error monitoring | 8.x |
| **Prometheus** | Metrics | - |

### Frontend

| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI library | 19.x |
| **TypeScript** | Type safety | 5.7 |
| **Vite** | Build tool | 6.x |
| **React Router** | Navigation | 7.x |
| **TanStack Query** | Server state | 5.x |
| **Zustand** | Client state | 5.x |
| **Tailwind CSS** | Styling | 3.x |
| **Framer Motion** | Animations | 11.x |
| **Recharts** | Data visualization | 2.x |
| **React Hook Form** | Form management | 7.x |
| **Zod** | Validation | 3.x |

### Infrastructure

- **Deployment**: Railway (backend), Vercel (frontend)
- **Database**: Neon Serverless Postgres
- **Monitoring**: Sentry, Prometheus + Grafana
- **CI/CD**: GitHub Actions
- **Package Manager**: pnpm 11.8

---

## 🏗 Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Devices                        │
│  (Desktop Browser, Mobile Browser, Tablet)                   │
└────────────────┬────────────────────────────────────────────┘
                 │ HTTPS
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                        │
│  - React SPA (Static Assets)                                 │
│  - Global CDN                                                 │
│  - Automatic HTTPS                                            │
└────────────────┬────────────────────────────────────────────┘
                 │ API Calls
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                      Railway Platform                         │
│  ┌────────────────────────────────────────────────────┐      │
│  │              NestJS Backend                        │      │
│  │  - REST API (JWT auth)                             │      │
│  │  - Business Logic                                  │      │
│  │  - Swagger Docs (/docs)                            │      │
│  │  - Health Checks (/.well-known/health)             │      │
│  │  - Prometheus Metrics (/metrics)                   │      │
│  └────────┬──────────────────────┬────────────────────┘      │
│           │                      │                            │
│           ▼                      ▼                            │
│  ┌────────────────┐    ┌────────────────┐                    │
│  │  Redis Cache   │    │ Neon Postgres  │                    │
│  │  - Rate limit  │    │  - Pooled conn │                    │
│  │  - Cache layer │    │  - Direct conn │                    │
│  └────────────────┘    │  - Auto backup │                    │
│                        └────────────────┘                     │
└─────────────────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                   External Services                           │
│  - Sentry (Error tracking)                                    │
│  - Telegram Bot (Notifications)                               │
│  - Open Data APIs (School info auto-fill)                     │
└─────────────────────────────────────────────────────────────┘
```

### Monorepo Structure

```
CRM/
├── apps/
│   ├── backend/          # NestJS API
│   │   ├── src/
│   │   │   ├── auth/            # JWT authentication
│   │   │   ├── users/           # User management
│   │   │   ├── events/          # Event CRUD + pipeline
│   │   │   ├── schools/         # School & kindergarten DB
│   │   │   ├── cities/          # City management
│   │   │   ├── finance/         # Revenue/expenses
│   │   │   ├── reports/         # Event reports
│   │   │   ├── dashboard/       # Analytics aggregation
│   │   │   ├── days-off/        # Crew availability
│   │   │   ├── notifications/   # Telegram integration
│   │   │   ├── audit-log/       # Change history
│   │   │   └── common/          # Shared utilities
│   │   ├── prisma/
│   │   │   ├── schema.prisma    # Database schema
│   │   │   ├── migrations/      # Version-controlled DB changes
│   │   │   └── seed-*.js        # Data seeding scripts
│   │   └── test/                # E2E tests
│   │
│   └── frontend/         # React SPA
│       ├── src/
│       │   ├── pages/           # Route components
│       │   ├── components/      # Reusable UI
│       │   ├── features/        # Feature-specific code
│       │   ├── hooks/           # React Query hooks
│       │   ├── context/         # React Context (Auth, Theme)
│       │   ├── config/          # API client, constants
│       │   ├── types/           # TypeScript types
│       │   ├── utils/           # Helper functions
│       │   └── tests/           # Unit + integration tests
│       └── e2e/                 # Playwright E2E tests
│
├── scripts/              # Operational scripts
│   ├── backup.sh               # Database backup
│   └── restore.sh              # Database restore
│
├── .github/              # CI/CD workflows
│   └── workflows/
│       ├── ci.yml              # PR checks
│       └── deploy.yml          # Production deploy
│
├── docs/                 # Extended documentation
│   ├── ARCHITECTURE.md         # Deep-dive system design
│   ├── API.md                  # API reference
│   ├── DEPLOYMENT.md           # Production deployment guide
│   └── CONTRIBUTING.md         # Developer guide
│
├── package.json          # Root scripts
├── pnpm-workspace.yaml   # Monorepo config
├── turbo.json            # Build orchestration
└── README.md             # This file
```

### Authentication Flow

```
┌──────────┐                                    ┌──────────┐
│  Client  │                                    │  Server  │
└─────┬────┘                                    └────┬─────┘
      │                                              │
      │  POST /auth/login                            │
      │  { email, password }                         │
      ├─────────────────────────────────────────────>│
      │                                              │
      │  Verify credentials                          │
      │  Generate JWT (access + refresh)             │
      │                                              │
      │  Set-Cookie: access_token (15m)              │
      │  Set-Cookie: refresh_token (7d)              │
      │  Set-Cookie: csrf_token                      │
      │<─────────────────────────────────────────────┤
      │                                              │
      │  Subsequent API calls                        │
      │  Cookie: access_token                        │
      │  X-CSRF-Token: <token>                       │
      ├─────────────────────────────────────────────>│
      │                                              │
      │  Verify JWT + CSRF                           │
      │  Process request                             │
      │                                              │
      │  200 OK + data                               │
      │<─────────────────────────────────────────────┤
      │                                              │
      │  ... 15 minutes later ...                    │
      │                                              │
      │  API call (access_token expired)             │
      ├─────────────────────────────────────────────>│
      │                                              │
      │  401 Unauthorized                            │
      │<─────────────────────────────────────────────┤
      │                                              │
      │  POST /auth/refresh                          │
      │  Cookie: refresh_token                       │
      ├─────────────────────────────────────────────>│
      │                                              │
      │  Verify refresh_token                        │
      │  Generate new access_token                   │
      │                                              │
      │  Set-Cookie: access_token (new 15m)          │
      │<─────────────────────────────────────────────┤
      │                                              │
      │  Retry original request                      │
      ├─────────────────────────────────────────────>│
      │                                              │
      │  200 OK + data                               │
      │<─────────────────────────────────────────────┤
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: 22.0.0 or higher ([Download](https://nodejs.org/))
- **pnpm**: 11.8.0 or higher
  ```bash
  npm install -g pnpm@11.8.0
  ```
- **PostgreSQL**: 16+ (or use Neon serverless)
- **Redis**: 7+ (optional for local dev, required for production)
- **Git**: Latest version

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/your-org/event-crm.git
cd event-crm
```

#### 2. Install dependencies

```bash
pnpm install
```

This installs all dependencies for both backend and frontend workspaces.

#### 3. Configure environment variables

**Backend** (`apps/backend/.env`):

```bash
# Copy example file
cp apps/backend/.env.example apps/backend/.env
```

Edit `apps/backend/.env`:

```env
# Environment
NODE_ENV=development
PORT=3000

# Database (Neon Postgres)
DATABASE_URL=postgresql://user:password@host/db?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://user:password@host/db

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173

# Redis
REDIS_URL=redis://localhost:6379

# JWT Secrets (generate with: openssl rand -base64 32)
JWT_ACCESS_SECRET=your-access-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here

# Admin Seed
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=SecurePassword123!

# Feature Flags
FEATURE_TELEGRAM_NOTIFICATIONS=false
FEATURE_AUTO_SCHOOL_IMPORT=true
FEATURE_FINANCE_MODULE=true

# Optional: Sentry Error Tracking
SENTRY_DSN=

# Optional: Telegram Bot
TELEGRAM_BOT_TOKEN=
```

**Frontend** (`apps/frontend/.env`):

```bash
# Copy example file
cp apps/frontend/.env.example apps/frontend/.env
```

Edit `apps/frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

#### 4. Set up the database

```bash
# Generate Prisma client
pnpm --filter backend exec prisma generate

# Run migrations
pnpm --filter backend exec prisma migrate deploy

# Seed admin user
pnpm --filter backend exec node prisma/seed-admin.js

# (Optional) Seed demo data
pnpm seed:demo
```

#### 5. Start development servers

```bash
# Start both backend and frontend concurrently
pnpm dev
```

- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173
- **API Docs**: http://localhost:3000/docs

#### 6. Login

Open http://localhost:5173 and login with:

- **Email**: admin@example.com (or your `SEED_ADMIN_EMAIL`)
- **Password**: SecurePassword123! (or your `SEED_ADMIN_PASSWORD`)

---

## 💻 Development

### Project Structure

```
apps/backend/src/
├── auth/               # Authentication & authorization
├── users/              # User CRUD + roles
├── events/             # Event management + pipeline
├── schools/            # Schools & kindergartens
├── cities/             # City & crew management
├── finance/            # Revenue & expenses
├── reports/            # Event reports
├── dashboard/          # Analytics aggregation
├── days-off/           # Crew availability
├── notifications/      # Telegram integration
├── audit-log/          # Change history
├── common/             # Guards, interceptors, filters
└── main.ts             # Bootstrap

apps/frontend/src/
├── pages/              # Route-level components
├── components/         # Reusable UI components
├── features/           # Feature-specific modules
├── hooks/              # React Query + custom hooks
├── context/            # React Context providers
├── config/             # Axios client, constants
├── types/              # TypeScript interfaces
├── utils/              # Helper functions
└── main.tsx            # Entry point
```

### Common Commands

```bash
# Development
pnpm dev                              # Start both backend + frontend
pnpm --filter backend start:dev       # Backend only
pnpm --filter frontend dev            # Frontend only

# Type Checking
pnpm --filter backend exec tsc --noEmit
pnpm --filter frontend exec tsc --noEmit

# Linting
pnpm --filter backend lint
pnpm --filter frontend lint

# Building
pnpm --filter backend build
pnpm --filter frontend build

# Database
pnpm --filter backend exec prisma studio        # Visual DB editor
pnpm --filter backend exec prisma migrate dev   # Create + apply migration
pnpm --filter backend exec prisma db push       # Sync schema without migration
```

### Adding a New Feature

#### Backend Module

```bash
# Generate NestJS module
cd apps/backend
nest g module feature-name
nest g controller feature-name
nest g service feature-name
```

Follow the patterns in existing modules:
- DTOs in `dto/` folder (use `class-validator`)
- Interfaces in module root
- Tests next to source files (`*.spec.ts`)

#### Frontend Component

```tsx
// apps/frontend/src/components/FeatureName.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../config/api';

export default function FeatureName() {
  const { data, isLoading } = useQuery({
    queryKey: ['featureName'],
    queryFn: () => api.get('/feature-name').then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {/* Your component */}
    </div>
  );
}
```

### Database Migrations

```bash
# 1. Update schema.prisma
# 2. Create migration
pnpm --filter backend exec prisma migrate dev --name add_new_field

# 3. Apply in production
pnpm --filter backend exec prisma migrate deploy
```

---

## 🧪 Testing

### Test Structure

```
apps/backend/
├── src/                      # Unit tests next to source
│   └── users/
│       ├── users.service.ts
│       └── users.service.spec.ts
└── test/                     # E2E tests
    └── events.e2e-spec.ts

apps/frontend/
├── src/
│   └── tests/
│       ├── setup.ts          # Test configuration
│       ├── mocks/            # MSW handlers
│       ├── unit/             # Pure logic tests
│       ├── component/        # Component tests
│       └── integration/      # Feature tests
└── e2e/                      # Playwright E2E tests
```

### Running Tests

```bash
# Unit Tests
pnpm test:unit                    # All unit tests (backend + frontend)
pnpm --filter backend test        # Backend only
pnpm --filter frontend test:run   # Frontend only

# Specific Test File
pnpm --filter backend test -- src/users/users.service.spec.ts
pnpm --filter frontend test:run -- src/tests/unit/utils.test.ts

# Coverage
pnpm test:coverage                # With thresholds (70/50/60/70)

# E2E Tests
pnpm test:e2e:backend             # Backend E2E (requires DB + Redis)
pnpm test:e2e:frontend            # Playwright E2E
pnpm test:e2e                     # Both

# Smoke Tests (quick sanity check)
pnpm test:smoke

# Affected Tests (only changed code)
pnpm test:affected
```

### Writing Tests

#### Backend Unit Test (Jest)

```typescript
// users.service.spec.ts
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should find user by email', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser as any);

    const result = await service.findByEmail('test@example.com');
    expect(result).toEqual(mockUser);
  });
});
```

#### Frontend Component Test (Vitest + Testing Library)

```tsx
// Login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './Login';
import { server } from '../tests/mocks/server';
import { http, HttpResponse } from 'msw';

const queryClient = new QueryClient();

function renderLogin() {
  return render(
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  );
}

describe('Login', () => {
  it('logs in successfully', async () => {
    server.use(
      http.post('/api/auth/login', () => {
        return HttpResponse.json({ user: { email: 'test@example.com' } });
      })
    );

    renderLogin();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });
  });
});
```

### Test Coverage Thresholds

```json
{
  "coverageThreshold": {
    "global": {
      "branches": 70,
      "functions": 50,
      "lines": 60,
      "statements": 70
    }
  }
}
```

---

## 🚢 Deployment

### Production Deployment

**Backend** (Railway):

1. Connect GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy command: `pnpm --filter backend exec prisma migrate deploy && pnpm --filter backend build && pnpm --filter backend start:prod`
4. Health check: `/.well-known/health`

**Frontend** (Vercel):

1. Connect GitHub repository to Vercel
2. Set `VITE_API_URL` to Railway backend URL
3. Build command: `pnpm --filter frontend build`
4. Output directory: `apps/frontend/dist`

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed production setup guide.

### Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ | Pooled Postgres connection | `postgresql://...?pgbouncer=true` |
| `DIRECT_URL` | ✅ | Direct Postgres connection (migrations) | `postgresql://...` |
| `REDIS_URL` | ✅ | Redis connection string | `redis://localhost:6379` |
| `JWT_ACCESS_SECRET` | ✅ | JWT access token secret | `<random-32-chars>` |
| `JWT_REFRESH_SECRET` | ✅ | JWT refresh token secret | `<random-32-chars>` |
| `FRONTEND_URL` | ✅ | Frontend URL for CORS | `https://app.example.com` |
| `SENTRY_DSN` | ⚠️ | Sentry error tracking | `https://...@sentry.io/...` |
| `TELEGRAM_BOT_TOKEN` | ⚠️ | Telegram notifications | `123456:ABC-DEF...` |
| `SEED_ADMIN_EMAIL` | ⚠️ | Admin user email | `admin@example.com` |
| `SEED_ADMIN_PASSWORD` | ⚠️ | Admin user password | `SecurePassword123!` |

---

## 📚 Documentation

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)**: Deep-dive into system design, patterns, and decisions
- **[API.md](docs/API.md)**: Complete API reference with examples
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)**: Production deployment guide
- **[CONTRIBUTING.md](docs/CONTRIBUTING.md)**: Developer guide and contribution workflow
- **[AGENTS.md](AGENTS.md)**: AI agent instructions for code assistance

### API Documentation

Interactive API documentation is available at:

- **Swagger UI**: http://localhost:3000/docs
- **ReDoc**: http://localhost:3000/docs/redoc
- **OpenAPI JSON**: http://localhost:3000/docs-json

---

## 🔒 Security

### Best Practices

- ✅ **JWT + CSRF Protection**: Dual-token system with CSRF validation
- ✅ **HTTP-only Cookies**: Tokens not accessible via JavaScript
- ✅ **bcrypt Password Hashing**: 10 rounds, industry standard
- ✅ **Rate Limiting**: Redis-based throttling on sensitive endpoints
- ✅ **Role-Based Access Control**: Granular permissions per route
- ✅ **Audit Logging**: All mutations tracked with user + timestamp
- ✅ **SQL Injection Prevention**: Prisma parameterized queries
- ✅ **XSS Protection**: React auto-escaping + CSP headers

### Reporting Security Issues

Please report security vulnerabilities to **security@example.com**. Do not open public GitHub issues for security bugs.

---

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for:

- Code style guide
- Commit message conventions
- Pull request process
- Testing requirements

### Quick Start for Contributors

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/event-crm.git

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Make your changes
# 5. Run tests
pnpm test:unit

# 6. Commit with conventional commits
git commit -m "feat: add new dashboard widget"

# 7. Push and open a PR
git push origin feature/your-feature-name
```

---

## 📊 Monitoring & Observability

### Health Checks

```bash
# Application health
curl http://localhost:3000/.well-known/health

# Response (healthy):
{
  "status": "ok",
  "timestamp": "2026-07-14T10:52:58.223Z",
  "database": "connected",
  "redis": "connected"
}
```

### Metrics

Prometheus metrics available at: `http://localhost:3000/metrics`

Key metrics:
- `http_request_duration_seconds`: API response times
- `http_requests_total`: Request count by endpoint
- `database_query_duration_seconds`: DB query performance

### Error Tracking

Sentry integration captures:
- Unhandled exceptions
- Promise rejections
- API errors with context
- User impact tracking

---

## 🗺 Roadmap

### Q3 2026

- [ ] **Drag-and-Drop Pipeline**: Visual CRM board
- [ ] **Mobile Apps**: React Native iOS/Android
- [ ] **WhatsApp Integration**: Automated event reminders
- [ ] **Invoice Generation**: PDF invoices with e-signature

### Q4 2026

- [ ] **AI Event Scheduling**: ML-based optimal crew assignment
- [ ] **Calendar Sync**: Google Calendar / Outlook integration
- [ ] **Multi-language**: English, Polish support
- [ ] **Dark Mode**: System-aware theme switching

### 2027

- [ ] **Multi-tenancy**: SaaS offering for multiple organizations
- [ ] **Advanced Analytics**: Predictive modeling, churn analysis
- [ ] **Integration Marketplace**: Zapier, Make, n8n connectors

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [React](https://react.dev/) - UI library
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [TanStack Query](https://tanstack.com/query) - Powerful data synchronization
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Recharts](https://recharts.org/) - Composable charting library

---

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-org/event-crm/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/event-crm/discussions)
- **Email**: support@example.com

---

<div align="center">
  <strong>Built with ❤️ by the Event CRM Team</strong>
  <br />
  <sub>Making event management effortless</sub>
</div>
