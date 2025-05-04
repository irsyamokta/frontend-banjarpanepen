import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { articleSchema } from "../../utils/validator/articleValidator";
import { createArticle, updateArticle } from "../../services/articleService";

import { IArticlePayload } from "../../types";

import { Modal } from "../ui/modal";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import Label from "../form/Label";
import Button from "../ui/button/Button";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ModalArticleFormProps {
    mutateData: () => void;
    initialData?: IArticlePayload | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalArticleForm = ({
    mutateData,
    initialData,
    isOpen,
    onClose,
}: ModalArticleFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<z.infer<typeof articleSchema>>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            title: "",
            content: "",
            writer: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                title: initialData.title,
                content: initialData.content,
                writer: initialData.writer,
            });
        } else {
            reset({
                title: "",
                content: "",
                writer: "",
            });
        }

        setImageFile(null);
    }, [initialData, reset]);

    const onSubmit = async (data: z.infer<typeof articleSchema>) => {
        try {
            if (!initialData && !imageFile) {
                onClose();
                toast.error("Thumbnail tidak boleh kosong!");
                return;
            }

            setIsLoading(true);

            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("content", data.content);
            formData.append("writer", data.writer);
            if (imageFile) {
                formData.append("file", imageFile);
            }

            if (initialData) {
                await updateArticle(initialData.id, formData);
                toast.success("Artikel berhasil diperbarui!");
            } else {
                await createArticle(formData);
                toast.success("Artikel berhasil ditambahkan!");
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
            <div className="no-scrollbar relative w-full max-w-[700px] max-h-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <h4 className="text-2xl font-semibold mb-4">
                    {initialData ? "Edit Artikel" : "Buat Artikel"}
                </h4>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label>Thumbnail</Label>
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
                        <Label>Judul Artikel</Label>
                        <Input {...register("title")} placeholder="Masukkan judul artikel" />
                        {errors.title && <p className="text-sm text-red-500 mt-2">{errors.title.message}</p>}
                    </div>

                    <div>
                        <Label>Konten</Label>
                        <Controller
                            control={control}
                            name="content"
                            render={({ field }) => (
                                <TextArea
                                    {...field}
                                    rows={4}
                                    error={!!errors.content}
                                    hint={errors.content?.message}
                                />
                            )}
                        />
                    </div>

                    <div>
                        <Label>Nama Penulis</Label>
                        <Input {...register("writer")} placeholder="Masukkan nama penulis" />
                        {errors.writer && <p className="text-sm text-red-500 mt-2">{errors.writer.message}</p>}
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