import React from "react";
export declare function useWindowSize(): {
    width: number;
    height: number;
};
export declare function useBoolean(initialValue?: boolean | null): [boolean, {
    toggle(): void;
    off(): void;
    on(): void;
    set(v: boolean): void;
    reset(): void;
}];
export declare function useObject<T = any>(initialValue: T): [T, {
    write(f: Partial<T> | ((e: T) => Partial<T>)): void;
    replace(f: T | ((e: T) => T)): void;
    /**
     * Reset to initial value
     */
    reset(): void;
}];
/**
 * Returns `true` after the component mounts/hydrates (after the first render)
 */
export declare function useSecondRender(): boolean;
export declare function BrowserOnly({ children }: {
    children?: React.ReactNode;
}): JSX.Element;
