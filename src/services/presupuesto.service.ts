import { MOCK_PRESUPUESTOS, Presupuesto } from "@/core";

export async function getPresupuestos(): Promise<Presupuesto[]> {
  // Reemplazar este retorno por una llamada axios al endpoint real de presupuesto.
  return MOCK_PRESUPUESTOS;
}
