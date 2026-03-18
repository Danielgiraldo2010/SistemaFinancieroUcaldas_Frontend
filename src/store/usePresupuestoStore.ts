import { create } from "zustand";
import { MOCK_PRESUPUESTOS } from "@/core";
import type { Presupuesto } from "@/core/models";

interface PresupuestoState {
  presupuestos: Presupuesto[];
  addPresupuesto: (nuevo: Presupuesto) => void;
  updatePresupuesto: (id: string, data: Partial<Presupuesto>) => void;
  deletePresupuesto: (id: string) => void;
}

export const usePresupuestoStore = create<PresupuestoState>((set) => ({
  presupuestos: MOCK_PRESUPUESTOS,
  addPresupuesto: (nuevo) =>
    set((state) => ({
      presupuestos: [nuevo, ...state.presupuestos],
    })),
  updatePresupuesto: (id, data) =>
    set((state) => ({
      presupuestos: state.presupuestos.map((item) =>
        item.id === id ? { ...item, ...data } : item,
      ),
    })),
  deletePresupuesto: (id) =>
    set((state) => ({
      presupuestos: state.presupuestos.filter((item) => item.id !== id),
    })),
}));
