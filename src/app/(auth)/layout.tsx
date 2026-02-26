"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/presentation/store/authStore";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialize = useAuthStore((s) => s.initialize);
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          animation: "fadeIn 0.4s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}
