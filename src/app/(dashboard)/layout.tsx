"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store";
import { Sidebar } from "@/components/layout";
import {
  LogOut,
  User,
  ChevronDown,
  LayoutDashboard,
  ClipboardList,
  ShieldCheck,
  UserCircle,
  Settings,
  KeyRound,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import ChangePasswordModal from "@/components/ChangePasswordModal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, initialize } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const getPageDetails = () => {
    switch (pathname) {
      case "/dashboard":
        return { title: "Resumen Global", Icon: LayoutDashboard };
      case "/dashboard/audit-logs":
        return { title: "Logs de Auditoría", Icon: ClipboardList };
      case "/dashboard/security":
        return { title: "Seguridad de IPs", Icon: ShieldCheck };
      case "/dashboard/profile":
        return { title: "Perfil de Usuario", Icon: UserCircle };
      case "/dashboard/settings":
        return { title: "Configuración", Icon: Settings };
      default:
        return { title: "Panel de Control", Icon: LayoutDashboard };
    }
  };

  const { title, Icon } = getPageDetails();

  const handleLogout = async () => {
    await logout();
    router.push("/login"); // Mantengo la redirección original
  };

  return (
    <>
      <div className="flex h-screen bg-[#F4F7FE]">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-20 bg-white border-b border-gray-100 px-10 flex items-center justify-between z-40 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-[#003e70] opacity-80" />
                <span className="text-[#003e70] font-black text-sm tracking-tighter uppercase">
                  SAPFIAI
                </span>
                <div className="h-5 w-[1px] bg-gray-200 mx-2"></div>
              </div>
              <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
                <span className="text-gray-400">Dashboard</span>
                <span className="text-gray-300">/</span>
                <span className="text-[#003e70]">{title}</span>
              </nav>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:block bg-[#fdf4e7] text-[#b45309] text-[10px] font-extrabold px-4 py-1.5 rounded-full border border-[#fde68a] uppercase tracking-tighter shadow-sm">
                ROL:{" "}
                {((user as Record<string, unknown>)?.role as string) ||
                  "SUPERADMIN"}
              </div>

              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-3 group transition-all"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-black text-[#00284d] leading-tight">
                      {user?.userName || "Usuario"}
                    </p>
                    <p className="text-[11px] text-gray-400 font-medium leading-tight">
                      {user?.email}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#003e70] flex items-center justify-center text-white font-bold border-2 border-white shadow-md">
                    {user?.userName?.[0].toUpperCase() || "U"}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {menuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setMenuOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                      <button
                        onClick={() => {
                          router.push("/dashboard/profile");
                          setMenuOpen(false);
                        }}
                        className="w-full px-5 py-3 text-left text-sm text-gray-600 hover:bg-slate-50 flex items-center gap-3"
                      >
                        <User className="w-4 h-4 text-[#003e70]" /> Mi Perfil
                      </button>

                      <button
                        onClick={() => {
                          setIsModalOpen(true);
                          setMenuOpen(false);
                        }}
                        className="w-full px-5 py-3 text-left text-sm text-gray-600 hover:bg-slate-50 flex items-center gap-3"
                      >
                        <KeyRound className="w-4 h-4 text-[#003e70]" /> Cambiar Contraseña
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full px-5 py-4 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 font-bold border-t border-gray-50 mt-2"
                      >
                        <LogOut className="w-4 h-4" /> Cerrar Sesión
                      </button>
                    </div>
                  </>
                )}

                <ChangePasswordModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-10 bg-[#F4F7FE]">
            <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
