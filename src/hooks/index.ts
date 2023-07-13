"use client"
import { useState, useEffect } from "react"

export function useWindowSize() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
  }, [])

  useEffect(() => {
    function resizeListener() {
      if (typeof window !== "undefined") {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
    }
    function addResizeListener() {
      if (typeof window !== "undefined") {
        window.addEventListener("resize", resizeListener)
      }
    }

    addResizeListener()

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", resizeListener)
      }
    }
  }, [])

  return size as {
    width: number
    height: number
  }
}

export function useBoolean(initialValue: boolean | null = null as any) {
  const [state, setState] = useState<boolean>(initialValue as boolean)

  const actions = {
    toggle() {
      setState((s) => !s)
    },
    off() {
      setState(false)
    },
    on() {
      setState(true)
    },
    /**
     * @deprecated Use `setValue` instead
     */
    set(v: boolean) {
      setState(v)
    },
    setValue(v: boolean) {
      setState(v)
    },
    reset() {
      setState(initialValue as boolean)
    },
  }

  const end = [state, actions] as const

  return end
}

export function useObject<T = any>(initialValue: T) {
  const [state, setState] = useState<T>(initialValue)

  const actions = {
    /**
     * @deprecated Use `setPartialValue` instead
     */
    write(f: Partial<T> | ((e: T) => Partial<T>)) {
      const n = (
        typeof f === "function" ? (f as any)(state) : { ...state, ...f }
      ) as T

      setState((s) => ({
        ...s,
        ...n,
      }))
    },
    /**
     * @deprecated Use `setValue` instead
     */
    replace(f: T | ((e: T) => T)) {
      const n = typeof f === "function" ? (f as any)(state) : f
      setState(n)
    },

    setPartialValue(f: Partial<T> | ((e: T) => Partial<T>)) {
      const n = (
        typeof f === "function" ? (f as any)(state) : { ...state, ...f }
      ) as T

      setState((s) => ({
        ...s,
        ...n,
      }))
    },
    setValue(f: T | ((e: T) => T)) {
      const n = typeof f === "function" ? (f as any)(state) : f
      setState(n)
    },
    reset() {
      setState(initialValue)
    },
  }

  const end = [state, actions, setState] as const

  return end
}

/**
 * Returns `true` after the component mounts/hydrates (after the first render)
 */
export function useSecondRender(): boolean {
  const [firstRender, setFirstRender] = useState(false)

  useEffect(() => {
    setFirstRender(true)
  }, [])

  return firstRender
}
