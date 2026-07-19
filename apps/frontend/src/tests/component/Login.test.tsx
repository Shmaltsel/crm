import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: null, loading: false, login: vi.fn(), logout: vi.fn() }),
}));

vi.mock("../../context/ThemeContext", () => ({
  useTheme: () => ({ theme: "light" as const, toggleTheme: vi.fn() }),
}));

const renderLogin = (onLogin = vi.fn()) => {
  return render(
    <BrowserRouter>
      <Login onLogin={onLogin} />
    </BrowserRouter>
  );
};

describe("Login", () => {
  it("renders login form", () => {
    renderLogin();
    expect(screen.getByText("Вхід у CRM")).toBeInTheDocument();
  });

  it("shows error on failed login", async () => {
    server.use(
      http.post("/api/auth/login", () => {
        return new HttpResponse(null, { status: 401 });
      })
    );

    renderLogin();
    await userEvent.type(screen.getByLabelText(/email/i), "test@test.com");
    await userEvent.type(screen.getByLabelText(/^Пароль$/i), "wrong");

    await userEvent.click(screen.getByRole("button", { name: /увійти/i }));

    await waitFor(() => {
      expect(screen.getByText("Невірний email або пароль")).toBeInTheDocument();
    });
  });

  it("calls onLogin on successful login", async () => {
    const mockUser = { id: "1", name: "Admin", email: "admin@crm.com", role: "SUPERADMIN" };
    server.use(
      http.post("/api/auth/login", () => {
        return HttpResponse.json({ user: mockUser, token: "fake-token" });
      })
    );

    const onLogin = vi.fn();
    renderLogin(onLogin);
    await userEvent.type(screen.getByLabelText(/email/i), mockUser.email);
    await userEvent.type(screen.getByLabelText(/^Пароль$/i), "123!PASSWORD!321");
    
    await userEvent.click(screen.getByRole("button", { name: /увійти/i }));

    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith(mockUser);
    }, { timeout: 3000 });
  });
});
