import { z } from "zod";

export const goldPriceSchema = z.object({
  buyPrice: z
    .number({
      required_error: "Buy price is required",
    })
    .positive("Buy price must be greater than 0"),

  sellPrice: z
    .number({
      required_error: "Sell price is required",
    })
    .positive("Sell price must be greater than 0"),

  effectiveDate: z.coerce.date(),
});