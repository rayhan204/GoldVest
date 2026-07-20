import { z } from "zod";

export const walletSchema = z.object({
  amount: z
    .number({
      required_error: "Amount wajib diisi",
      invalid_type_error: "Amount harus berupa angka",
    })
    .min(10000, "Minimal transaksi Rp10.000"),
});