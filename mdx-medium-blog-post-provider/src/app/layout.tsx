import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";

// Root Layout for the simple Next.js application
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
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  );
}
