import React, { Fragment, type Key, type ReactNode } from "react";

/**
 * Safely render a list with sorting, filtering, custom keys,
 * empty fallback, and per-item error handling.
 */
export function RenderList<T, Returns extends ReactNode = ReactNode>({
  data = [],
  filter = () => true,
  sort = () => 0,
  render = () => null!,
  getKey,
  empty = () => null!,
  renderError = () => null!,
}: {
  data?: T[];
  filter?: (item: T, i: number, arr: T[]) => boolean;
  sort?: (a: T, b: T) => number;
  render?: (item: T, i: number, arr: T[]) => Returns;
  getKey?: (item: T, i: number, arr: T[]) => Key;
  empty?: () => Returns;
  renderError?: (item: T, error: Error) => Returns;
}) {
  const isArray = Array.isArray(data);
  if (!isArray || data.length === 0) return empty()!;

  const finalList = data
    .toSorted(sort)
    .filter(filter)
    .map((item, index, arr) => {
      const key = getKey?.(item, index, arr);

      const wrap = (node: ReactNode, isError = false) =>
        key != null ? (
          <Fragment key={isError ? `error-${key}` : key}>{node}</Fragment>
        ) : (
          node
        );

      try {
        return wrap(render(item, index, arr));
      } catch (err) {
        return wrap(renderError(item, err as Error), true);
      }
    });

  if (finalList.length === 0) return empty()!;

  return finalList;
}
