import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAPFIAI — Sistema de Administración",
  description: "Plataforma de administración SAPFIAI",
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
