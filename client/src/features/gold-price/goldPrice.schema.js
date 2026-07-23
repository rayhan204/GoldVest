import { z } from "zod";

export const goldPriceSchema = z.object({
  buyPrice: z.coerce
    .number({ invalid_type_error: "Harga beli harus berupa angka" })
    .positive("Harga beli harus lebih dari 0"),

  sellPrice: z.coerce
    .number({ invalid_type_error: "Harga jual harus berupa angka" })
    .positive("Harga jual harus lebih dari 0"),

  effectiveDate: z.string().min(1, "Tanggal wajib diisi"),
});
