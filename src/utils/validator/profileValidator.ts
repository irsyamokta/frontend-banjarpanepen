import { z } from "zod";

export const updateProfileValidator = z.object({
    name: z
        .string()
        .min(3, { message: "Nama minimal harus 3 karakter!" })
        .max(50, { message: "Nama maksimal 50 karakter!" })
        .nonempty({ message: "Nama tidak boleh kosong!" }),

    email: z
        .string()
        .email({ message: "Format email tidak valid!" })
        .nonempty({ message: "Email tidak boleh kosong!" }),

    birthDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal lahir tidak valid (YYYY-MM-DD)"),


    gender: z
        .enum(["MALE", "FEMALE"], {
            errorMap: () => ({ message: "Jenis kelamin tidak valid! Harus MALE atau FEMALE." }),
        })
});