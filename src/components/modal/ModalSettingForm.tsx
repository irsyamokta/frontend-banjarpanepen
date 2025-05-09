import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { settingSchema } from "../../utils/validator/settingValidator";
import { createSetting, updateSetting } from "../../services/settingService";

import { ISettingPayload } from "../../types";

import { Modal } from "../ui/modal";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import Select from "../form/Select";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ModalSettingFormProps {
    mutateData: () => void;
    initialData?: ISettingPayload | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalSettingForm = ({
    mutateData,
    initialData,
    isOpen,
    onClose,
}: ModalSettingFormProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const options = [
        { value: "Benefit", label: "Benefit" },
        { value: "Fasilitas", label: "Fasilitas" },
    ];

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof settingSchema>>({
        resolver: zodResolver(settingSchema),
        defaultValues: {
            name: "",
            category: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name,
                category: initialData.category,
            });
        } else {
            reset({
                name: "",
                category: "",
            });
        }
    }, [initialData, reset]);

    const onSubmit = async (data: z.infer<typeof settingSchema>) => {
        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("category", data.category);

            if (initialData) {
                await updateSetting(initialData.id, formData);
                toast.success("Option berhasil diperbarui!");
            } else {
                await createSetting(formData);
                toast.success("Option berhasil ditambahkan!");
                reset();
            }

            mutateData();
            onClose();
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
                    {initialData ? "Edit Opsi" : "Tambah Opsi"}
                </h4>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label>Nama Opsi</Label>
                        <Input {...register("name")} placeholder="Masukkan nama opsi" />
                        {errors.name && <p className="text-sm text-red-500 mt-2">{errors.name.message}</p>}
                    </div>

                    <div>
                        <Label>Kategori</Label>
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    options={options}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
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