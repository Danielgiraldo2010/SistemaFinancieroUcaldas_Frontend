"use client";

import { useMemo, useState } from "react";
import { Download, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { Presupuesto } from "@/core/models";
import {
  AlertDialog,
  Button,
  Card,
  Dialog,
  Input,
  Select,
} from "@/components/ui";
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
  const [editingPresupuesto, setEditingPresupuesto] =
    useState<Presupuesto | null>(null);
  const [deletingPresupuesto, setDeletingPresupuesto] =
    useState<Presupuesto | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [municipioFilter, setMunicipioFilter] = useState("Todos");
  const [cohorteFilter, setCohorteFilter] = useState("Todos");
  const presupuestos = usePresupuestoStore((state) => state.presupuestos);
  const deletePresupuesto = usePresupuestoStore(
    (state) => state.deletePresupuesto,
  );

  const onCreate = () => {
    setEditingPresupuesto(null);
    setOpenDialog(true);
  };

  const onEdit = (item: Presupuesto) => {
    setEditingPresupuesto(item);
    setOpenDialog(true);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
    setEditingPresupuesto(null);
  };

  const onConfirmDelete = () => {
    if (!deletingPresupuesto) return;
    deletePresupuesto(deletingPresupuesto.id);
    setDeletingPresupuesto(null);
  };

  const onDownloadPdf = () => {
    if (presupuestos.length === 0) return;

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    const fechaGeneracion = new Date().toLocaleString("es-CO");
    const totalIngresoNeto = presupuestos.reduce(
      (acc, item) => acc + item.ingresoNeto,
      0,
    );

    doc.setFontSize(16);
    doc.text("Reporte General de Presupuestos", 40, 40);
    doc.setFontSize(10);
    doc.text(`Generado: ${fechaGeneracion}`, 40, 58);
    doc.text(`Registros: ${presupuestos.length}`, 40, 72);

    autoTable(doc, {
      startY: 86,
      head: [
        [
          "Programa",
          "Periodo",
          "Municipio",
          "Estudiantes",
          "Valor Matricula",
          "Ingreso",
          "Descuento Votacion",
          "Descuentos",
          "Ingreso Neto",
        ],
      ],
      body: presupuestos.map((item) => [
        item.programa,
        item.cohorte,
        item.municipio,
        item.numEstudiantes.toLocaleString("es-CO"),
        formatCOP(item.valorMatricula),
        formatCOP(item.ingreso),
        formatCOP(item.descuentoVotacion),
        formatCOP(item.descuentos),
        formatCOP(item.ingresoNeto),
      ]),
      headStyles: {
        fillColor: [0, 62, 112],
      },
      styles: {
        fontSize: 8,
        cellPadding: 4,
      },
      columnStyles: {
        3: { halign: "right" },
        4: { halign: "right" },
        5: { halign: "right" },
        6: { halign: "right" },
        7: { halign: "right" },
        8: { halign: "right" },
      },
    });

    const finalY =
      (doc as jsPDF & { lastAutoTable?: { finalY?: number } }).lastAutoTable
        ?.finalY ?? 86;

    doc.setFontSize(11);
    doc.text(
      `Total Ingreso Neto: ${formatCOP(totalIngresoNeto)}`,
      40,
      finalY + 20,
    );

    const fecha = new Date().toISOString().slice(0, 10);
    doc.save(`presupuesto-completo-${fecha}.pdf`);
  };

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

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onDownloadPdf}
            leftIcon={<Download size={16} />}
            disabled={presupuestos.length === 0}
          >
            Descargar PDF
          </Button>
          <Button
            type="button"
            onClick={onCreate}
            leftIcon={<Plus size={16} />}
          >
            Agregar Presupuesto
          </Button>
        </div>
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
                <th className="px-4 py-3 text-center font-semibold text-slate-700">
                  Acciones
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
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        aria-label={`Editar ${item.programa}`}
                        className="inline-flex items-center justify-center rounded-lg border border-slate-300 p-2 text-slate-700 hover:bg-slate-100"
                        onClick={() => onEdit(item)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Eliminar ${item.programa}`}
                        className="inline-flex items-center justify-center rounded-lg border border-red-300 p-2 text-red-700 hover:bg-red-50"
                        onClick={() => setDeletingPresupuesto(item)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog
        open={openDialog}
        title={editingPresupuesto ? "Editar Presupuesto" : "Nuevo Presupuesto"}
        onClose={onCloseDialog}
      >
        <FormularioPresupuesto
          presupuesto={editingPresupuesto}
          onSuccess={onCloseDialog}
        />
      </Dialog>

      <AlertDialog
        open={Boolean(deletingPresupuesto)}
        title="Confirmar eliminacion"
        description={
          deletingPresupuesto
            ? `Vas a eliminar el presupuesto de ${deletingPresupuesto.programa} (${deletingPresupuesto.cohorte}). Esta accion no se puede deshacer.`
            : undefined
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        onCancel={() => setDeletingPresupuesto(null)}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
}
