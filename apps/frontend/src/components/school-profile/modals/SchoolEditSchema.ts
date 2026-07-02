import { z } from "zod";

export const schoolEditSchema = z.object({
  type: z.enum(["Школа", "Садочок"]),
  address: z.string().optional().default(""),
  director: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  email: z
    .union([z.literal(""), z.string().email("Некоректний email")])
    .optional(),
  childrenCount: z
    .string()
    .optional()
    .default("")
    .refine((v) => v === "" || Number(v) >= 0, "Некоректна кількість"),
});

export type SchoolEditFormValues = z.infer<typeof schoolEditSchema>;
