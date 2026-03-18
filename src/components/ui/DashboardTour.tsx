"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useEffect, useRef } from "react";
import type { CallBackProps, Step } from "react-joyride";

const Joyride = dynamic(() => import("react-joyride"), { ssr: false });

// ─── Constantes ────────────────────────────────────────────────────────────────

const TOUR_STORAGE_KEY = "sapfiai_dashboard_tour_v1";

const TOUR_STEPS: Step[] = [
  {
    target: "#dashboard-summary",
    title: "Estado del sistema",
    content:
      "Aquí puedes ver un resumen rápido del sistema: estado de los módulos, autenticación activa y servicios principales del backend.",
    disableBeacon: true,
    placement: "bottom",
  },
  {
    target: "#dashboard-transactions",
    title: "Información de sesión",
    content:
      "En esta sección puedes consultar los datos de tu sesión actual como tu email, estado de verificación en dos pasos y el último acceso registrado.",
    placement: "bottom",
  },
  {
    target: "#dashboard-reports",
    title: "Funciones del sistema",
    content:
      "Aquí se muestran las principales funcionalidades disponibles: autenticación segura con JWT, verificación en dos pasos y recuperación de contraseña.",
    placement: "top",
  },
  {
    target: "#dashboard-security",
    title: "Herramientas de seguridad",
    content:
      "En esta parte se encuentran las herramientas de seguridad como gestión de IPs bloqueadas, desbloqueo de cuentas y arquitectura segura del sistema.",
    placement: "left",
  },
];

const TOTAL_STEPS = TOUR_STEPS.length;

// ─── Estilos de Joyride ────────────────────────────────────────────────────────

const JOYRIDE_STYLES = {
  options: {
    primaryColor: "#1d4ed8",
    zIndex: 9999,
    arrowColor: "#ffffff",
    backgroundColor: "#ffffff",
    overlayColor: "rgba(15, 23, 42, 0.55)",
    textColor: "#1e293b",
    width: 440,
  },
  tooltip: {
    borderRadius: "14px",
    padding: "0px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(29,78,216,0.12)",
    overflow: "hidden",
  },
  tooltipTitle: {
    fontSize: "17px",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "6px",
    padding: "22px 24px 0 24px",
  },
  tooltipContent: {
    fontSize: "14.5px",
    lineHeight: "1.75",
    color: "#475569",
    padding: "8px 24px 0 24px",
  },
  tooltipFooter: {
    padding: "16px 24px 22px 24px",
    gap: "8px",
    borderTop: "1px solid #f1f5f9",
    marginTop: "16px",
  },
  buttonNext: {
    backgroundColor: "#1d4ed8",
    borderRadius: "8px",
    fontSize: "13.5px",
    fontWeight: 600,
    padding: "9px 18px",
    color: "#ffffff",
    boxShadow: "0 2px 8px rgba(29,78,216,0.3)",
  },
  buttonBack: {
    color: "#374151",
    fontSize: "13.5px",
    fontWeight: 600,
    marginRight: "4px",
  },
  buttonSkip: {
    color: "#ef4444",
    fontSize: "13px",
    fontWeight: 600,
  },
  buttonClose: {
    color: "#94a3b8",
    top: "14px",
    right: "14px",
  },
  spotlight: {
    borderRadius: "12px",
  },
};

// ─── CSS global (inyectado una vez en el DOM) ──────────────────────────────────

const GLOBAL_CSS = `
  /* Ocultar scrollbar nativa durante el tour (evita doble scrollbar)
     sin bloquear el scroll programático de Joyride */
  body.tour-active::-webkit-scrollbar {
    display: none !important;
  }
  body.tour-active {
    scrollbar-width: none !important; /* Firefox */
  }

  .tour-highlight {
    outline: 3px solid #1d4ed8 !important;
    outline-offset: 5px !important;
    border-radius: 10px !important;
    animation: tour-pulse-border 1.6s ease-in-out infinite !important;
    position: relative;
    z-index: 1;
  }

  @keyframes tour-pulse-border {
    0%, 100% {
      outline-color: #1d4ed8;
      box-shadow: 0 0 0 0 rgba(29, 78, 216, 0.25);
    }
    50% {
      outline-color: #60a5fa;
      box-shadow: 0 0 0 6px rgba(29, 78, 216, 0.08);
    }
  }

  .tour-complete-toast {
    animation: toast-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  @keyframes toast-in {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .tour-complete-toast.hiding {
    animation: toast-out 0.3s ease-in forwards;
  }

  @keyframes toast-out {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(10px) scale(0.97);
    }
  }
`;

// ─── Componente Toast de finalización ─────────────────────────────────────────

