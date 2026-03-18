"use client";
import { useState } from "react";
import Image from "next/image";
import { authService } from "@/services";
import { AuthCard, Input } from "@/components/ui";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Introduce tu email");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await authService.forgotPassword({ email });

      if (res.succeeded) {
        setSent(true);
      } else {
        setError(res.errors?.join(", ") || "No se pudo enviar el correo");
      }
    } catch {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Fondo Animado Institucional */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-50 animate-[moveBackground_60s_linear_infinite]"
        style={{ backgroundImage: 'url("/images/fondo-login.jpg")' }}
      />
      <style>{`
        @keyframes moveBackground {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>

      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row justify-center md:justify-between items-center gap-10">
        {/* Logos adaptados al diseño responsivo que aprobaste */}
        <div className="flex flex-row gap-6 items-center">
          <Image
            src="/images/logo1ucaldas.png"
            alt="U Caldas"
            width={288}
            height={84}
            className="w-56 md:w-72 drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] invert brightness-0"
          />
          <Image
            src="/images/logo-cidt.png"
            alt="CIDT"
            width={144}
            height={52}
            className="w-28 md:w-36 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] invert brightness-0"
          />
        </div>

        <AuthCard>
          {sent ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4 text-green-500">📧</div>
              <h2 className="text-2xl font-extrabold text-ucaldas-blue mb-2">
                Correo enviado
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Si el email <span className="font-semibold">{email}</span>{" "}
                existe en el sistema, recibirás instrucciones de recuperación.
              </p>
              <Link
                href="/login"
                className="text-ucaldas-blue font-bold hover:underline"
              >
                ← Volver al login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="text-4xl mb-2">🔑</div>
                <h2 className="text-2xl font-extrabold text-ucaldas-blue">
                  Recuperar contraseña
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Introduce tu correo institucional para recibir instrucciones.
                </p>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-200 text-red-600 px-3 py-2 rounded-xl mb-4 text-sm flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="Correo electrónico"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@ucaldas.edu.co"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-2 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-ucaldas-blue hover:bg-blue-800"
                  }`}
                >
                  {loading ? "⏳ Enviando..." : "→ Enviar instrucciones"}
                </button>

                <div className="text-center mt-4">
                  <Link
                    href="/login"
                    className="text-sm text-gray-500 hover:text-ucaldas-blue font-medium transition-colors"
                  >
                    ← Volver al inicio de sesión
                  </Link>
                </div>
              </form>
            </>
          )}
        </AuthCard>
      </div>
    </main>
  );
}
