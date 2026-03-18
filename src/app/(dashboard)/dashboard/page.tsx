"use client";
import { useAuthStore } from "@/store";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DashboardTour } from "@/components/ui"; // ✅ ya lo tenías importado

const stats = [
  {
    label: "Estado del sistema",
    value: "Activo",
    icon: "✅",
    color: "#10b981",
  },
  { label: "Módulo Auth", value: "JWT + 2FA", icon: "🔐", color: "#667eea" },
  { label: "Seguridad", value: "IP Guard", icon: "🛡️", color: "#f59e0b" },
  { label: "API Backend", value: "SAPFIAI v1", icon: "⚡", color: "#8b5cf6" },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const today = format(new Date(), "EEEE d 'de' MMMM yyyy", { locale: es });

  return (
    <div style={{ padding: "36px 40px" }}>
      {/* ── Header ─────────────────────────────────────────────── */}
      {/* CAMBIO: flex row para alinear título + botón del tour     */}
      <div
        style={{
          marginBottom: "32px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#111827",
              margin: "0 0 6px",
            }}
          >
            ¡Bienvenido, {user?.userName || user?.email || "usuario"}!
          </h1>
          <p
            style={{
              color: "#6b7280",
              fontSize: "15px",
              margin: 0,
              textTransform: "capitalize",
            }}
          >
            {today}
          </p>
        </div>

        {/* CAMBIO: botón del recorrido guiado */}
        <DashboardTour />
      </div>

      {/* ── Stats cards ────────────────────────────────────────── */}
      {/* CAMBIO: id="dashboard-summary" para el paso 1 del tour   */}
      <div
        id="dashboard-summary"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "13px",
                    margin: "0 0 8px",
                    fontWeight: "500",
                  }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#111827",
                    margin: 0,
                  }}
                >
                  {stat.value}
                </p>
              </div>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: `${stat.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                }}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Info card — sesión ─────────────────────────────────── */}
      {/* CAMBIO: id="dashboard-transactions" para paso 2 del tour */}
      {/* (es la sección de datos de sesión/actividad del usuario) */}
      <div
        id="dashboard-transactions"
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "28px 32px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb",
          marginBottom: "24px",
        }}
      >
        <h3
          style={{
            fontSize: "17px",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 16px",
          }}
        >
          Información de sesión
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            fontSize: "14px",
            color: "#4b5563",
          }}
        >
          <div>
            <span style={{ fontWeight: "600", color: "#111827" }}>Email: </span>
            {user?.email ?? "—"}
          </div>
          <div>
            <span style={{ fontWeight: "600", color: "#111827" }}>
              Username:{" "}
            </span>
            {user?.userName ?? "—"}
          </div>
          <div>
            <span style={{ fontWeight: "600", color: "#111827" }}>2FA: </span>
            {user?.twoFactorEnabled ? "✅ Habilitado" : "❌ Deshabilitado"}
          </div>
          <div>
            <span style={{ fontWeight: "600", color: "#111827" }}>
              Último acceso:{" "}
            </span>
            {user?.lastLoginDate
              ? format(new Date(user.lastLoginDate), "dd/MM/yyyy HH:mm")
              : "—"}
          </div>
          <div>
            <span style={{ fontWeight: "600", color: "#111827" }}>
              IP último acceso:{" "}
            </span>
            {user?.lastLoginIp ?? "—"}
          </div>
        </div>
      </div>

      {/* ── Módulos disponibles ────────────────────────────────── */}
      {/* CAMBIO: id="dashboard-reports" paso 3                    */}
      {/* CAMBIO: id="dashboard-security" paso 4 (mismo bloque,   */}
      {/*         wrapeado en un div para poder apuntar a ambos)   */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "28px 32px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb",
        }}
      >
        <h3
          style={{
            fontSize: "17px",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 16px",
          }}
        >
          Módulos disponibles
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            color: "#4b5563",
            fontSize: "14px",
          }}
        >
          {/* Grupo de módulos de reportes — paso 3 del tour */}
          <div id="dashboard-reports">
            <p style={{ margin: 0 }}>
              ✅ Autenticación JWT con refresh token automático
            </p>
            <p style={{ margin: "8px 0 0" }}>
              ✅ Verificación en dos pasos (TOTP / 2FA)
            </p>
            <p style={{ margin: "8px 0 0" }}>
              ✅ Recuperación y restablecimiento de contraseña
            </p>
            <p style={{ margin: "8px 0 0" }}>
              ✅ Audit logs paginados por usuario
            </p>
          </div>

          {/* Grupo de módulos de seguridad — paso 4 del tour */}
          <div id="dashboard-security" style={{ marginTop: "8px" }}>
            <p style={{ margin: 0 }}>
              ✅ Gestión de IPs bloqueadas (Security service)
            </p>
            <p style={{ margin: "8px 0 0" }}>✅ Desbloqueo de cuentas</p>
            <p style={{ margin: "8px 0 0" }}>
              ✅ Clean Architecture (Domain / Infrastructure / Presentation)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
