import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import { vi } from "vitest";
import * as AuthContext from "../../context/AuthContext";

describe("ProtectedRoute", () => {
  it("redirects to login if user is not authenticated", () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({ user: null } as any);
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/protected" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}>Protected Content</ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("redirects to /schools if user lacks required role", () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({ user: { role: "MANAGER" } } as any);
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/schools" element={<div>Schools Page</div>} />
          <Route path="/protected" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}>Protected Content</ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Schools Page")).toBeInTheDocument();
  });

  it("renders children if user is authenticated and has required role", () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({ user: { role: "SUPERADMIN" } } as any);
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}>Protected Content</ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
