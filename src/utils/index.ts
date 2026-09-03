export { cn } from "cn";

/**
 * Strict deserialization.
 * Requires the caller to explicitly type the return, preventing implicit 'any' bugs.
 */
export function deserialize<T = unknown>(
  text: string,
  reviver?: (this: unknown, key: string, value: unknown) => unknown
): T {
  return JSON.parse(text, reviver) as T;
}

/**
 * Safely and recursively removes undefined properties from objects and arrays.
 * Preserves Date objects and avoids the JSON.stringify destruction of methods/Sets.
 */
export function removeUndefinedProperties<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => removeUndefinedProperties(item)) as unknown as T;
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key] = removeUndefinedProperties(value);
    }
  }

  return result as T;
}

/**
 * Type-safe property omission.
 */
export function omitProperties<
  T extends Record<string, unknown>,
  K extends keyof T,
>(obj: T, ...keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Strict standard-compliant modal controller.
 * Enforces the use of the native HTML5 <dialog> element.
 */
export const modals = {
  open(modalId: string) {
    const dialog = document.getElementById(modalId);
    if (dialog instanceof HTMLDialogElement) {
      dialog.showModal();
    } else {
      console.error(
        `Safe execution failed: Element "${modalId}" is not a <dialog>.`
      );
    }
  },
  close(modalId: string) {
    const dialog = document.getElementById(modalId);
    if (dialog instanceof HTMLDialogElement) {
      dialog.close();
    }
  },
};

/**
 * Safe CSS template literal tag.
 * Replaces manual looping with native array reduction.
 */
export const css = (strings: TemplateStringsArray, ...values: unknown[]) =>
  strings.reduce((acc, str, i) => acc + str + String(values[i] ?? ""), "");
