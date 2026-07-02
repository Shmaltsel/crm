import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { api } from "../config/api";

type Stage = "form" | "collapsing" | "revealing";

interface LoginProps {
  onLogin?: () => void;
}

const SKELETON_CARDS = [0, 1, 2, 3];

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("admin@crm.com");
  const [password, setPassword] = useState("123!PASSWORD!321");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [stage, setStage] = useState<Stage>("form");
  const navigate = useNavigate();

  const isCollapsed = stage !== "form";

  const proceedAfterLogin = () => {
    if (onLogin) {
      onLogin();
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
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setStage("collapsing");
    } catch {
      setError("Невірний email або пароль");
      setIsLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  const handleLastCardReveal = () => {
    setTimeout(proceedAfterLogin, 300);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden">
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          layout
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onLayoutAnimationComplete={() => {
            if (stage === "collapsing") setStage("revealing");
          }}
          className={`transition-all duration-500 ease-out z-50 ${
            isCollapsed
              ? "fixed top-0 left-0 right-0 h-16 bg-[#0B1527] flex items-center px-4 rounded-none shadow-none"
              : "relative bg-white rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md"
          }`}
        >
          <motion.div
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={isCollapsed ? "flex items-center gap-2" : "p-6 sm:p-8"}
          >
            <div
              className={`flex items-center gap-2 ${isCollapsed ? "" : "justify-center mb-6"}`}
            >
              <span className="text-xl">🎓</span>
              <span
                className={
                  isCollapsed
                    ? "text-white font-semibold tracking-wider text-sm"
                    : "text-2xl font-bold text-gray-800"
                }
              >
                {isCollapsed ? "СВІТЛО ЗНАНЬ" : "Вхід у CRM"}
              </span>
            </div>

            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  exit={{ opacity: 0, filter: "blur(8px)", scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                >
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Пароль
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileTap={{ scale: 0.97 }}
                      className="mt-2 bg-blue-600 text-white font-medium p-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2 h-[42px]"
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
                              transition={{
                                duration: 0.7,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                            />
                            Вхід...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            Увійти
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {stage === "revealing" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-slate-50 pt-16 flex"
        >
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:block w-64 bg-[#0B1527] h-full shrink-0"
          />
          <div className="flex-1 p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="h-7 w-48 bg-slate-200 rounded-lg mb-6"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SKELETON_CARDS.map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
                  onAnimationComplete={
                    i === SKELETON_CARDS.length - 1
                      ? handleLastCardReveal
                      : undefined
                  }
                  className="h-24 bg-white rounded-2xl border border-slate-100 shadow-sm"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
