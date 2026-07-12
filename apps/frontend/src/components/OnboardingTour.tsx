import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  X,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  Calendar,
  Wallet,
  School,
  ClipboardCheck,
  Users,
  Trophy,
} from "lucide-react";

interface TourStep {
  target: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}

const MANAGER_STEPS: TourStep[] = [
  {
    target: "dashboard",
    title: "Дашборд",
    description: "Головна сторінка з оглядом подій, фінансів та активності. Тут ви бачите все найважливіше на одному екрані.",
    icon: LayoutDashboard,
    route: "/dashboard",
  },
  {
    target: "calendar",
    title: "Календар",
    description: "Переглядайте заплановані події, створюйте нові та керуйте розкладом. На мобільному — свайпайте між днями.",
    icon: Calendar,
    route: "/calendar",
  },
  {
    target: "schools",
    title: "Школи та Садочки",
    description: "База закладів з контактами директорів, статусом подій та історією відвідувань.",
    icon: School,
    route: "/schools",
  },
  {
    target: "reports",
    title: "Звіти",
    description: "Переглядайте та затверджуйте звіти екіпажів. Тут нараховуються зарплати після затвердження.",
    icon: ClipboardCheck,
    route: "/reports/review",
  },
  {
    target: "finance",
    title: "Фінанси",
    description: "KPI, виручка по містах, графіки та топ-події. Фінансовий пульс вашого міста.",
    icon: Wallet,
    route: "/finance",
  },
];

const SUPERADMIN_STEPS: TourStep[] = [
  ...MANAGER_STEPS,
  {
    target: "employees",
    title: "Працівники",
    description: "Управління командою: створення, редагування ролей та призначення до міст.",
    icon: Users,
    route: "/employees",
  },
  {
    target: "leaderboard",
    title: "Рейтинг",
    description: "Порівняння продуктивності міст та працівників за різними метриками.",
    icon: Trophy,
    route: "/city-leaderboard",
  },
];

const STORAGE_KEY_PREFIX = "crm_onboarding_completed_";

export default function OnboardingTour() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  const steps =
    user?.role === "SUPERADMIN" || user?.role === "OWNER"
      ? SUPERADMIN_STEPS
      : MANAGER_STEPS;

  useEffect(() => {
    if (!user) return;
    const completed = localStorage.getItem(`${STORAGE_KEY_PREFIX}${user.id}`);
    if (!completed) {
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const close = useCallback(() => {
    setShow(false);
    if (user) localStorage.setItem(`${STORAGE_KEY_PREFIX}${user.id}`, "1");
  }, [user]);

  const goNext = useCallback(() => {
    if (step < steps.length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      navigate(steps[nextStep].route);
    } else {
      close();
    }
  }, [step, steps, navigate, close]);

  const goPrev = useCallback(() => {
    if (step > 0) {
      const prevStep = step - 1;
      setStep(prevStep);
      navigate(steps[prevStep].route);
    }
  }, [step, steps, navigate]);

  const skip = useCallback(() => {
    close();
    navigate("/dashboard");
  }, [close, navigate]);

  if (!show || !user) return null;

  const current = steps[step];
  const Icon = current.icon;

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100]"
            onClick={skip}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed z-[101] bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md max-h-[calc(100dvh-7rem)] md:max-h-[calc(100dvh-9rem)]"
          >
            <div className="bg-surface rounded-2xl shadow-2xl border border-content/10 overflow-hidden flex flex-col max-h-full">
              <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs text-content/50 font-medium uppercase tracking-wider">
                      Крок {step + 1} з {steps.length}
                    </p>
                    <h3 className="text-base font-semibold text-content">
                      {current.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={skip}
                  className="p-1.5 rounded-lg hover:bg-content/10 text-content/40 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-5 pb-4 overflow-y-auto min-h-0">
                <p className="text-sm text-content/70 leading-relaxed">
                  {current.description}
                </p>
              </div>

              <div className="flex items-center justify-between px-5 py-4 border-t border-content/10 bg-surface/50 shrink-0">
                <button
                  onClick={skip}
                  className="text-xs text-content/40 hover:text-content/60 transition-colors"
                >
                  Пропустити тур
                </button>

                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 mr-3">
                    {steps.map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          i === step ? "bg-brand" : "bg-content/20"
                        }`}
                      />
                    ))}
                  </div>

                  {step > 0 && (
                    <button
                      onClick={goPrev}
                      className="p-2 rounded-lg hover:bg-content/10 text-content/60 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={goNext}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors"
                  >
                    {step < steps.length - 1 ? (
                      <>
                        Далі
                        <ChevronRight className="w-4 h-4" />
                      </>
                    ) : (
                      "Почати роботу"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
