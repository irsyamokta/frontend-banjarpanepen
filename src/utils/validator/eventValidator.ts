import { z } from "zod";

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const eventSchema = z.object({
    title: z.string()
        .nonempty({ message: "Judul tidak boleh kosong!" })
        .min(3, { message: "Judul minimal harus 3 karakter!" })
        .max(100, { message: "Judul maksimal 100 karakter!" }),

    description: z.string()
        .nonempty({ message: "Deskripsi tidak boleh kosong!" })
        .min(3, { message: "Deskripsi minimal harus 3 karakter!" }),

    date: z.string()
        .nonempty({ message: "Tanggal tidak boleh kosong!" })
        .refine(
            (val) => {
                const now = new Date();
                const inputDate = new Date(val);
                return !isNaN(inputDate.getTime()) && inputDate >= new Date(now.toDateString());
            },
            { message: "Tanggal harus dalam format YYYY-MM-DD dan tidak boleh di masa lalu!" }
        ),

    time: z.string()
        .nonempty({ message: "Jam mulai tidak boleh kosong!" })
        .regex(timePattern, { message: "Format jam mulai harus HH:mm (contoh: 08:00)" }),

    place: z.string()
        .nonempty({ message: "Tempat tidak boleh kosong!" })
        .min(3, { message: "Tempat minimal harus 3 karakter!" }),

    price: z
        .number({ invalid_type_error: "Harga harus berupa angka!" })
        .min(0, { message: "Harga minimal adalah 0!" })
        .optional()
});