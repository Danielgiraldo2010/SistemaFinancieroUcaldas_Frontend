"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/presentation/store/authStore";
import { authService } from "@/infrastructure/api/auth/AuthService";
import { AuthStatus } from "@/core/domain/enums";

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setStatus, setPendingTwoFAToken } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.login({ email, password });

      if (response.requires2FA) {
        setPendingTwoFAToken(response.token ?? null);
        router.push("/verify-2fa");
        return;
      }

      if (response.success && response.user) {
        setUser(response.user);
        setStatus(AuthStatus.Authenticated);
        router.push("/dashboard");
      } else {
        setError(response.message || "Credenciales inválidas");
      }
    } catch {
      setError("Error de conexión");
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
          }}
        >
          <div style={{ marginBottom: "25px" }}>
            <h2
              style={{
                fontSize: "26px",
                fontWeight: "800",
                color: "#003e70",
                margin: 0,
              }}
            >
              Acceso Seguro
            </h2>
            <p style={{ color: "#64748b", fontSize: "14px", marginTop: "6px" }}>
              Sistema Financiero Sapfiai
            </p>
          </div>

          {error && (
            <div
              style={{
                color: "#dc2626",
                marginBottom: "15px",
                fontSize: "13px",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#475569",
                  marginBottom: "5px",
                }}
              >
                Correo Institucional
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: "25px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#475569",
                  marginBottom: "5px",
                }}
              >
                Contraseña
              </label>

              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #cbd5e1",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                  }}
                >
                  👁
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                background: "#003e70",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: "800",
              }}
            >
              {loading ? "Validando..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
