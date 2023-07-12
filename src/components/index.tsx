"use client"
import React, { useState, useEffect } from "react"

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

/**
 * This can be used inside server components to wrap client only components
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  return children as JSX.Element
}

export function WithLayout({ Component, pageProps, layoutProps }: any) {
  const Layout = (Component as any).Layout || (({ children }: any) => children)
  return (
    <Layout {...layoutProps}>
      <Component {...pageProps} />
    </Layout>
  )
}
