"use client"
import React, { useState, useEffect } from "react"

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
  const [state, setState] = useState<boolean>(initialValue)

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
    set(v: boolean) {
      setState(v)
    },
    reset() {
      setState(initialValue)
    },
  }

  const end = [state, actions] as [
    boolean,
    {
      toggle(): void
      off(): void
      on(): void
      set(v: boolean): void
      reset(): void
    }
  ]

  return end
}

export function useObject<T = any>(initialValue: T) {
  const [state, setState] = useState<T>(initialValue)

  const actions = {
    write(f: Partial<T> | ((e: T) => Partial<T>)) {
      const n = (
        typeof f === "function" ? (f as any)(state) : { ...state, ...f }
      ) as T

      setState((s) => ({
        ...s,
        ...n,
      }))
    },
    replace(f: T | ((e: T) => T)) {
      const n = typeof f === "function" ? (f as any)(state) : f
      setState(n)
    },

    reset() {
      setState(initialValue)
    },
  }

  const end = [state, actions] as [
    T,
    {
      write(f: Partial<T> | ((e: T) => Partial<T>)): void
      replace(f: T | ((e: T) => T)): void
      /**
       * Reset to initial value
       */
      reset(): void
    }
  ]

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

let isServer: boolean

export function BrowserOnly({ children }: { children?: React.ReactNode }) {
  const [ssr, setSSR] = useState(
    typeof isServer !== "undefined" ? isServer : true
  )

  useEffect(() => {
    if (typeof isServer === "undefined") {
      setSSR(false)
      isServer = false
    }
  }, [])

  // This will render the fallback in the server
  return (ssr ? null : children) as JSX.Element
}
