import "@/styles/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IGATES · Institutional Fund Gateway",
  description: "IGATES platform for institutional fund discovery, approvals, and reporting.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
