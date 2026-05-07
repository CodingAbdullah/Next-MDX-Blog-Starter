import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Viewport } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import ThemedToaster from "@/components/ThemedToaster";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    <Analytics mode="production" />
                    <ThemeToggle />
                    {children}
                    <ThemedToaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
