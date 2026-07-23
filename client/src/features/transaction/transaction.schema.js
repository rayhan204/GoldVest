import { z } from "zod";

export const tradeGramSchema = z.object({
  gram: z.coerce
    .number({ invalid_type_error: "Berat harus berupa angka" })
    .positive("Berat emas harus lebih dari 0")
    .max(1000, "Berat emas terlalu besar"),
});
