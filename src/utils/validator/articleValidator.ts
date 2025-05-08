import { z } from "zod";

export const articleSchema = z.object({
    title: z.string()
        .nonempty({ message: "Judul tidak boleh kosong!" })
        .min(3, { message: "Judul minimal harus 3 karakter!" })
        .max(100, { message: "Judul maksimal 100 karakter!" }),

    content: z.string()
        .nonempty({ message: "Konten tidak boleh kosong!" })
        .min(3, { message: "Konten minimal harus 3 karakter!" }),

    writer: z.string()
        .nonempty({ message: "Nama penulis tidak boleh kosong!" })
        .min(3, { message: "Nama penulis minimal harus 3 karakter!" }),
});