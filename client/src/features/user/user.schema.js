import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().min(3, "Nama minimal 3 karakter"),

  phone: z
    .string()
    .optional()
    .refine((val) => !val || (val.length >= 10 && val.length <= 15), {
      message: "Nomor telepon 10-15 digit",
    }),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Password minimal 6 karakter"),

    newPassword: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "Harus mengandung huruf dan angka"),

    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Konfirmasi password tidak sama",
    path: ["confirmNewPassword"],
  });
