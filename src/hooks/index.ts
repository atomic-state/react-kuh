"use client";
import { useState, useEffect, useMemo } from "react";

/**
 * Tracks window dimensions.
 * Safe for SSR (returns 0x0 initially, updates on mount).
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // useEffect only runs on the client, so `typeof window !== "undefined"`
    // checks inside here are completely redundant and can be removed.
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size immediately on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}

/**
 * Manages boolean state with stable action methods.
 */
export function useBoolean(initialValue: boolean = false) {
  const [state, setState] = useState(initialValue);

  // Memoizing actions prevents unnecessary re-renders in child components
  // that receive these actions as props, and prevents infinite useEffect loops.
  const actions = useMemo(
    () => ({
      toggle() {
        setState((s) => !s);
      },
      off() {
        setState(false);
      },
      on() {
        setState(true);
      },
      /** @deprecated Use `setValue` instead */
      set(v: boolean) {
        setState(v);
      },
      setValue(v: React.SetStateAction<boolean>) {
        setState(v);
      },
      reset() {
        setState(initialValue);
      },
    }),
    [initialValue]
  );

  return [state, actions] as const;
}

/**
 * Manages object state with stable partial/full update methods.
 */
export function useObject<T extends Record<string, unknown>>(initialValue: T) {
  const [state, setState] = useState<T>(initialValue);

  const actions = useMemo(
    () => ({
      /** @deprecated Use `setPartialValue` instead */
      write(f: Partial<T> | ((e: T) => Partial<T>)) {
        setState((s) => ({
          ...s,
          ...(typeof f === "function" ? f(s) : f),
        }));
      },
      /** @deprecated Use `setValue` instead */
      replace(f: React.SetStateAction<T>) {
        setState(f);
      },
      setPartialValue(newState: React.SetStateAction<Partial<T>>) {
        setState((s) => ({
          ...s,
          ...(typeof newState === "function" ? newState(s) : newState),
        }));
      },
      setValue(newState: React.SetStateAction<T>) {
        setState(newState);
      },
      reset() {
        setState(initialValue);
      },
    }),
    [initialValue]
  );

  return [state, actions, setState] as const;
}

/**
 * Returns `true` after the component mounts/hydrates (after the first render).
 * Useful for avoiding hydration mismatches.
 */
export function useSecondRender(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
