export function supportsViewTransition(): boolean {
  return (
    typeof document !== "undefined" &&
    "startViewTransition" in document
  );
}

export function withViewTransition(fn: () => void): void {
  if (supportsViewTransition()) {
    document.startViewTransition(() => {
      fn();
    });
  } else {
    fn();
  }
}
