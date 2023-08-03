// providers
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

// custom providers
import { ThemeProvider } from "@/providers/ThemeProvider";
import ModalProvider from "../providers/ModalProvider";

// lib
import { cn } from "@/lib/utils";

// styles
import "./globals.css";

// fonts
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// metadata
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "SaaS AI Companion App",
    description: "A Software as a Service AI Companion App",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={cn("bg-secondary",inter.className)}>
                    <ThemeProvider
                    attribute="class"
                        defaultTheme="light"
                        enableSystem
                    >
                        <ModalProvider />
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
