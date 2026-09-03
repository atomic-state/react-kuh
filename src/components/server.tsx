import React, { Fragment, type Key, type ReactNode } from "react";

export interface RenderListProps<T> {
  data?: T[];
  filter?: (item: T, i: number, arr: T[]) => boolean;
  sort?: (a: T, b: T) => number;
  render: (item: T, i: number, arr: T[]) => ReactNode;
  getKey?: (item: T, i: number, arr: T[]) => Key;
  empty?: () => ReactNode;
}

export function RenderList<T>({
  data = [],
  filter,
  sort,
  render,
  getKey,
  empty = () => null,
}: RenderListProps<T>) {
  if (!Array.isArray(data) || data.length === 0) {
    return empty();
  }

  let processedList = data;

  if (filter) {
    processedList = processedList.filter(filter);

    // Because `filter` already returned a BRAND NEW array,
    // we can safely use the mutating `.sort()` here without affecting the original `data`.
    // This saves us from allocating a second unnecessary array
    if (sort) {
      processedList.sort(sort);
    }
  } else if (sort) {
    // If there was no filter, `processedList` is still the original `data` array.
    // Here, we use `.toSorted()` to safely create a new sorted copy.
    processedList = processedList.toSorted(sort);
  }

  if (processedList.length === 0) {
    return empty();
  }

  return processedList.map((item, index, arr) => {
    const node = render(item, index, arr);
    const key = getKey?.(item, index, arr);

    return key != null ? <Fragment key={key}>{node}</Fragment> : node;
  });
}
