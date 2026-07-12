import { useMemo } from "react";

const MOBILE_TOP = "calc(3.5rem + env(safe-area-inset-top, 0px) + 12px)";
const MOBILE_BOTTOM = "calc(3.5rem + env(safe-area-inset-bottom, 0px) + 12px)";

export function useMobileModalOffsets() {
  return useMemo(
    () => ({
      paddingTop: MOBILE_TOP,
      paddingBottom: MOBILE_BOTTOM,
    }),
    [],
  );
}
