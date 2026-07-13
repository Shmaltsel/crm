import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from '../../components/ProtectedRoute';

let mockUser: { id: string; name: string; email: string; role: string; cityId: string | null; cityName: string | null } | null = null;
let mockLoading = false;

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({ user: mockUser, loading: mockLoading, login: vi.fn(), logout: vi.fn() }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

function renderProtected(role: string | null, path: string, allowedRoles: string[]) {
  mockUser = role
    ? { id: 'test-id', name: 'Test', email: 't@t.com', role, cityId: null, cityName: null }
    : null;
  mockLoading = false;
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route
            path={path}
            element={
              <ProtectedRoute allowedRoles={allowedRoles}>
                <div data-testid="protected-content">Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div data-testid="login-page">Login</div>} />
          <Route path="/schools" element={<div data-testid="schools-page">Schools</div>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('§1.4 Frontend RBAC — ProtectedRoute', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const forbiddenForFieldStaff = [
    { path: '/cities', roles: ['SUPERADMIN', 'OWNER'] },
    { path: '/employees', roles: ['SUPERADMIN'] },
    { path: '/dashboard', roles: ['SUPERADMIN', 'OWNER', 'MANAGER'] },
    { path: '/city-leaderboard', roles: ['SUPERADMIN', 'OWNER', 'MANAGER'] },
    { path: '/inventory', roles: ['SUPERADMIN', 'OWNER', 'MANAGER'] },
    { path: '/finance', roles: ['SUPERADMIN', 'OWNER', 'MANAGER'] },
  ];

  for (const route of forbiddenForFieldStaff) {
    it(`HOST на ${route.path} → redirect`, async () => {
      const { queryByTestId } = renderProtected('HOST', route.path, route.roles);
      await waitFor(() => {
        expect(queryByTestId('protected-content')).toBeNull();
      });
    });

    it(`DRIVER на ${route.path} → redirect`, async () => {
      const { queryByTestId } = renderProtected('DRIVER', route.path, route.roles);
      await waitFor(() => {
        expect(queryByTestId('protected-content')).toBeNull();
      });
    });
  }

  it('MANAGER на /employees → redirect', async () => {
    const { queryByTestId } = renderProtected('MANAGER', '/employees', ['SUPERADMIN']);
    await waitFor(() => {
      expect(queryByTestId('protected-content')).toBeNull();
    });
  });

  it('OWNER на /employees → redirect', async () => {
    const { queryByTestId } = renderProtected('OWNER', '/employees', ['SUPERADMIN']);
    await waitFor(() => {
      expect(queryByTestId('protected-content')).toBeNull();
    });
  });

  it('SUPERADMIN на /cities → бачить контент', async () => {
    const { getByTestId } = renderProtected('SUPERADMIN', '/cities', ['SUPERADMIN', 'OWNER']);
    await waitFor(() => {
      expect(getByTestId('protected-content')).toBeDefined();
    });
  });

  it('SUPERADMIN на /employees → бачить контент', async () => {
    const { getByTestId } = renderProtected('SUPERADMIN', '/employees', ['SUPERADMIN']);
    await waitFor(() => {
      expect(getByTestId('protected-content')).toBeDefined();
    });
  });

  it('MANAGER на /dashboard → бачить контент', async () => {
    const { getByTestId } = renderProtected('MANAGER', '/dashboard', ['SUPERADMIN', 'OWNER', 'MANAGER']);
    await waitFor(() => {
      expect(getByTestId('protected-content')).toBeDefined();
    });
  });

  it('Неавторизований → redirect на /login', async () => {
    const { queryByTestId } = renderProtected(null, '/cities', ['SUPERADMIN']);
    await waitFor(() => {
      expect(queryByTestId('protected-content')).toBeNull();
      expect(queryByTestId('login-page')).toBeDefined();
    });
  });

  it('MANAGER → /employees redirect на /schools', async () => {
    const { queryByTestId } = renderProtected('MANAGER', '/employees', ['SUPERADMIN']);
    await waitFor(() => {
      expect(queryByTestId('protected-content')).toBeNull();
      expect(queryByTestId('schools-page')).toBeDefined();
    });
  });
});
