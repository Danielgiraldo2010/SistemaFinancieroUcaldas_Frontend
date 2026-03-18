import { z } from "zod";

export const presupuestoFormSchema = z.object({
  programa: z.string().min(1, "El programa es obligatorio"),
  municipio: z.string().min(1, "El municipio es obligatorio"),
  cohorte: z.string().min(1, "La cohorte es obligatoria"),
  numEstudiantes: z
    .number({ message: "Ingresa un numero valido" })
    .positive("Debe ser mayor a 0"),
  valorMatricula: z
    .number({ message: "Ingresa un numero valido" })
    .positive("Debe ser mayor a 0"),
});

export type PresupuestoFormValues = z.infer<typeof presupuestoFormSchema>;
