import { z } from "zod";

export const updateProfileValidator = z.object({
    name: z
        .string()
        .nonempty({ message: "Nama tidak boleh kosong!" })
        .min(3, { message: "Nama minimal harus 3 karakter!" })
        .max(50, { message: "Nama maksimal 50 karakter!" }),

    email: z
        .string()
        .nonempty({ message: "Email tidak boleh kosong!" })
        .email({ message: "Format email tidak valid!" }),
});