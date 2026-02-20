import { z } from 'zod';

<<<<<<< HEAD
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
=======
export const loginSchema = z.object({
  email: z.string()
    .email('El formato del correo no es válido')
    .min(1, 'El correo es obligatorio'),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .min(1, 'La contraseña es obligatoria'),
});

// Esto exporta el tipo de datos para que TypeScript lo reconozca en todo el proyecto
>>>>>>> 76b9cdc (feat(auth): merge login UI con rama feat/login)
export type LoginDTO = z.infer<typeof loginSchema>;