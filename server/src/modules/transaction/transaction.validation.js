import { z } from "zod";

export const transactionSchema = z.object({
  gram: z
    .number({
      required_error: "Gram is required",
    })
    .positive("Gram must be greater than zero"),
});

import { z } from "zod";

export const buyGoldSchema = z.object({
  gram: z
    .number({
      required_error: "Gram is required",
      invalid_type_error: "Gram must be a number",
    })
    .positive("Gram must be greater than zero"),
});

export const sellGoldSchema = z.object({
  gram: z
    .number({
      required_error: "Gram is required",
      invalid_type_error: "Gram must be a number",
    })
    .positive("Gram must be greater than zero"),
});