function CompletionToast({ onDismiss }: { onDismiss: () => void }) {
  const [hiding, setHiding] = useState(false);

  const handleDismiss = useCallback(() => {
    setHiding(true);
    setTimeout(onDismiss, 300);
  }, [onDismiss]);

  useEffect(() => {
    const timer = setTimeout(handleDismiss, 4500);
    return () => clearTimeout(timer);
  }, [handleDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`tour-complete-toast fixed bottom-6 right-6 z-[10000] flex items-start gap-3 bg-white border border-emerald-200 rounded-2xl shadow-2xl px-5 py-4 max-w-sm ${
        hiding ? "hiding" : ""
      }`}
    >
      {/* Icono */}
      <div className="flex-shrink-0 w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mt-0.5">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="9" fill="#10b981" />
          <path
            d="M6 10.5l2.5 2.5 5.5-5.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Texto */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-700 text-slate-900 font-semibold leading-snug">
          ¡Tour completado!
        </p>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
          Ya conoces las funciones principales de la plataforma.
        </p>
      </div>

      {/* Cerrar */}
      <button
        onClick={handleDismiss}
        aria-label="Cerrar notificación"
        className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors mt-0.5"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <path
            d="M1 1l12 12M13 1L1 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

// ─── Componente principal ──────────────────────────────────────────────────────

export default function DashboardTour() {
  const [run, setRun] = useState(false);
  const [tourKey, setTourKey] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const activeTargetRef = useRef<Element | null>(null);

  // ── Inyectar CSS global una sola vez ────────────────────────────────────────
  useEffect(() => {
    if (document.getElementById("tour-global-css")) return;
    const style = document.createElement("style");
    style.id = "tour-global-css";
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
  }, []);

  // ── Auto-arranque si es primera visita ──────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    const alreadySeen = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!alreadySeen) {
      const timer = setTimeout(() => setRun(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const lockBodyScroll = useCallback(() => {
    document.body.classList.add("tour-active");
  }, []);

  const unlockBodyScroll = useCallback(() => {
    document.body.classList.remove("tour-active");
  }, []);

  // ── Aplicar / retirar clase de resaltado en el elemento activo ──────────────
  const applyHighlight = useCallback((index: number) => {
    // Retirar del anterior
    if (activeTargetRef.current) {
      activeTargetRef.current.classList.remove("tour-highlight");
    }

    const target = TOUR_STEPS[index]?.target as string;
    if (!target) return;

    const el = document.querySelector(target);
    if (el) {
      el.classList.add("tour-highlight");
      activeTargetRef.current = el;
    }
  }, []);

  const removeHighlight = useCallback(() => {
    if (activeTargetRef.current) {
      activeTargetRef.current.classList.remove("tour-highlight");
      activeTargetRef.current = null;
    }
  }, []);

  // ── Callback central de Joyride ─────────────────────────────────────────────
  const handleCallback = useCallback(
    (data: CallBackProps) => {
      const { status, action, index, type } = data;

      // Primer paso → bloquear scroll
      if (type === "tour:start") {
        lockBodyScroll();
      }

      // Sincronizar dots y resaltado con el paso actual
      if (type === "step:before") {
        setStepIndex(index);
        applyHighlight(index);
      }

      // Cerrar con X o acción reset
      if (action === "close" || action === "reset") {
        removeHighlight();
        unlockBodyScroll();
        localStorage.setItem(TOUR_STORAGE_KEY, "true");
        setRun(false);
      }

      // Finalizado
      if (status === "finished") {
        removeHighlight();
        unlockBodyScroll();
        localStorage.setItem(TOUR_STORAGE_KEY, "true");
        setRun(false);
        setShowToast(true);
      }

      // Saltado
      if (status === "skipped") {
        removeHighlight();
        unlockBodyScroll();
        localStorage.setItem(TOUR_STORAGE_KEY, "true");
        setRun(false);
      }
    },
    [applyHighlight, removeHighlight, lockBodyScroll, unlockBodyScroll],
  );

  // ── Arrancar tour (con reinicio limpio via key) ──────────────────────────────
  const handleStartTour = useCallback(() => {
    setStepIndex(0);
    setTourKey((k) => k + 1);
    lockBodyScroll();
    setTimeout(() => {
      setRun(true);
      applyHighlight(0);
    }, 50);
  }, [applyHighlight, lockBodyScroll]);

  if (!mounted) return null;

  return (
    <>
      {/* ── Botón de inicio del tour ─────────────────────────────────── */}
      <div className="relative inline-block">
        <button
          onClick={handleStartTour}
          aria-label="Iniciar recorrido guiado del dashboard"
          className="
          inline-flex items-center gap-2
          px-4 py-2
          text-sm font-medium text-blue-700
          bg-blue-50 border border-blue-200
          rounded-lg
          hover:bg-blue-100 hover:border-blue-300
          active:scale-95
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        "
        >
          {/* Ícono brújula */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon
              points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
              fill="currentColor"
              stroke="none"
            />
          </svg>
          Recorrido guiado
        </button>
      </div>

      {/* ── Indicador de progreso (dots) — top-center para no tapar el tooltip ── */}
      {run && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-2 shadow-lg"
          aria-label={`Paso ${stepIndex + 1} de ${TOTAL_STEPS}`}
          role="progressbar"
          aria-valuenow={stepIndex + 1}
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
        >
          <span className="text-xs font-medium text-slate-500 mr-1 tabular-nums">
            {stepIndex + 1}/{TOTAL_STEPS}
          </span>
          {TOUR_STEPS.map((_, i) => (
            <span
              key={i}
              className={`block rounded-full transition-all duration-300 ${
                i === stepIndex
                  ? "w-5 h-2.5 bg-blue-600"
                  : i < stepIndex
                    ? "w-2.5 h-2.5 bg-blue-300"
                    : "w-2.5 h-2.5 bg-slate-200"
              }`}
            />
          ))}
        </div>
      )}

      {/* ── Joyride ──────────────────────────────────────────────────── */}
      <Joyride
        key={tourKey}
        steps={TOUR_STEPS}
        run={run}
        continuous
        showSkipButton
        showProgress={false}
        scrollToFirstStep={true}
        disableScrolling={false}
        scrollOffset={120}
        disableScrollParentFix={true}
        disableOverlayClose={false}
        spotlightClicks={false}
        floaterProps={{ offset: 14 }}
        styles={JOYRIDE_STYLES}
        callback={handleCallback}
        locale={{
          back: "← Anterior",
          close: "Cerrar",
          last: "Finalizar tour ✓",
          next: "Siguiente →",
          skip: "Saltar tour",
        }}
      />

      {/* ── Toast de finalización ────────────────────────────────────── */}
      {showToast && <CompletionToast onDismiss={() => setShowToast(false)} />}
    </>
  );
}
