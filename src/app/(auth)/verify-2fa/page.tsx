"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/presentation/store/authStore";
import { authService } from "@/infrastructure/api/auth/AuthService";
import { AuthStatus } from "@/core/domain/enums";
import { GuestGuard } from "@/infrastructure/guards";
import { AuthCard } from "@/presentation/components/ui/AuthCard";

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
    <>
      <style>{`
        .verify-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
        }

        /* DESKTOP: card izquierda, logos derecha */
        .verify-inner {
          width: 100%;
          max-width: 1100px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        /* Logos desktop (derecha, horizontal) */
        .logos-desktop {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 24px;
        }

        /* Logos móvil (ocultos en desktop) */
        .logo-mobile-top,
        .logo-mobile-bottom {
          display: none;
        }

        /* TABLET */
        @media (max-width: 1024px) {
          .verify-inner {
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .logos-desktop {
            display: none;
          }

          .logo-mobile-top {
            display: flex;
            justify-content: center;
          }

          .logo-mobile-bottom {
            display: flex;
            justify-content: center;
          }

        }

        /* MÓVIL */
        @media (max-width: 640px) {
          .verify-wrapper {
            padding: 20px 16px;
          }

          .verify-inner {
            gap: 24px;
          }

          .code-input {
            width: 42px !important;
            height: 50px !important;
            font-size: 20px !important;
          }
        }
      `}</style>

      <main className="verify-wrapper">
        <div className="verify-inner">
          {/* LOGO ARRIBA (móvil/tablet) - CIDT */}
          <div className="logo-mobile-top">
            <img
              src="/images/logo-cidt.png"
              alt="CIDT"
              style={{
                width: "100px",
                filter:
                  "brightness(0) invert(1) drop-shadow(0 0 8px rgba(255,255,255,0.7))",
              }}
            />
          </div>

          {/* CARD */}
          <AuthCard>
            <div style={{ marginBottom: "24px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#003e70",
                  margin: "0 0 6px 0",
                }}
              >
                Autenticación en Dos Pasos
              </h2>
              <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
                Ingresa el código de 6 dígitos enviado a tu correo electrónico.
              </p>
            </div>

            {error && (
              <div
                style={{
                  backgroundColor: "#fee2e2",
                  color: "#dc2626",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                  margin: "16px 0",
                }}
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
                    className="code-input"
                    style={{
                      width: "48px",
                      height: "56px",
                      textAlign: "center",
                      fontSize: "22px",
                      fontWeight: 700,
                      borderRadius: "10px",
                      border:
                        focusedIndex === i
                          ? "2px solid #003e70"
                          : "1.5px solid #d1d5db",
                      outline: "none",
                      color: "#003e70",
                      transition: "border 0.2s",
                    }}
                  />
                ))}
              </div>

              <div style={{ height: "8px" }} />

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: loading ? "#9ca3af" : "#003e70",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "16px",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                }}
              >
                {loading ? "Verificando..." : "Verificar código"}
              </button>
            </form>
          </AuthCard>

          {/* LOGO ABAJO (móvil/tablet) - U. Caldas */}
          <div className="logo-mobile-bottom">
            <img
              src="/images/logo1ucaldas.png"
              alt="U Caldas"
              style={{
                width: "200px",
                filter:
                  "brightness(0) invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.7))",
              }}
            />
          </div>

          {/* LOGOS DESKTOP (derecha) */}
          <div className="logos-desktop">
            <img
              src="/images/logo-cidt.png"
              alt="CIDT"
              style={{
                width: "120px",
                filter:
                  "brightness(0) invert(1) drop-shadow(0 0 8px rgba(255,255,255,0.7))",
              }}
            />
            <img
              src="/images/logo1ucaldas.png"
              alt="U Caldas"
              style={{
                width: "260px",
                filter:
                  "brightness(0) invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.7))",
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default function Verify2FAPage() {
  return (
    <GuestGuard>
      <Verify2FAContent />
    </GuestGuard>
  );
}
