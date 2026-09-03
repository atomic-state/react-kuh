"use client";
import React, { Suspense, useState, useEffect } from "react";

/**
 * Safely renders children only after the component has mounted on the client.
 * Eliminates hydration mismatches.
 */
export function BrowserOnly({ children }: { children?: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return <>{children}</>;
}

/**
 * Acts as a client boundary for Next.js App Router.
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

/**
 * Ensures Suspense fallbacks align during SSR and initial hydration.
 */
function SSRSuspense({
  fallback,
  children,
}: {
  fallback: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <>{fallback}</>;
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

// --- Next.js Pages Router Layout Types ---

type LayoutProps = Record<string, unknown> & {
  children: React.ReactNode;
  Component?: React.ComponentType<any>;
};

type LayoutComponent = React.ComponentType<LayoutProps>;

export type PageWithLayout<P = {}> = React.ComponentType<P> & {
  Layout?: LayoutComponent;
  Loading?: React.ComponentType<any>;
};

interface WithLayoutProps<P> {
  Component: PageWithLayout<P>;
  pageProps?: P;
  layoutProps?: Record<string, unknown>;
  loadingProps?: Record<string, unknown>;
  defaultLayout?: LayoutComponent;
  defaultLoading?: React.ComponentType<any>;
  showLayout?: boolean;
  showLoading?: boolean;
}

// Static fallbacks defined OUTSIDE the render cycle to prevent unmount thrashing
const PassthroughLayout: LayoutComponent = ({ children }) => <>{children}</>;
const NullLoading: React.ComponentType<any> = () => null;

/**
 * For Next.js Pages router.
 * Strictly typed and protected against re-render unmounting.
 */
export function WithLayout<P extends Record<string, unknown>>({
  Component,
  pageProps = {} as P,
  layoutProps = {},
  loadingProps = {},
  defaultLayout = PassthroughLayout,
  defaultLoading = NullLoading,
  showLayout = true,
  showLoading = true,
}: WithLayoutProps<P>) {
  // Safely resolve the layout and loading components
  const Layout = showLayout
    ? (Component.Layout ?? defaultLayout)
    : PassthroughLayout;
  const Loading = showLoading
    ? (Component.Loading ?? defaultLoading)
    : NullLoading;

  return (
    <Layout {...layoutProps} Component={Component}>
      <SSRSuspense
        fallback={<Loading {...loadingProps} Component={Component} />}
      >
        <Component {...pageProps} />
      </SSRSuspense>
    </Layout>
  );
}
