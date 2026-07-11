/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import React from "react";
import { server } from "./mocks/server";

let _rafTime = performance.now();
globalThis.requestAnimationFrame = (cb: (t: number) => void) => {
  _rafTime += 1000;
  cb(_rafTime);
  return 0;
};
globalThis.cancelAnimationFrame = () => {};

const MOTION_ONLY_PROPS = new Set([
  "initial", "animate", "exit", "variants", "transition",
  "whileHover", "whileTap", "whileFocus", "whileDrag", "whileInView",
  "viewport", "onViewportEnter", "onViewportLeave",
  "layout", "layoutId", "layoutDependency", "layoutScroll",
  "onLayoutAnimationStart", "onLayoutAnimationComplete",
  "drag", "dragConstraints", "dragElastic", "dragMomentum",
  "dragTransition", "dragPropagation", "dragControls", "dragListener",
  "dragSnapToOrigin", "dragDirectionLock",
  "onDrag", "onDragStart", "onDragEnd", "onDirectionLock",
  "onAnimationStart", "onUpdate",
  "custom", "inherit", "transformTemplate", "transformValues",
  "onPan", "onPanStart", "onPanEnd",
  "onHoverStart", "onHoverEnd",
  "onTap", "onTapStart", "onTapCancel",
]);

function stripMotionProps(props: Record<string, any>) {
  const clean: Record<string, any> = {};
  for (const key in props) {
    if (!MOTION_ONLY_PROPS.has(key)) clean[key] = props[key];
  }
  return clean;
}

const tagComponentCache = new Map<string, React.ForwardRefExoticComponent<any>>();

function getMockMotionComponent(tag: string) {
  if (!tagComponentCache.has(tag)) {
    const Component = React.forwardRef<any, any>(({ children, ...props }, ref) => {
      const onComplete = props.onAnimationComplete;
      delete props.onAnimationComplete;
      React.useEffect(() => {
        if (onComplete) setTimeout(onComplete, 0);
      }, [onComplete]);
      const Tag = tag as any;
      return (
        <Tag ref={ref} {...stripMotionProps(props)}>
          {children}
        </Tag>
      );
    });
    Component.displayName = `MockMotion.${tag}`;
    tagComponentCache.set(tag, Component);
  }
  return tagComponentCache.get(tag)!;
}

const motionProxy = new Proxy(
  {},
  {
    get(_target, tag: string) {
      return getMockMotionComponent(tag);
    },
  },
);

const motionValueStub = (initial: any) => ({
  get: () => initial,
  set: () => {},
  on: () => () => {},
  stop: () => {},
  isAnimating: () => false,
});

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    motion: motionProxy,
    AnimatePresence: ({ children }: any) => <>{children}</>,
    LayoutGroup: ({ children }: any) => <>{children}</>,
    MotionConfig: ({ children }: any) => <>{children}</>,

    useScroll: () => ({
      scrollX: motionValueStub(0),
      scrollY: motionValueStub(0),
      scrollXProgress: motionValueStub(0),
      scrollYProgress: motionValueStub(0),
    }),
    useTransform: (_value: any, _input: any, output?: any[]) =>
      Array.isArray(output) ? output[0] : 0,
    useSpring: (value: any) => motionValueStub(value),
    useMotionValue: (initial: any) => motionValueStub(initial),
    useMotionTemplate: () => "",
    useDragControls: () => ({ start: () => {} }),
    useAnimation: () => ({ start: async () => {}, stop: () => {}, set: () => {} }),
    useReducedMotion: () => false,
  };
});

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());
