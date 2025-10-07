import { z } from "zod";

export const ticketSchema = z.object({
    title: z.string()
        .nonempty({ message: "Judul tiket wajib diisi." })
        .max(255, { message: "Judul tiket maksimal 255 karakter." }),
    description: z.string()
        .nonempty({ message: "Deskripsi tiket wajib diisi." }),
    location: z.string()
        .nonempty({ message: "Lokasi tiket wajib diisi." }),
    price: z.number()
        .nonnegative({ message: "Harga tiket tidak boleh negatif." }),
});