import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { gallerySchema } from "../../utils/validator/galleryValidator";
import { createGallery, updateGallery } from "../../services/galleryService";

import { IGalleryPayload } from "../../types";

import { Modal } from "../ui/modal";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ModalGalleryFormProps {
    mutateData: () => void;
    initialData?: IGalleryPayload | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalGalleryForm = ({
    mutateData,
    initialData,
    isOpen,
    onClose,
}: ModalGalleryFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof gallerySchema>>({
        resolver: zodResolver(gallerySchema),
        defaultValues: {
            title: "",
            caption: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                title: initialData.title,
                caption: initialData.caption,
            });
        } else {
            reset({
                title: "",
                caption: "",
            });
        }

        setImageFile(null);
    }, [initialData, reset]);

    const onSubmit = async (data: z.infer<typeof gallerySchema>) => {
        try {
            if (!initialData && !imageFile) {
                onClose();
                toast.error("Foto tidak boleh kosong!");
                return;
            }

            setIsLoading(true);

            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("caption", data.caption);
            if (imageFile) {
                formData.append("file", imageFile);
            }

            if (initialData) {
                await updateGallery(initialData.id, formData);
                toast.success("Galeri berhasil diperbarui!");
            } else {
                await createGallery(formData);
                toast.success("Foto galeri berhasil ditambahkan!");
                reset();
            }

            mutateData();
            onClose();
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
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl">
                <h4 className="text-2xl font-semibold mb-4">
                    {initialData ? "Edit Foto Galeri" : "Tambah Foto Galeri"}
                </h4>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label>Foto</Label>
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
                        <Label>Judul Foto</Label>
                        <Input {...register("title")} placeholder="Masukkan judul foto" />
                        {errors.title && <p className="text-sm text-red-500 mt-2">{errors.title.message}</p>}
                    </div>

                    <div>
                        <Label>Caption</Label>
                        <Input {...register("caption")} placeholder="Masukkan caption" />
                        {errors.caption && <p className="text-sm text-red-500 mt-2">{errors.caption.message}</p>}
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
};