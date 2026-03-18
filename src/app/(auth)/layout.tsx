import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* IMAGEN DE FONDO */}
      <div
        className="animate-bgFloat"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#0f172a",
          backgroundImage: "url('/images/bg-universidad.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",

          zIndex: 0,
        }}
      />

      {/* CAPA AZUL CRISTALINA */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 86, 179, 0.32)",
          zIndex: 1,
        }}
      />

      {/* CONTENIDO */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
}
