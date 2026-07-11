export const tick = () => {
  try {
    navigator.vibrate?.(10);
  } catch {}
};

export const success = () => {
  try {
    navigator.vibrate?.([10, 50, 10]);
  } catch {}
};

export const error = () => {
  try {
    navigator.vibrate?.([50, 30, 50]);
  } catch {}
};