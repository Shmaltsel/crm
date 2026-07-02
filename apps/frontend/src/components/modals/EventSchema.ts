import { z } from "zod";

export const eventSchema = z.object({
  project: z.string().min(1, "Оберіть вид події"),
  date: z.string().min(1, "Вкажіть дату"),
  time: z.string().min(1, "Вкажіть час"),
  childrenPlanned: z
    .string()
    .min(1, "Вкажіть кількість дітей")
    .refine((v) => Number(v) > 0, "Має бути більше нуля"),
  price: z
    .string()
    .min(1, "Вкажіть вартість")
    .refine((v) => Number(v) >= 0, "Некоректна вартість"),
  address: z.string().optional().default(""),
  contactPerson: z.string().optional().default(""),
  contactPhone: z.string().optional().default(""),
});

export type EventFormValues = z.infer<typeof eventSchema>;
