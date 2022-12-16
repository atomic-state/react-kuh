export declare function useWindowSize(): {
    width: number;
    height: number;
};
export declare function useBoolean(initialValue?: boolean | null): [boolean, {
    toggle(): void;
    off(): void;
    on(): void;
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
