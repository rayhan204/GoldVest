import { z } from "zod";

export const walletAmountSchema = z.object({
  amount: z.coerce
    .number({ invalid_type_error: "Nominal harus berupa angka" })
    .min(10000, "Minimal transaksi Rp10.000"),
});
