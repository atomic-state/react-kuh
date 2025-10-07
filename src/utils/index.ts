import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deserialize<T = any>(
  text: string,
  reviver?: (this: any, key: string, value: any) => any
) {
  return JSON.parse(text, reviver) as T;
}

export function removeUndefinedProperties(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export function omitProperties<T extends object, K extends keyof T>(
  obj: T,
  ...properties: K[]
): Omit<T, K> {
  const newObj = {} as Omit<T, K>; // Initialize with the correct omitted type

  for (const prop in obj) {
    // @ts-expect-error
    if (!properties.includes(prop as K)) {
      // Safe type check
      // @ts-expect-error
      newObj[prop as keyof Omit<T, K>] = obj[prop]; // Assign with the correct type
    }
  }

  return newObj;
}

export const modals = {
  open(modalId: string) {
    try {
      (window as any)[modalId].showModal();
    } catch {}
  },
  close(modalId: string) {
    try {
      (window as any)[modalId].close();
    } catch {}
  },
};

export const css = (strings: TemplateStringsArray, ...values: any[]) => {
  const result = [strings[0]];
  for (let i = 0; i < values.length; i++) {
    result.push(values[i], strings[i + 1]);
  }
  const finalCss = result.join("");
  return finalCss;
};
