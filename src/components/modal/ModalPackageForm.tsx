import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Modal } from "../ui/modal";
import { packageSchema } from "../../utils/validator/packageValidator";
import { createPackage, updatePackage } from "../../services/packageService";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IPackagePayload } from "../../types";

interface ModalPackageFormProps {
    mutateData: () => void;
    initialData?: IPackagePayload | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalPackageForm = ({
    mutateData,
    initialData,
    isOpen,
    onClose,
}: ModalPackageFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof packageSchema>>({
        resolver: zodResolver(packageSchema),
        defaultValues: {
            title: "",
            price: 0,
            benefit: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                title: initialData.title,
                price: initialData.price,
                benefit: initialData.benefit,
            });
        } else {
            reset({
                title: "",
                price: 0,
                benefit: "",
            });
        }

        setImageFile(null);
    }, [initialData, reset]);

    const onSubmit = async (data: z.infer<typeof packageSchema>) => {
        try {
            if (!initialData && !imageFile) {
                onClose();
                toast.error("Thumbnail tidak boleh kosong!");
                return;
            }

            setIsLoading(true);

            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("price", data.price.toString());
            formData.append("benefit", data.benefit);
            if (imageFile) {
                formData.append("file", imageFile);
            }

            if (initialData) {
                await updatePackage(initialData.id, formData);
                toast.success("Paket berhasil diperbarui!");
            } else {
                await createPackage(formData);
                toast.success("Paket wisata berhasil ditambahkan!");
            }

            mutateData();
            onClose();
            setImageFile(null);
        } catch (error) {
            if (error instanceof AxiosError) {
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
                    {initialData ? "Edit Paket Wisata" : "Buat Paket Wisata"}
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
                        <Label>Nama Paket Wisata</Label>
                        <Input {...register("title")} />
                        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                    </div>

                    <div>
                        <Label>Harga Paket Wisata</Label>
                        <Input type="number" className="no-spinner" min={0} {...register("price", { valueAsNumber: true })} />
                        {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                    </div>

                    <div>
                        <Label>Benefit</Label>
                        <Input {...register("benefit")} />
                        {errors.benefit && <p className="text-sm text-red-500">{errors.benefit.message}</p>}
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
