import { create } from "zustand";
import { MOCK_PRESUPUESTOS } from "@/core";
import type { Presupuesto } from "@/core/models";

interface PresupuestoState {
  presupuestos: Presupuesto[];
  addPresupuesto: (nuevo: Presupuesto) => void;
}

export const usePresupuestoStore = create<PresupuestoState>((set) => ({
  presupuestos: MOCK_PRESUPUESTOS,
  addPresupuesto: (nuevo) =>
    set((state) => ({
      presupuestos: [nuevo, ...state.presupuestos],
    })),
}));
