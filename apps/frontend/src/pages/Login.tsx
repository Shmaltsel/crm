import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { api } from "../config/api";

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

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const proceedAfterLogin = () => {
    if (onLogin && loggedInUser) {
      onLogin(loggedInUser);
    } else {
      navigate("/cities");
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
    <div className="flex items-center justify-center min-h-screen bg-surface-subtle p-4">
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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-brand"
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
        className="p-6 sm:p-8 bg-surface rounded-card shadow-modal w-full max-w-sm sm:max-w-md"
      >
        <h1 className="text-2xl font-bold text-center text-content-primary mb-6">
          Вхід у CRM
        </h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-danger-50 text-danger-600 rounded-control text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-content-primary mb-1.5">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-3 border border-border-strong rounded-control focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none text-base transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-content-primary mb-1.5">
              Пароль
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-3 border border-border-strong rounded-control focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none text-base transition-colors"
              required
            />
          </div>
          <motion.button
            type="submit"
            disabled={isLoading}
            whileTap={{ scale: 0.97 }}
            className="mt-2 bg-brand text-white font-medium px-5 py-3 rounded-control hover:bg-brand-hover transition disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isLoading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Увійти
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
