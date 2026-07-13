export function supportsViewTransition(): boolean {
  return (
    typeof document !== "undefined" &&
    "startViewTransition" in document
  );
}

export function withViewTransition(fn: () => void): void {
  if (supportsViewTransition()) {
    const t = document.startViewTransition(() => {
      fn();
    });
    t.finished.then(() => document.querySelector("main")?.scrollTo(0, 0));
  } else {
    fn();
  }
}

export function withViewTransitionSync(fn: () => void): void {
  if (supportsViewTransition()) {
    document.startViewTransition(() => { fn(); });
  } else {
    fn();
  }
}
