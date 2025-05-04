import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { tourSchema } from "../../utils/validator/tourValidator";
import { createTour, updateTour } from "../../services/tourService";

import { ITourPayload } from "../../types";

import { Modal } from "../ui/modal";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import MultiSelect from "../form/MultiSelect";
import TimePicker from "../form/time-picker";
import Label from "../form/Label";
import Button from "../ui/button/Button";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ModalTourFormProps {
    mutateData: () => void;
    initialData?: ITourPayload | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalTourForm = ({
    mutateData,
    initialData,
    isOpen,
    onClose,
}: ModalTourFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const optionsOperational = [
        { value: "Senin", text: "Senin" },
        { value: "Selasa", text: "Selasa" },
        { value: "Rabu", text: "Rabu" },
        { value: "Kamis", text: "Kamis" },
        { value: "Jumat", text: "Jumat" },
        { value: "Sabtu", text: "Sabtu" },
        { value: "Minggu", text: "Minggu" },
    ];

    const optionsFacility = [
        { value: "Musholla", text: "Musholla" },
        { value: "Toilet", text: "Toilet" },
        { value: "Parkir", text: "Parkir" },
        { value: "Warung", text: "Warung" },
    ];


    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<z.infer<typeof tourSchema>>({
        resolver: zodResolver(tourSchema),
        defaultValues: {
            title: "",
            about: "",
            operational: [],
            location: "",
            start: "",
            end: "",
            facility: [],
            maps: "",
            price: 0,
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                title: initialData.title,
                about: initialData.about,
                operational: initialData.operational.split(","),
                location: initialData.location,
                start: initialData.start,
                end: initialData.end,
                facility: initialData.facility.split(","),
                maps: initialData.maps,
                price: initialData.price,
            });
        } else {
            reset({
                title: "",
                about: "",
                operational: [],
                location: "",
                start: "",
                end: "",
                facility: [],
                maps: "",
                price: 0,
            });
        }

        setImageFile(null);
    }, [initialData, reset]);

    const onSubmit = async (data: z.infer<typeof tourSchema>) => {
        try {
            if (!initialData && !imageFile) {
                onClose();
                toast.error("Thumbnail tidak boleh kosong!");
                return;
            }

            setIsLoading(true);

            const operationalString = Array.isArray(data.operational) ? data.operational.join(",") : data.operational;
            const facilityString = Array.isArray(data.facility) ? data.facility.join(",") : data.facility;



            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("about", data.about);
            formData.append("operational", operationalString);
            formData.append("location", data.location);
            formData.append("start", data.start);
            formData.append("end", data.end);
            formData.append("facility", facilityString);
            formData.append("maps", data.maps ?? "");
            formData.append("price", (data.price ?? 0).toString());
            if (imageFile) {
                formData.append("file", imageFile);
            }

            if (initialData) {
                await updateTour(initialData.id, formData);
                toast.success("Wisata berhasil diperbarui!");
            } else {
                await createTour(formData);
                toast.success("Wisata berhasil ditambahkan!");
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
                    {initialData ? "Edit Wisata" : "Tambah Wisata"}
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
                        <Label>Nama Wisata</Label>
                        <Input {...register("title")} placeholder="Masukkan nama wisata" />
                        {errors.title && <p className="text-sm text-red-500 mt-2">{errors.title.message}</p>}
                    </div>

                    <div>
                        <Label>Tentang</Label>
                        <Controller
                            control={control}
                            name="about"
                            render={({ field }) => (
                                <TextArea
                                    {...field}
                                    rows={4}
                                    error={!!errors.about}
                                    hint={errors.about?.message}
                                />
                            )}
                        />
                    </div>

                    <div className="relative z-9999999">
                        <Label>Operasional</Label>
                        <Controller
                            name="operational"
                            control={control}
                            rules={{ required: "Operasional tidak boleh kosong" }}
                            render={({ field }) => (
                                <MultiSelect
                                    {...field}
                                    options={optionsOperational}
                                    onChange={field.onChange}
                                    value={field.value || []}
                                    label=""
                                />
                            )}
                        />
                        {errors.operational && <p className="text-sm text-red-500">{errors.operational.message}</p>}
                    </div>

                    <div>
                        <Label>Lokasi</Label>
                        <Input {...register("location")} placeholder="Masukkan lokasi" />
                        {errors.location && <p className="text-sm text-red-500 mt-2">{errors.location.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Controller
                                name="start"
                                control={control}
                                rules={{ required: "Jam mulai harus diisi" }}
                                render={({ field }) => (
                                    <TimePicker
                                        id="start"
                                        label="Jam Mulai"
                                        value={field.value}
                                        onChange={field.onChange}
                                        min="08:00"
                                        max="17:00"
                                    />
                                )}
                            />
                            {errors.start && (
                                <p className="text-sm text-red-500 mt-2">{errors.start.message}</p>
                            )}
                        </div>

                        <div>
                            <Controller
                                name="end"
                                control={control}
                                rules={{ required: "Jam selesai harus diisi" }}
                                render={({ field }) => (
                                    <TimePicker
                                        id="end"
                                        label="Jam Selesai"
                                        value={field.value}
                                        onChange={field.onChange}
                                        min="08:00"
                                        max="22:00"
                                    />
                                )}
                            />
                            {errors.end && (
                                <p className="text-sm text-red-500 mt-2">{errors.end.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label>Fasilitas</Label>
                        <Controller
                            name="facility"
                            control={control}
                            rules={{ required: "Fasilitas tidak boleh kosong" }}
                            render={({ field }) => (
                                <MultiSelect
                                    {...field}
                                    options={optionsFacility}
                                    onChange={field.onChange}
                                    value={field.value || []}
                                    label=""
                                />
                            )}
                        />
                        {errors.facility && <p className="text-sm text-red-500">{errors.facility.message}</p>}
                    </div>

                    <div>
                        <Label>Tautan Maps</Label>
                        <Input {...register("maps")} placeholder="Masukkan tautan maps" />
                        {errors.maps && <p className="text-sm text-red-500 mt-2">{errors.maps.message}</p>}
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