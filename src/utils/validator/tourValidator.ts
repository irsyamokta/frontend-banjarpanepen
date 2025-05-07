import { z } from "zod";

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const tourSchema = z.object({
    title: z.string()
        .nonempty({ message: "Judul tidak boleh kosong!" })
        .min(3, { message: "Judul minimal harus 3 karakter!" })
        .max(100, { message: "Judul maksimal 100 karakter!" }),

    about: z.string()
        .nonempty({ message: "Tentang tidak boleh kosong!" })
        .min(3, { message: "Tentang minimal harus 3 karakter!" }),

    operational: z.array(
        z.string())
        .min(1, { message: "Operasional minimal harus ada 1 untuk dipilih!" }),
    
    location: z.string()
        .nonempty({ message: "Lokasi tidak boleh kosong!" })
        .min(3, { message: "Lokasi minimal harus 3 karakter!" }),

    start: z.string()
        .nonempty({ message: "Jam mulai tidak boleh kosong!" })
        .regex(timePattern, { message: "Format jam mulai harus HH:mm (contoh: 08:00)" }),

    end: z.string()
        .nonempty({ message: "Jam selesai tidak boleh kosong!" })
        .regex(timePattern, { message: "Format jam selesai harus HH:mm (contoh: 17:00)" }),

    facility: z.array(
        z.string())
        .min(1, { message: "Fasilitas minimal harus ada 1 untuk dipilih!" }),

    maps: z.string().optional(),

    price: z.number()
        .nonnegative({ message: "Harga tidak boleh negatif!" })
        .min(10000, { message: "Harga minimal adalah 10000!" })
}).superRefine((data, ctx) => {
    const [startHour, startMinute] = data.start.split(":").map(Number);
    const [endHour, endMinute] = data.end.split(":").map(Number);

    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    if (startTime >= endTime) {
        ctx.addIssue({
            path: ["end"],
            code: z.ZodIssueCode.custom,
            message: "Jam selesai harus lebih besar dari jam mulai!",
        });
    }
});
