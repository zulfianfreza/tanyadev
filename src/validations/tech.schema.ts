import { z } from "zod";

export const getTechSchema = z.object({
  id: z.string(),
});

export type GetTechSchema = z.infer<typeof getTechSchema>;
