import { z } from 'zod';

// Definimos las reglas según la arquitectura
export const loginSchema = z.object({
  email: z.string()
    .email("El correo electrónico no es válido")
    .nonempty("El correo es obligatorio"),
  password: z.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .nonempty("La contraseña es obligatoria"),
});

// Este tipo de dato lo usaremos en toda la App
export type LoginDTO = z.infer<typeof loginSchema>;