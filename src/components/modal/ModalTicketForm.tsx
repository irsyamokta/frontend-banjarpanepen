import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { ticketSchema } from "../../utils/validator/ticketValidator";
import { createTicket, updateTicket } from "../../services/ticketService";

import { ITicketPayload } from "../../types";

import { Modal } from "../ui/modal";
import Input from "../form/input/InputField";
import CurrencyInput from "../form/input/CurrencyInput";
import TextArea from "../form/input/TextArea";
import Label from "../form/Label";
import Button from "../ui/button/Button";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ModalTicketFormProps {
    mutateData: () => void;
    initialData?: ITicketPayload | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalTicketForm = ({
    mutateData,
    initialData,
    isOpen,
    onClose,
}: ModalTicketFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<z.infer<typeof ticketSchema>>({
        resolver: zodResolver(ticketSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
            price: 0,
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                title: initialData.title,
                description: initialData.description,
                location: initialData.location,
                price: initialData.price,
            });
        } else {
            reset({
                title: "",
                description: "",
                location: "",
                price: 0,
            });
        }

        setImageFile(null);
    }, [initialData, reset]);

    const onSubmit = async (data: z.infer<typeof ticketSchema>) => {
        try {
            if (!initialData && !imageFile) {
                onClose();
                toast.error("Cover image tidak boleh kosong!");
                return;
            }

            setIsLoading(true);

            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("location", data.location);
            formData.append("price", data.price.toString());
            if (imageFile) {
                formData.append("file", imageFile);
            }

            if (initialData) {
                await updateTicket(initialData.id, formData);
                toast.success("Tiket berhasil diperbarui!");
            } else {
                await createTicket(formData);
                toast.success("Tiket berhasil ditambahkan!");
                reset();
            }

            mutateData();
            onClose();
            reset();
            setImageFile(null);
        } catch (error) {
            if (error instanceof AxiosError) {
                onClose();
                toast.error(error.response?.data.message || "Gagal menyimpan data.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-xs xsm:max-w-sm sm:max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] max-h-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <h4 className="text-2xl font-semibold mb-4">
                    {initialData ? "Edit Tiket" : "Tambah Tiket"}
                </h4>

                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
                            e.preventDefault();
                        }
                    }}
                >
                    <div>
                        <Label>Cover Image</Label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setImageFile(file);
                            }}
                            className="file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary/80"
                        />
                    </div>

                    <div>
                        <Label>Judul Tiket</Label>
                        <Input {...register("title")} placeholder="Masukkan judul tiket" />
                        {errors.title && <p className="text-sm text-red-500 mt-2">{errors.title.message}</p>}
                    </div>

                    <div>
                        <Label>Deskripsi</Label>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <TextArea
                                    {...field}
                                    rows={4}
                                    error={!!errors.description}
                                    hint={errors.description?.message}
                                />
                            )}
                        />
                        {errors.description && <p className="text-sm text-red-500 mt-2">{errors.description.message}</p>}
                    </div>

                    <div>
                        <Label>Lokasi</Label>
                        <Input {...register("location")} placeholder="Masukkan lokasi" />
                        {errors.location && <p className="text-sm text-red-500 mt-2">{errors.location.message}</p>}
                    </div>

                    <div>
                        <Label>Harga Tiket</Label>
                        <Controller
                            name="price"
                            control={control}
                            render={({ field }) => (
                                <CurrencyInput
                                    value={field.value}
                                    onChange={(val) => field.onChange(val)}
                                    placeholder="0"
                                />
                            )}
                        />
                        {errors.price && <p className="text-sm text-red-500 mt-2">{errors.price.message}</p>}
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                            Batal
                        </Button>
                        <Button type="submit" variant="default" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                                    Loading...
                                </>
                            ) : initialData ? "Simpan Perubahan" : "Simpan"}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}