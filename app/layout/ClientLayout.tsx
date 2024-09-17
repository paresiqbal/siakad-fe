"use client";

import AppProvider from "@/context/AppContext";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <AppProvider>{children}</AppProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
