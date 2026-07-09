import { Component, type ReactNode } from "react";
import * as Sentry from "@sentry/react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  label?: string;
}

interface State {
  hasError: boolean;
}

export default class TabErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromProps(nextProps: Props, prevState: State): State | null {
    if (prevState.hasError) {
      return { hasError: false };
    }
    return null;
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    Sentry.captureException(error, {
      extra: { componentStack: info.componentStack, tab: this.props.label },
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <span className="text-3xl mb-3 opacity-50">⚠️</span>
            <p className="text-sm font-medium">
              Не вдалося завантажити вкладку{this.props.label ? ` «${this.props.label}»` : ""}
            </p>
            <p className="text-xs mt-1">Спробуйте оновити сторінку</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
