import { z } from "zod";

export const packageSchema = z.object({
    title: z.string()
        .min(3, { message: "Judul minimal harus 3 karakter!" })
        .max(100, { message: "Judul maksimal 100 karakter!" }),

    price: z.number({
        required_error: "Harga tidak boleh kosong!",
        invalid_type_error: "Harga harus berupa angka!"
    }).min(3, { message: "Harga minimal adalah 3!" }),

    benefit: z.string()
        .min(3, { message: "Benefit minimal harus 3 karakter!" })
        .nonempty({ message: "Benefit tidak boleh kosong!" }),
});