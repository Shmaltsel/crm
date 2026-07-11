import React from "react";
import * as Sentry from "@sentry/react";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { scaleVariants, shakeVariants, TRANSITION } from "../lib/motion";

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    Sentry.captureException(error, { extra: { componentStack: info.componentStack } });
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
          <motion.div
            variants={scaleVariants}
            initial="hidden"
            animate="visible"
            className="max-w-md w-full bg-surface rounded-card shadow-card border border-border p-8 text-center"
          >
            <motion.div
              variants={shakeVariants}
              animate="shake"
              className="w-16 h-16 rounded-full bg-danger-50 flex items-center justify-center mx-auto mb-4"
            >
              <AlertTriangle className="w-8 h-8 text-danger" />
            </motion.div>
            <h1 className="text-xl font-bold text-content-primary mb-2">
              Щось пішло не так
            </h1>
            <p className="text-sm text-content-muted mb-6">
              Сталася неочікувана помилка. Спробуйте оновити сторінку — якщо
              проблема повториться, зверніться до адміністратора.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={TRANSITION.hover}
              onClick={this.handleReload}
              className="px-5 py-2.5 rounded-control bg-brand text-white font-semibold text-sm hover:bg-brand-hover transition-colors"
            >
              На головну
            </motion.button>
          </motion.div>
        </div>
      );
    }
    return this.props.children;
  }
}
