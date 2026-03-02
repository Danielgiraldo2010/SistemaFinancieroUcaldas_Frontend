"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/presentation/store/authStore";
import { authService } from "@/infrastructure/api/auth/AuthService";
import { AuthStatus } from "@/core/domain/enums";
import { GuestGuard } from "@/infrastructure/guards";

function Verify2FAContent() {
  const router = useRouter();
  const { setUser, setStatus, pendingTwoFAToken } = useAuthStore();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  const handleChange = (i: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) refs[i + 1].current?.focus();
  };

  const handleKeyDown = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      refs[i - 1].current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");

    if (fullCode.length !== 6) {
      setError("Ingresa el código completo");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authService.verify2FA({
        code: fullCode,
        token: pendingTwoFAToken ?? undefined,
      });

      if (response.success && response.user) {
        setUser(response.user);
        setStatus(AuthStatus.Authenticated);
        router.push("/dashboard");
      } else {
        setError("Código inválido o expirado");
        setStatus(AuthStatus.Unauthenticated);
      }
    } catch {
      setError("Error de verificación");
      setStatus(AuthStatus.Unauthenticated);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* FORMULARIO */}
        <div
          style={{
            width: "380px",
            minHeight: "550px",
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#003e70",
              textAlign: "center",
            }}
          >
            Autenticación en Dos Pasos
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            Ingresa el código de 6 dígitos, enviado a tu correo electrónico.
          </p>

          {error && (
            <div
              style={{
                color: "#dc2626",
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={refs[i]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onFocus={() => setFocusedIndex(i)}
                  onBlur={() => setFocusedIndex(null)}
                  style={{
                    width: "45px",
                    height: "55px",
                    textAlign: "center",
                    fontSize: "20px",
                    borderRadius: "10px",
                    border:
                      focusedIndex === i
                        ? "2px solid #003e70"
                        : "1px solid #ccc",
                    outline: "none",
                  }}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                marginTop: "30px",
                padding: "15px",
                background: "#003e70",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: 800,
              }}
            >
              {loading ? "Verificando..." : "Verificar código"}
            </button>
          </form>
        </div>

        {/* LOGOS DERECHA */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "30px",
            zIndex: 10,
          }}
        >
          <img
            src="/images/logo1-u-caldas.png"
            alt="U Caldas"
            style={{
              width: "280px",
              filter:
                "brightness(0) invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.7))",
            }}
          />
          <img
            src="/images/logo-cidt.png"
            alt="CIDT"
            style={{
              width: "140px",
              filter:
                "brightness(0) invert(1) drop-shadow(0 0 8px rgba(255,255,255,0.7))",
            }}
          />
        </div>
      </div>
    </main>
  );
}

export default function Verify2FAPage() {
  return (
    <GuestGuard>
      <Verify2FAContent />
    </GuestGuard>
  );
}
