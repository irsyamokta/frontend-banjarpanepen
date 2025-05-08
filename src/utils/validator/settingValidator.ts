import { z } from "zod";

export const settingSchema = z.object({
    name: z.string()
        .nonempty({ message: "Judul tidak boleh kosong!" })
        .min(3, { message: "Judul minimal harus 3 karakter!" })
        .max(100, { message: "Judul maksimal 100 karakter!" }),

    category: z.string()
        .nonempty({ message: "Caption tidak boleh kosong!" })
        .min(3, { message: "Caption minimal harus 3 karakter!" })
        .max(50, { message: "Caption maksimal 50 karakter!" }),
});