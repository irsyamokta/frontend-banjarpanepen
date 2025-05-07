import { z } from "zod";

export const packageSchema = z.object({
    title: z.string()
        .nonempty({ message: "Judul tidak boleh kosong!" })
        .min(3, { message: "Judul minimal harus 3 karakter!" })
        .max(100, { message: "Judul maksimal 100 karakter!" }),

    price: z.number({
        required_error: "Harga tidak boleh kosong!",
        invalid_type_error: "Harga harus berupa angka!"
    }).min(10000, { message: "Harga minimal adalah 10000!" }),

    benefit: z.array(
        z.string())
        .min(1, { message: "Benefit minimal harus ada 1 untuk dipilih!" })
});