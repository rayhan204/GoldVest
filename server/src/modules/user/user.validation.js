import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name minimal 3 karakter"),

  phone: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit")
    .optional(),
});

export const updatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Password minimal 6 karakter"),

  newPassword: z
  .string()
  .min(8, "Password minimal 8 karakter")
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d).+$/,
    "Password harus mengandung huruf dan angka"
  )
});