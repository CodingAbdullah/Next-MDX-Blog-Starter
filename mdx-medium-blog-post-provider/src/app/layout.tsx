import type { Metadata } from "next";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";

// Metadata for the application
export const metadata: Metadata = {
  title: "MDX Medium Blog Post Provider App",
  description: "Generated Medium style articles using this starter template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Analytics mode="production" />
        {children}
      </body>
    </html>
  );
}
