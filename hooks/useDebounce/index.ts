"use client";

// hooks
import { useEffect, useState } from "react";

// interfaces
interface IUseDebounceProps<T> {
    value: T;
    delay?: number;
}


const useDebounce= <T>({ value, delay }: IUseDebounceProps<T>): T => {
    const [debouncedValue, setDebouncedValue] = useState<any>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
};


export default useDebounce;