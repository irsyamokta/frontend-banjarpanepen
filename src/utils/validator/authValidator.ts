import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string({ required_error: "Email wajib diisi" })
        .email("Format email tidak valid"),
    password: z
        .string({ required_error: "Kata sandi wajib diisi" })
        .min(8, "Kata sandi minimal 8 karakter")
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
            "Kata sandi harus mengandung huruf besar, huruf kecil dan angka"
        ),
});

export const registerSchema = z
    .object({
        name: z
            .string({ required_error: "Nama wajib diisi" })
            .min(3, "Nama minimal terdiri dari 3 karakter"),
        email: z
            .string({ required_error: "Email wajib diisi" })
            .email("Format email tidak valid"),
        password: z
            .string({ required_error: "Kata sandi wajib diisi" })
            .min(8, "Kata sandi minimal 8 karakter")
            .regex(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
                "Kata sandi harus mengandung huruf besar, huruf kecil, dan angka"
            ),
        passwordConfirmation: z
            .string({ required_error: "Konfirmasi kata sandi wajib diisi" })
            .min(8, "Konfirmasi kata sandi minimal 8 karakter")
            .regex(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
                "Konfirmasi kata sandi harus mengandung huruf besar, huruf kecil, dan angka"
            ),
        birthDate: z
            .string({ required_error: "Tanggal lahir wajib diisi" })
            .refine(
                (val) => !isNaN(Date.parse(val)),
                { message: "Tanggal lahir harus dalam format tanggal yang valid (ISO 8601)" }
            ),
        gender: z
            .string({ required_error: "Jenis kelamin wajib diisi" })
            .toUpperCase(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        path: ["passwordConfirmation"],
        message: "Konfirmasi kata sandi tidak cocok dengan kata sandi",
    });
