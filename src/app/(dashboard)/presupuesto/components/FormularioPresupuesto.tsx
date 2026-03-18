"use client";

import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui";
import { usePresupuestoStore } from "@/store/usePresupuestoStore";
import type { Presupuesto } from "@/core/models";
import {
  presupuestoFormSchema,
  type PresupuestoFormValues,
} from "@/core/models/presupuesto.schema";

interface FormularioPresupuestoProps {
  onSuccess?: () => void;
}

export function FormularioPresupuesto({
  onSuccess,
}: FormularioPresupuestoProps) {
  const { addPresupuesto, presupuestos } = usePresupuestoStore();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PresupuestoFormValues>({
    resolver: zodResolver(presupuestoFormSchema),
    defaultValues: {
      programa: "",
      municipio: "",
      cohorte: "",
      numEstudiantes: 1,
      valorMatricula: 1,
    },
  });

  const numEstudiantes = useWatch({ control, name: "numEstudiantes" }) ?? 0;
  const valorMatricula = useWatch({ control, name: "valorMatricula" }) ?? 0;
  const descuentoVotacion = Math.round(valorMatricula * 0.1);
  const ingresoNeto = useMemo(() => {
    if (numEstudiantes <= 0 || valorMatricula <= 0) return 0;
    return (valorMatricula - descuentoVotacion) * numEstudiantes;
  }, [descuentoVotacion, numEstudiantes, valorMatricula]);

  const onSubmit = async (values: PresupuestoFormValues) => {
    const descuento = Math.round(values.valorMatricula * 0.1);
    const ingreso = values.valorMatricula * values.numEstudiantes;
    const descuentos = descuento * values.numEstudiantes;
    const normalizedBaseId =
      `${values.programa}-${values.municipio}-${values.cohorte}`
        .toLowerCase()
        .replace(/\s+/g, "-");

    const nuevo: Presupuesto = {
      id: `${normalizedBaseId}-${presupuestos.length + 1}`,
      programa: values.programa,
      municipio: values.municipio,
      cohorte: values.cohorte,
      numEstudiantes: values.numEstudiantes,
      valorMatricula: values.valorMatricula,
      ingreso,
      descuentoVotacion: descuento,
      descuentos,
      ingresoNeto: ingreso - descuentos,
    };

    addPresupuesto(nuevo);
    reset();
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Programa"
          placeholder="Ej: Ingenieria en Informatica"
          error={errors.programa?.message}
          {...register("programa")}
        />
        <Input
          label="Municipio"
          placeholder="Ej: Manizales"
          error={errors.municipio?.message}
          {...register("municipio")}
        />
        <Input
          label="Cohorte"
          placeholder="Ej: Cohorte 2026-1"
          error={errors.cohorte?.message}
          {...register("cohorte")}
        />
        <Input
          label="Numero de Estudiantes"
          type="number"
          min={1}
          error={errors.numEstudiantes?.message}
          {...register("numEstudiantes", { valueAsNumber: true })}
        />
        <Input
          label="Valor de Matricula"
          type="number"
          min={1}
          error={errors.valorMatricula?.message}
          {...register("valorMatricula", { valueAsNumber: true })}
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm">
        <p className="text-gray-700 m-0">
          <span className="font-semibold">Descuento votacion (10%):</span> ${" "}
          {descuentoVotacion.toLocaleString("es-CO")}
        </p>
        <p className="text-gray-900 font-semibold mt-1 mb-0">
          Ingreso neto calculado: ${ingresoNeto.toLocaleString("es-CO")}
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#003e70] hover:bg-[#002f56] text-white font-semibold rounded-xl px-5 py-2.5 transition-colors disabled:opacity-60"
        >
          {isSubmitting ? "Guardando..." : "Guardar Presupuesto"}
        </button>
      </div>
    </form>
  );
}
