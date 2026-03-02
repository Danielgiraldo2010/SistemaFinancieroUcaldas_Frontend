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
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  const handleChange = (i: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) refs[i + 1].current?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[i] && i > 0)
      refs[i - 1].current?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    const next = [...code];
    pasted.split("").forEach((c, i) => {
      next[i] = c;
    });

    setCode(next);
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
    setStatus(AuthStatus.Loading);

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
        setError(
          response.message ||
            response.errors?.join(", ") ||
            "Código inválido o expirado",
        );
        setStatus(AuthStatus.Unauthenticated);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error de verificación";
      setError(message);
      setStatus(AuthStatus.Unauthenticated);
    } finally {
      setLoading(false);
    }
  };

  const isCodeComplete = code.join("").length === 6;

  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center animate-bgSlow"
      style={{ backgroundImage: "url('/image/bg-universidad.jpeg')" }}
    >
      {/* Overlay más oscuro */}
      <div className="absolute inset-0 bg-blue-950/60"></div>

      <div className="relative z-10 w-full max-w-7xl flex items-center justify-between px-8">
        {/* FORMULARIO */}
        <div className="w-full max-w-md min-h-[550px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-12 flex flex-col justify-center transition-all duration-300">
          {/* Candado */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-100 text-3xl">
              🔐
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Autenticación en Dos Pasos
          </h2>

          <p className="text-gray-500 text-sm text-center mt-2">
            Ingresa el código de 6 dígitos
          </p>

          <p className="text-xs text-gray-400 text-center mt-2">
            Nunca compartas este código con nadie.
          </p>

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex justify-center gap-3" onPaste={handlePaste}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={refs[i]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`
                    w-12 h-14 text-center text-xl font-bold rounded-xl
                    border-2 transition-all duration-200
                    ${
                      error
                        ? "border-red-400 bg-red-50"
                        : digit
                          ? "border-[#003e70] bg-blue-50"
                          : "border-gray-300 bg-gray-50"
                    }
                    focus:outline-none 
                    focus:border-[#003e70]
                    focus:ring-2 
                    focus:ring-[#003e70]/30
                  `}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || !isCodeComplete}
              className={`
                w-full mt-8 py-3 rounded-xl font-semibold text-white transition-all duration-200
                ${
                  loading || !isCodeComplete
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#003e70] to-[#002c4f] hover:brightness-110"
                }
              `}
            >
              {loading ? "Verificando..." : "Verificar código"}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              type="button"
              className="text-sm text-[#003e70] hover:underline"
            >
              ¿No recibiste el código?
            </button>
          </div>

          <div className="text-center mt-6">
            <a href="/login" className="text-[#003e70] text-sm hover:underline">
              Volver al inicio de sesión
            </a>
          </div>
        </div>

        {/* LOGOS DERECHA */}
        <div className="hidden lg:flex flex-col items-center ml-16">
          <img
            src="/image/logo-u.png"
            alt="Universidad"
            className="w-80 opacity-90"
          />
          <img
            src="/image/logo-ci2dt2.png"
            alt="CIDTT"
            className="w-40 opacity-90 mt-4"
          />
        </div>
      </div>
    </div>
  );
}

export default function Verify2FAPage() {
  return (
    <GuestGuard>
      <Verify2FAContent />
    </GuestGuard>
  );
}
