"use client";

import { useMemo } from "react";
import { DollarSign, Receipt, TrendingUp } from "lucide-react";
import type { Presupuesto } from "@/core/models";
import { Card, CardContent } from "@/components/ui";

interface PresupuestoKpisProps {
  readonly data: Presupuesto[];
}

const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function formatCOP(value: number) {
  return copFormatter.format(value);
}

export function PresupuestoKpis({ data }: PresupuestoKpisProps) {
  const { ingresoBruto, totalDescuentos, ingresoNeto } = useMemo(() => {
    return data.reduce(
      (acc, item) => {
        const bruto = item.valorMatricula * item.numEstudiantes;
        const descuentos = item.descuentoVotacion * item.numEstudiantes;
        const neto = bruto - descuentos;

        acc.ingresoBruto += bruto;
        acc.totalDescuentos += descuentos;
        acc.ingresoNeto += neto;
        return acc;
      },
      {
        ingresoBruto: 0,
        totalDescuentos: 0,
        ingresoNeto: 0,
      },
    );
  }, [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-br from-[#f4f9ff] to-white border-[#c7d8e6]">
        <CardContent>
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#1d5d8f]">
              Ingreso Bruto
            </p>
            <DollarSign className="text-[#1d5d8f]" size={18} />
          </div>
          <p className="text-xl font-extrabold text-[#003e70] break-words">
            {formatCOP(ingresoBruto)}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-[#f4f9ff] to-white border-[#c7d8e6]">
        <CardContent>
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#1d5d8f]">
              Total Descuentos (10% Votación)
            </p>
            <Receipt className="text-[#1d5d8f]" size={18} />
          </div>
          <p className="text-xl font-extrabold text-[#003e70]">
            {formatCOP(totalDescuentos)}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-[#fffaf2] to-white border-[#d8c9aa]">
        <CardContent>
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#a06f18]">
              Ingreso Neto
            </p>
            <TrendingUp className="text-[#a06f18]" size={18} />
          </div>
          <p className="text-xl font-extrabold text-[#5d430f] break-words">
            {formatCOP(ingresoNeto)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
