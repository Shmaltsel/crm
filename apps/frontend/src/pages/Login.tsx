import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";

import { api } from "../config/api";
import { fadeVariants, staggerContainer, staggerItem, TRANSITION, useHoverCapable } from "../lib/motion";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const CIRCLE_VARIANTS = {
  hidden: { scale: 0, opacity: 1 },
  visible: {
    scale: 1,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
};

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginProps {
  onLogin?: (user: User) => void;
}

function getDefaultRoute(role: string): string {
  if (["SUPERADMIN", "OWNER", "MANAGER"].includes(role)) return "/dashboard";
  return "/calendar";
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
  const hoverCapable = useHoverCapable();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      navigate(getDefaultRoute(user.role), { replace: true });
    }
  }, [user, navigate]);

  const proceedAfterLogin = () => {
    if (onLogin && loggedInUser) {
      onLogin(loggedInUser);
    } else {
      navigate(getDefaultRoute(loggedInUser?.role ?? ""), { replace: true });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      setLoggedInUser(response.data.user);
      setIsTransitioning(true);
    } catch {
      setError("Невірний email або пароль");
      setIsLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[var(--color-surface-subtle)] to-[var(--color-surface)] p-4 relative">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-content-muted)] hover:text-[var(--color-content-primary)] hover:border-[var(--color-border-strong)] focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] transition-colors"
        aria-label={theme === "light" ? "Перемкнути на темну тему" : "Перемкнути на світлу тему"}
      >
        {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </button>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            variants={CIRCLE_VARIANTS}
            initial="hidden"
            animate="visible"
            onAnimationComplete={proceedAfterLogin}
            style={{
              width: "300vmax",
              height: "300vmax",
              borderRadius: "9999px",
              willChange: "transform",
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[var(--color-brand)]"
          />
        )}
      </AnimatePresence>
      <motion.div
        animate={
          isTransitioning
            ? { opacity: 0, scale: 0.97 }
            : shake
              ? { x: [-10, 10, -10, 10, 0], opacity: 1, scale: 1 }
              : { opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.4 }}
        className="p-6 sm:p-8 bg-[var(--color-surface)] rounded-card shadow-modal ring-1 ring-[var(--color-border)] w-full max-w-sm sm:max-w-md"
      >
        <h1 className="text-2xl font-bold text-center text-[var(--color-content-primary)] mb-6">
          Вхід у CRM
        </h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-[var(--color-danger-bg)] text-[var(--color-danger)] border border-[var(--color-danger)]/30 rounded-control text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isTransitioning ? "exit" : "visible"}
            className="flex flex-col gap-4"
          >
            <motion.div variants={staggerItem}>
              <label htmlFor="login-email" className="block text-sm font-medium text-[var(--color-content-primary)] mb-1.5">
                Email
              </label>
              <motion.input
                id="login-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-3 border border-[var(--color-border-strong)] rounded-control focus:ring-2 focus:ring-[var(--color-brand)]/30 focus:border-[var(--color-brand)] outline-none text-base transition-colors bg-[var(--color-surface)] text-[var(--color-content-primary)] placeholder:text-[var(--color-content-muted)]"
                whileFocus={{ scale: 1.01 }}
                transition={TRANSITION.focus}
                required
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <label htmlFor="login-password" className="block text-sm font-medium text-[var(--color-content-primary)] mb-1.5">
                Пароль
              </label>
              <div className="relative">
                <motion.input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-3 pr-10 border border-[var(--color-border-strong)] rounded-control focus:ring-2 focus:ring-[var(--color-brand)]/30 focus:border-[var(--color-brand)] outline-none text-base transition-colors bg-[var(--color-surface)] text-[var(--color-content-primary)] placeholder:text-[var(--color-content-muted)]"
                  whileFocus={{ scale: 1.01 }}
                  transition={TRANSITION.focus}
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-content-muted)] hover:text-[var(--color-content-secondary)] transition-colors p-0.5"
                  aria-label={showPassword ? "Приховати пароль" : "Показати пароль"}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {showPassword ? (
                      <motion.span key="off" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={TRANSITION.fade}>
                        <EyeOff className="w-4 h-4" />
                      </motion.span>
                    ) : (
                      <motion.span key="on" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={TRANSITION.fade}>
                        <Eye className="w-4 h-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
            <motion.div variants={staggerItem}>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={hoverCapable ? { scale: 1.015 } : undefined}
                whileTap={{ scale: 0.97 }}
                transition={TRANSITION.hover}
                className="mt-2 w-full bg-[var(--color-brand)] text-white font-medium px-5 py-3 rounded-control hover:bg-[var(--color-brand-hover)] transition disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isLoading ? (
                    <motion.span
                      key="loading"
                      variants={fadeVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex items-center gap-2"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                      />
                      Вхід...
                    </motion.span>
                  ) : (
                    <motion.span key="idle" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
                      Увійти
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
