"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
// Importamos los iconos de Lucide
import {
  LayoutDashboard,
  ClipboardList,
  ShieldCheck,
  UserCircle,
  Settings,
  ChartColumn,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, label: "Resumen Global", href: "/dashboard" },
  { icon: ClipboardList, label: "Audit Logs", href: "/dashboard/audit-logs" },
  { icon: ChartColumn, label: "Presupuesto", href: "/dashboard/presupuesto" },
  { icon: ShieldCheck, label: "Seguridad IPs", href: "/dashboard/security" },
  { icon: UserCircle, label: "Perfil", href: "/dashboard/profile" },
  { icon: Settings, label: "Configuración", href: "/dashboard/settings" },
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? "80px" : "280px",
        minHeight: "100vh",
        backgroundColor: "#00284d", // Azul institucional profundo
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* HEADER LOGO - CORREGIDO */}
      <div
        style={{
          padding: "32px 24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div style={{ width: "40px", height: "40px", position: "relative" }}>
          <Image
            src="/images/logo1ucaldas.png" // RUTA CORREGIDA: Apunta a public/images/logo1-u-caldas.png
            alt="Logo SAPFIAI"
            fill
            style={{ objectFit: "contain" }}
            priority // Añadido para mejorar la carga del logo
          />
        </div>
        {!collapsed && (
          <div>
            <p
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
                margin: 0,
              }}
            >
              SAPFIAI
            </p>
            <p
              style={{
                color: "#d5bb87",
                fontSize: "10px",
                margin: 0,
                opacity: 0.8,
              }}
            >
              Universidad de Caldas
            </p>
          </div>
        )}
      </div>

      {/* NAVEGACIÓN */}
      <nav style={{ flex: 1, padding: "0 16px" }}>
        {NAV_ITEMS.map((Item) => {
          const active = pathname === Item.href;
          return (
            <button
              key={Item.href}
              onClick={() => router.push(Item.href)}
              className="group"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
                padding: "12px 16px",
                margin: "4px 0",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                backgroundColor: active
                  ? "rgba(213, 187, 135, 0.1)"
                  : "transparent",
                color: active ? "#d5bb87" : "rgba(255,255,255,0.7)",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              <Item.icon
                size={22}
                strokeWidth={active ? 2.5 : 1.5}
                style={{
                  color: active ? "#d5bb87" : "inherit",
                  transition: "color 0.2s",
                }}
              />

              {!collapsed && (
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: active ? "700" : "500",
                    letterSpacing: "0.3px",
                  }}
                >
                  {Item.label}
                </span>
              )}

              {active && !collapsed && (
                <div style={{ marginLeft: "auto" }}>
                  <ChevronRight size={14} color="#d5bb87" />
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* FOOTER - COLLAPSE */}
      <div
        style={{
          padding: "24px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: "100%",
            padding: "10px",
            background: "rgba(255,255,255,0.05)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <span style={{ fontSize: "12px", opacity: 0.7 }}>←</span>
          )}
        </button>
      </div>
    </aside>
  );
}
