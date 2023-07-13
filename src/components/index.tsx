"use client"
import React, { Suspense, useState, useEffect } from "react"

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

/**
 * For Next.js pages router
 */

let isServer__layout = true

function SSRSuspense({ fallback, children }: any) {
  const [ssr, setSSR] = useState(isServer__layout)

  useEffect(() => {
    setSSR(false)
    isServer__layout = false
  }, [])

  // This will render the fallback in the server
  return ssr ? fallback : <Suspense fallback={fallback}>{children}</Suspense>
}

export default function WithLayout({
  Component,
  pageProps,
  layoutProps,
  loadingProps,
}: any) {
  const Layout = Component.Layout || (({ children }: any) => children)
  const Loading = Component.Loading || (() => null)
  return (
    <Layout {...{ ...layoutProps, Component }}>
      <SSRSuspense fallback={<Loading {...{ ...loadingProps, Component }} />}>
        <Component {...pageProps} />
      </SSRSuspense>
    </Layout>
  )
}
