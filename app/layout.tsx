
// providers
import { ClerkProvider } from "@clerk/nextjs";

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
            <html lang="en">
                <body className={inter.className}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
