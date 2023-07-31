"use client";

import * as React from "react";

// providers
import { ThemeProvider as NextThemesProvider } from "next-themes";

// types
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
