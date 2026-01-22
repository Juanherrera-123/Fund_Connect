import "@/styles/globals.css";

import type { Metadata } from "next";

import AuthDebugBridge from "@/components/AuthDebugBridge";
import CanonicalHostRedirect from "@/components/CanonicalHostRedirect";
import HashScrollHandler from "@/components/HashScrollHandler";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: "IGATES · Institutional Fund Gateway",
  description: "IGATES platform for institutional fund discovery, approvals, and reporting.",
  icons: {
    icon: "/IGATESLOGO.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/IGATESLOGO.png" sizes="any" />
      </head>
      <body className="overflow-x-hidden">
        <CanonicalHostRedirect />
        <AuthDebugBridge />
        <LanguageProvider>
          <HashScrollHandler />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
