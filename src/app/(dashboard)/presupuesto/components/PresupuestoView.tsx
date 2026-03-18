"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button, Card, Dialog, Input, Select } from "@/components/ui";
import { usePresupuestoStore } from "@/store";
import { FormularioPresupuesto } from "./FormularioPresupuesto";
import { PresupuestoCharts } from "./PresupuestoCharts";
import { PresupuestoKpis } from "./PresupuestoKpis";

const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function formatCOP(value: number) {
  return copFormatter.format(value);
}

export function PresupuestoView() {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [municipioFilter, setMunicipioFilter] = useState("Todos");
  const [cohorteFilter, setCohorteFilter] = useState("Todos");
  const presupuestos = usePresupuestoStore((state) => state.presupuestos);

  const filteredData = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const normalizedMunicipio = municipioFilter.toLowerCase();
    const normalizedCohorte = cohorteFilter.toLowerCase();

    return presupuestos.filter((item) => {
      const programaOk = item.programa.toLowerCase().includes(normalizedSearch);
      const municipioOk =
        municipioFilter === "Todos" ||
        item.municipio.toLowerCase() === normalizedMunicipio;
      const cohorteOk =
        cohorteFilter === "Todos" ||
        item.cohorte.toLowerCase().includes(normalizedCohorte);

      return programaOk && municipioOk && cohorteOk;
    });
  }, [cohorteFilter, municipioFilter, presupuestos, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Gestión de Presupuestos
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Datos presupuestales consolidados de la Universidad de Caldas.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setOpenDialog(true)}
          leftIcon={<Plus size={16} />}
        >
          Agregar Presupuesto
        </Button>
      </div>

      <PresupuestoKpis data={filteredData} />

      <Card className="p-4 bg-slate-50/70 border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            label="Programa"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Buscar programa..."
            leftIcon={<Search size={16} />}
          />

          <Select
            label="Municipio"
            value={municipioFilter}
            onChange={(event) => setMunicipioFilter(event.target.value)}
            options={[
              { value: "Todos", label: "Todos" },
              { value: "Manizales", label: "Manizales" },
              { value: "Dorada", label: "La Dorada" },
              { value: "Anserma", label: "Anserma" },
              { value: "Aguadas", label: "Aguadas" },
            ]}
          />

          <Select
            label="Cohorte"
            value={cohorteFilter}
            onChange={(event) => setCohorteFilter(event.target.value)}
            options={[
              { value: "Todos", label: "Todas" },
              { value: "Antiguos", label: "Antiguos" },
              { value: "2024-2", label: "2024-2" },
              { value: "2025-1", label: "2025-1" },
            ]}
          />
        </div>

        <p className="mt-3 text-sm text-slate-600">
          Mostrando{" "}
          <span className="font-semibold text-slate-900">
            {filteredData.length}
          </span>{" "}
          de{" "}
          <span className="font-semibold text-slate-900">
            {presupuestos.length}
          </span>{" "}
          registros.
        </p>
      </Card>

      <PresupuestoCharts data={filteredData} />

      <Card className="border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Programa
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Periodo
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Municipio
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Estudiantes
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Valor Matricula
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Ingreso
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Descuento Votacion
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Descuentos
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Ingreso Neto
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="px-4 py-3 text-slate-800">{item.programa}</td>
                  <td className="px-4 py-3 text-slate-700 whitespace-nowrap">
                    {item.cohorte}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{item.municipio}</td>
                  <td className="px-4 py-3 text-right text-slate-700">
                    {item.numEstudiantes}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700">
                    {formatCOP(item.valorMatricula)}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700">
                    {formatCOP(item.ingreso)}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700">
                    {formatCOP(item.descuentoVotacion)}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700">
                    {formatCOP(item.descuentos)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">
                    {formatCOP(item.ingresoNeto)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog
        open={openDialog}
        title="Nuevo Presupuesto"
        onClose={() => setOpenDialog(false)}
      >
        <FormularioPresupuesto onSuccess={() => setOpenDialog(false)} />
      </Dialog>
    </div>
  );
}
