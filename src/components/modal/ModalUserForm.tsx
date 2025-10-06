import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { createUserSchema, updateUserSchema } from "../../utils/validator/userValidator";
import { createUser, updateUserById } from "../../services/userService";

import { IUserPayload } from "../../types";

import { Modal } from "../ui/modal";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import Button from "../ui/button/Button";

import { AiOutlineLoading3Quarters, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface ModalUserFormProps {
    mutateData: () => void;
    initialData?: IUserPayload | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalUserForm = ({
    mutateData,
    initialData,
    isOpen,
    onClose,
}: ModalUserFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const options = [
        { value: "admin", label: "Admin" },
        { value: "visitor", label: "Pengunjung" },
        { value: "finance_batik", label: "Keuangan Batik" },
        { value: "admin_batik", label: "Admin Batik" },
        { value: "finance_tourism", label: "Keuangan Wisata" },
        { value: "admin_tourism", label: "Admin Wisata" },
    ];

    const schema = initialData ? updateUserSchema : createUserSchema;

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            role: "",
            password: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name,
                email: initialData.email,
                phone: initialData.phone,
                role: initialData.role,
                password: "",
            });
        } else {
            reset({
                name: "",
                email: "",
                phone: "",
                role: "",
                password: "",
            });
        }

        setAvatarFile(null);
    }, [initialData, reset]);

    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
            if (!initialData && !avatarFile) {
                onClose();
                toast.error("Avatar tidak boleh kosong!");
                return;
            }

            setIsLoading(true);

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            formData.append("role", data.role);
            if (data.password) {
                formData.append("password", data.password);
            }
            if (avatarFile) {
                formData.append("file", avatarFile);
            }

            if (initialData) {
                await updateUserById(initialData.id, formData);
                toast.success("Pengguna berhasil diperbarui!");
            } else {
                await createUser(formData);
                toast.success("Pengguna berhasil ditambahkan!");
                reset();
            }

            mutateData();
            onClose();
            setAvatarFile(null);
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
                    {initialData ? "Edit Pengguna" : "Tambah Pengguna"}
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
                        <Label>Avatar</Label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setAvatarFile(file);
                            }}
                            className="file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary/80"
                        />
                    </div>

                    <div>
                        <Label>Nama Lengkap <span className="text-error-500">*</span></Label>
                        <Input {...register("name")} placeholder="Masukkan nama lengkap" />
                        {errors.name && <p className="text-sm text-red-500 mt-2">{errors.name.message}</p>}
                    </div>

                    <div>
                        <Label>Email <span className="text-error-500">*</span></Label>
                        <Input {...register("email")} placeholder="Masukkan email" />
                        {errors.email && <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>}
                    </div>

                    <div>
                        <Label>Telepon <span className="text-error-500">*</span></Label>
                        <Input {...register("phone")} placeholder="Masukkan nomor telepon" />
                        {errors.phone && <p className="text-sm text-red-500 mt-2">{errors.phone.message}</p>}
                    </div>

                    <div>
                        <Label>Role <span className="text-error-500">*</span></Label>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    options={options}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.role && <p className="text-sm text-red-500 mt-2">{errors.role.message}</p>}
                    </div>

                    <div>
                        <Label>Password <span className="text-error-500">*</span></Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Masukan password anda"
                                {...register("password")}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center text-gray-500 hover:text-gray-700"
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <AiFillEyeInvisible />
                                ) : (
                                    <AiFillEye />
                                )}
                            </button>
                        </div>
                        {errors.password?.message && (
                            <p className="mt-1 text-sm text-error-500">{errors.password.message}</p>
                        )}
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