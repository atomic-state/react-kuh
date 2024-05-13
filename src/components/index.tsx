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

export function WithLayout<L>({
  Component,
  pageProps,
  layoutProps,
  loadingProps,
  defaultLayout = ({ children }: any) => children,
  defaultLoading = () => null,
  showLayout = true,
  showLoading = true,
}: {
  Component?: any
  pageProps?: any
  layoutProps?: any
  loadingProps?: any
  defaultLayout?: any
  defaultLoading?: any
  showLayout?: boolean
  showLoading?: boolean
}) {
  const Layout = Component.Layout || defaultLayout
  const Loading = Component.Loading || defaultLoading

  const SLayout = showLayout ? Layout : ({ children }: any) => children
  const SLoading = showLoading ? Loading : () => null

  return (
    <SLayout {...{ ...layoutProps, Component }}>
      <SSRSuspense fallback={<SLoading {...{ ...loadingProps, Component }} />}>
        <Component {...pageProps} />
      </SSRSuspense>
    </SLayout>
  )
}

export function RenderList<T>({
  data,
  render,
}: {
  data: T[]
  render: (item: T, i: number, arr: T[]) => React.ReactNode
}) {
  return data.map(render)
}
