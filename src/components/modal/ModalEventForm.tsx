import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { eventSchema } from "../../utils/validator/eventValidator";
import { createEvent, updateEvent } from "../../services/eventService";
import { formatDate } from "../../utils/dateFormatter";

import { IEventPayload } from "../../types";

import { Modal } from "../ui/modal";
import Input from "../form/input/InputField";
import TimePicker from "../form/time-picker";
import TextArea from "../form/input/TextArea";
import Label from "../form/Label";
import DatePicker from "../form/date-picker";
import Button from "../ui/button/Button";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ModalEventFormProps {
    mutateData: () => void;
    initialData?: IEventPayload | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalEventForm = ({
    mutateData,
    initialData,
    isOpen,
    onClose,
}: ModalEventFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const {
        register,
        watch,
        setValue,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: "",
            description: "",
            date: "",
            time: "",
            place: "",
            price: 0,
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                title: initialData.title,
                description: initialData.description,
                date: formatDate(initialData.date),
                time: initialData.time,
                place: initialData.place,
                price: initialData.price,
            });
        } else {
            reset({
                title: "",
                description: "",
                date: "",
                time: "",
                place: "",
                price: 0,
            });
        }

        setImageFile(null);
    }, [initialData, reset]);

    const onSubmit = async (data: z.infer<typeof eventSchema>) => {
        try {
            if (!initialData && !imageFile) {
                onClose();
                toast.error("Thumbnail tidak boleh kosong!");
                return;
            }

            setIsLoading(true);

            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("date", data.date);
            formData.append("time", data.time);
            formData.append("place", data.place);
            formData.append("price", (data.price ?? 0).toString());
            if (imageFile) {
                formData.append("file", imageFile);
            }

            if (initialData) {
                await updateEvent(initialData.id, formData);
                toast.success("Agenda berhasil diperbarui!");
            } else {
                await createEvent(formData);
                toast.success("Agenda berhasil ditambahkan!");
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
                    {initialData ? "Edit Agenda Desa" : "Buat Agenda Desa"}
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
                        <Label>Nama Agenda</Label>
                        <Input {...register("title")} placeholder="Masukkan nama agenda" />
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
                    </div>

                    <div className="col-span-2">
                        <Label>Tanggal</Label>
                        <DatePicker
                            id="date"
                            mode="single"
                            placeholder="YYYY-MM-DD"
                            value={watch("date")}
                            onChange={(date) => {
                                if (date) {
                                    const formatted = new Date(date).toISOString().split("T")[0];
                                    setValue("date", formatted);
                                }
                            }}
                        />
                        {errors.date && <p className="text-sm text-red-500 mt-2">{errors.date.message}</p>}
                    </div>

                    <div>
                        <Controller
                            name="time"
                            control={control}
                            rules={{ required: "Waktu harus diisi" }}
                            render={({ field }) => (
                                <TimePicker
                                    id="time"
                                    label="Waktu"
                                    value={field.value}
                                    onChange={field.onChange}
                                    min="00:00"
                                    max="23:59"
                                />
                            )}
                        />
                        {errors.time && (<p className="text-sm text-red-500 mt-2">{errors.time.message}</p>)}
                    </div>

                    <div>
                        <Label>Tempat</Label>
                        <Input {...register("place")} placeholder="Masukkan tempat" />
                        {errors.place && <p className="text-sm text-red-500 mt-2">{errors.place.message}</p>}
                    </div>

                    <div>
                        <Label>Harga Tiket</Label>
                        <Input type="number" className="no-spinner" min={0} {...register("price", { valueAsNumber: true })} placeholder="Masukkan harga" />
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