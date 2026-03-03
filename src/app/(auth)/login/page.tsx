"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/presentation/store/authStore";
import { authService } from "@/infrastructure/api/auth/AuthService";
import { AuthStatus } from "@/core/domain/enums";
import { Input } from "@/presentation/components/ui/Input";
import { AuthCard } from "@/presentation/components/ui/AuthCard";

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setStatus, setPendingTwoFAToken } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row justify-center md:justify-between items-center gap-10">
        {/* Logos siempre en horizontal */}
        <div className="flex flex-row gap-6 items-center">
          <img
            src="/images/logo1ucaldas.png"
            alt="U Caldas"
            className="w-56 md:w-72 drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] invert brightness-0"
          />
          <img
            src="/images/logo-cidt.png"
            alt="CIDT"
            className="w-28 md:w-36 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] invert brightness-0"
          />
        </div>

        {/* Card */}
        <AuthCard>
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-ucaldas-blue">
              Acceso Seguro
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Sistema Financiero Sapfiai
            </p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-600 px-3 py-2 rounded mb-4 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Correo Institucional"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@ucaldas.edu.co"
              error={error.includes("Correo") ? error : undefined}
            />
            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              error={error.includes("Contraseña") ? error : undefined}
            />

            {/* Olvidó contraseña */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-ucaldas-blue hover:underline"
              >
                ¿Olvidó su contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-3 py-3 rounded-xl font-bold text-white transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-ucaldas-blue hover:bg-blue-800"
              }`}
            >
              {loading ? "Validando..." : "Iniciar Sesión"}
            </button>
          </form>
        </AuthCard>
      </div>
    </main>
  );
}
