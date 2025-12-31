import { z } from 'zod';

export const userSchema = z.object({
  id: z.string()
    .min(1, "El ID es obligatorio")
    .regex(/^\d+$/, "El ID solo puede contener números"),

  nombre: z.string()
    .min(1, "El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[\p{L}\s]+$/u, "El nombre solo puede contener letras"),

  sector: z.string()
    .min(1, "El sector es obligatorio")
    .regex(/^\d+$/, "El sector solo puede contener números"),

  estado: z.enum(["ACTIVO", "INACTIVO"], {
    message: "El estado debe ser Activo o Inactivo"
  }).default("ACTIVO")
});

export type UserFormData = z.infer<typeof userSchema>;