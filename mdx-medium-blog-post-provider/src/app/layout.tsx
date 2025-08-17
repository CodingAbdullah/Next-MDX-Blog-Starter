import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";

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
      </body>
    </html>
  );
}
