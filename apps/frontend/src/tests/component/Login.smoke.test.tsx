import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { vi, describe, it, expect } from "vitest";

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: null, loading: false, login: vi.fn(), logout: vi.fn() }),
}));

const renderLogin = (onLogin = vi.fn()) => {
  return render(
    <BrowserRouter>
      <Login onLogin={onLogin} />
    </BrowserRouter>
  );
};

describe("Smoke: Login", () => {
  it("рендерить форму входу", () => {
    renderLogin();
    expect(screen.getByText("Вхід у CRM")).toBeInTheDocument();
  });

  it("успішний логін викликає onLogin", async () => {
    const mockUser = { id: "1", name: "Admin", email: "admin@crm.com", role: "SUPERADMIN" };
    server.use(
      http.post("/api/auth/login", () =>
        HttpResponse.json({ user: mockUser, token: "fake-token" })
      )
    );

    const onLogin = vi.fn();
    renderLogin(onLogin);
    await userEvent.type(screen.getByLabelText(/^email$/i), mockUser.email);
    await userEvent.type(screen.getByLabelText(/^пароль$/i), "123!PASSWORD!321");

    await userEvent.click(screen.getByRole("button", { name: /увійти/i }));

    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith(mockUser);
    }, { timeout: 3000 });
  });
});
