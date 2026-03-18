"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type { Presupuesto } from "@/core/models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

const BLUE_MAIN = "#003E70";
const PIE_COLORS = ["#003E70", "#1D5D8F", "#4A7EA8", "#6A9ABE", "#9CBBD3"];

function formatMillionsCOP(value: number) {
  const millions = value / 1_000_000;
  return `${new Intl.NumberFormat("es-CO", {
    maximumFractionDigits: 1,
  }).format(millions)} M COP`;
}

function toNumber(value: unknown) {
  return typeof value === "number" ? value : Number(value ?? 0);
}

interface PresupuestoChartsProps {
  data: Presupuesto[];
}

export function PresupuestoCharts({ data }: PresupuestoChartsProps) {
  const ingresosPorPrograma = useMemo(() => {
    const grouped = data.reduce<Record<string, number>>((acc, item) => {
      acc[item.programa] = (acc[item.programa] ?? 0) + item.ingresoNeto;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([programa, ingresoNeto]) => ({ programa, ingresoNeto }))
      .sort((a, b) => b.ingresoNeto - a.ingresoNeto);
  }, [data]);

  const estudiantesPorMunicipio = useMemo(() => {
    const grouped = data.reduce<Record<string, number>>((acc, item) => {
      acc[item.municipio] = (acc[item.municipio] ?? 0) + item.numEstudiantes;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([municipio, estudiantes]) => ({ municipio, estudiantes }))
      .sort((a, b) => b.estudiantes - a.estudiantes);
  }, [data]);

  const isEmpty = data.length === 0;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-[#003e70] text-xs uppercase tracking-wide">
            Ingreso Neto por Programa
          </CardTitle>
          <p className="text-[11px] text-slate-500">
            (Valores netos tras descuentos de ley, expresados en millones de
            pesos COP)
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[320px] w-full min-w-0">
            {isEmpty ? (
              <div className="h-full flex items-center justify-center text-sm text-gray-500">
                No hay datos para graficar con los filtros actuales.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ingresosPorPrograma}
                  margin={{ top: 12, right: 8, left: 0, bottom: 48 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="programa"
                    angle={-20}
                    textAnchor="end"
                    interval={0}
                    tick={{ fontSize: 11, fill: "#475569" }}
                  />
                  <YAxis
                    tickFormatter={formatMillionsCOP}
                    tick={{ fontSize: 11, fill: "#475569" }}
                  />
                  <Tooltip
                    formatter={(value) =>
                      new Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0,
                      }).format(toNumber(value))
                    }
                  />
                  <Bar
                    dataKey="ingresoNeto"
                    fill={BLUE_MAIN}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-[#003e70] text-xs uppercase tracking-wide">
            Estudiantes por Municipio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[320px] w-full min-w-0">
            {isEmpty ? (
              <div className="h-full flex items-center justify-center text-sm text-gray-500">
                No hay datos para graficar con los filtros actuales.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={estudiantesPorMunicipio}
                    dataKey="estudiantes"
                    nameKey="municipio"
                    cx="50%"
                    cy="45%"
                    outerRadius={95}
                    innerRadius={50}
                    paddingAngle={3}
                    label
                  >
                    {estudiantesPorMunicipio.map((item, index) => (
                      <Cell
                        key={item.municipio}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) =>
                      toNumber(value).toLocaleString("es-CO")
                    }
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
