import { z } from "zod";

export const registerSchema = z.object({
    fullName: z
        .string()
        .min(3, "Nama minimal 3 karakter"),

    email: z
        .email("Format email tidak valid"),

    password: z
        .string()
        .min(8, "Password minimal 8 karakter"),

    confirmPassword: z
        .string()
})
.refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Password tidak sama",
        path: ["confirmPassword"],
    }
);