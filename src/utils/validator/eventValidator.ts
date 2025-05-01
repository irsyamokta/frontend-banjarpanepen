import { z } from "zod";

export const eventSchema = z.object({
    title: z.string()
        .min(3, { message: "Judul minimal harus 3 karakter!" })
        .max(100, { message: "Judul maksimal 100 karakter!" }),

    description: z.string()
        .min(3, { message: "Deskripsi minimal harus 3 karakter!" }),

    date: z.string()
        .refine(
            (val) => {
                const now = new Date();
                const inputDate = new Date(val);
                return !isNaN(inputDate.getTime()) && inputDate >= new Date(now.toDateString());
            },
            { message: "Tanggal harus dalam format YYYY-MM-DD dan tidak boleh di masa lalu!" }
        ),

    time: z.string()
        .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
            message: "Waktu harus dalam format HH:mm (24 jam)!"
        }),

    place: z.string()
        .min(3, { message: "Tempat minimal harus 3 karakter!" }),

    price: z
        .number({ invalid_type_error: "Harga harus berupa angka!" })
        .min(3, { message: "Harga minimal adalah 3!" })
        .optional()
});