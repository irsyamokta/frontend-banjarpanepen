import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string()
        .nonempty({ message: "Nama lengkap wajib diisi." })
        .max(255, { message: "Nama lengkap maksimal 255 karakter." }),
    email: z.string()
        .nonempty({ message: "Email wajib diisi." })
        .email({ message: "Format email tidak valid." }),
    phone: z.string()
        .nonempty({ message: "Nomor telepon wajib diisi." })
        .regex(/^\+?\d{10,15}$/, { message: "Nomor telepon tidak valid (10-15 digit)." }),
    role: z.string()
        .nonempty({ message: "Role wajib diisi." })
        .min(3, { message: "Role minimal terdiri dari 3 karakter." })
        .max(50, { message: "Role maksimal terdiri dari 50 karakter." }),
    password: z.string()
        .nonempty({ message: "Kata sandi wajib diisi." })
        .min(8, { message: "Kata sandi minimal terdiri dari 8 karakter." })
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
            "Kata sandi harus mengandung huruf besar, huruf kecil, dan angka"
        ),
});

export const updateUserSchema = z.object({
    name: z.string()
        .nonempty({ message: "Nama lengkap wajib diisi." })
        .max(255, { message: "Nama lengkap maksimal 255 karakter." }),
    email: z.string()
        .nonempty({ message: "Email wajib diisi." })
        .email({ message: "Format email tidak valid." }),
    phone: z.string()
        .nonempty({ message: "Nomor telepon wajib diisi." })
        .regex(/^\+?\d{10,15}$/, { message: "Nomor telepon tidak valid (10-15 digit)." }),
    role: z.string()
        .nonempty({ message: "Role wajib diisi." })
        .min(3, { message: "Role minimal terdiri dari 3 karakter." })
        .max(50, { message: "Role maksimal terdiri dari 50 karakter." }),
    password: z
        .union([
            z.literal(""),
            z.string()
                .min(8, { message: "Kata sandi minimal terdiri dari 8 karakter." })
                .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
                    message: "Kata sandi harus mengandung huruf besar, huruf kecil, dan angka",
                }),
        ])
        .optional(),
});