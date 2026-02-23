import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string()
<<<<<<< HEAD
    .email('El correo electrónico no es válido')
=======
    .email('El formato del correo no es válido')
>>>>>>> 90bb156 (fix(auth): corrige service y validator en feat/login)
    .min(1, 'El correo es obligatorio'),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .min(1, 'La contraseña es obligatoria'),
});

export type LoginDTO = z.infer<typeof loginSchema>;