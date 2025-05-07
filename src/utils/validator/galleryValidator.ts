import { z } from "zod";

export const gallerySchema = z.object({
    title: z.string()
        .nonempty({ message: "Judul tidak boleh kosong!" })
        .min(3, { message: "Judul minimal harus 3 karakter!" })
        .max(100, { message: "Judul maksimal 100 karakter!" }),

    caption: z.string()
        .nonempty({ message: "Caption tidak boleh kosong!" })
        .min(3, { message: "Caption minimal harus 3 karakter!" })
        .max(50, { message: "Caption maksimal 50 karakter!" }),
});