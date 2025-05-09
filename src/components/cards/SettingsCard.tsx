import useSWR from "swr";
import { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { ISettingPayload } from "../../types";
import { getSettings, deleteSetting } from "../../services/settingService";

import HeaderSection from "./HeaderSectionCard";
import { ModalSettingForm } from "../modal/ModalSettingForm";

import Button from "../ui/button/Button";

import { confirmDialog } from "../../utils/confirmationAlert";

import { Sparkles } from "lucide-react";
import { LuBuilding2, LuPencil, LuTrash2 } from "react-icons/lu";

export default function SettingsCard() {
    const { data: response = [], mutate: mutateData } = useSWR("settings", getSettings, { suspense: true });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<ISettingPayload | null>(null);

    const benefitSettings = response.filter((item: ISettingPayload) => item.category === "Benefit");
    const facilitySettings = response.filter((item: ISettingPayload) => item.category === "Fasilitas");

    const handleCreate = () => {
        setSelectedData(null);
        setIsModalOpen(true);
    };

    const handleEdit = (data: ISettingPayload) => {
        setSelectedData(data);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        const confirmed = await confirmDialog({
            title: "Hapus Opsi",
            text: "Apakah Anda yakin ingin menghapus opsi ini?",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        });
        if (!confirmed) return;

        try {
            await deleteSetting(id);
            mutateData();
            toast.success("Opsi berhasil dihapus!");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedData(null);
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:gap-6">
            <HeaderSection title="Pengaturan" buttonLabel="Tambah" onButtonClick={handleCreate} />

            <ModalSettingForm
                isOpen={isModalOpen}
                onClose={handleClose}
                initialData={selectedData}
                mutateData={mutateData}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                {/* Benefit */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                                <Sparkles className="text-gray-800 size-6 dark:text-white/90" />
                            </div>
                            <span className="text-base font-semibold text-gray-800 dark:text-white">Benefit</span>
                        </div>
                    </div>
                    <div className="mt-5 text-sm">
                        {benefitSettings.length === 0 && <p className="text-sm text-gray-500">Tidak ada data</p>}
                        {benefitSettings.map((item: ISettingPayload) => (
                            <div>
                                <div key={item.id} className="flex justify-between items-center">
                                    <span>{item.name}</span>
                                    <div className="flex">
                                        <Button variant="link" size="ghost" onClick={() => handleEdit(item)}>
                                            <LuPencil className="text-gray-900"/>
                                        </Button>
                                        <Button variant="link" size="ghost" className="text-red-500" onClick={() => handleDelete(item.id)}>
                                            <LuTrash2 />
                                        </Button>
                                    </div>
                                </div>
                                <hr className="my-2" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fasilitas */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                                <LuBuilding2 className="text-gray-800 size-6 dark:text-white/90" />
                            </div>
                            <span className="text-base font-semibold text-gray-800 dark:text-white">Fasilitas</span>
                        </div>
                    </div>
                    <div className="mt-5 text-sm">
                        {facilitySettings.length === 0 && <p className="text-sm text-gray-500">Tidak ada data</p>}
                        {facilitySettings.map((item: ISettingPayload) => (
                            <div>
                                <div key={item.id} className="flex justify-between items-center">
                                    <span>{item.name}</span>
                                    <div className="flex">
                                        <Button variant="link" size="ghost" onClick={() => handleEdit(item)}>
                                            <LuPencil className="text-gray-900"/>
                                        </Button>
                                        <Button variant="link" size="ghost" className="text-red-500" onClick={() => handleDelete(item.id)}>
                                            <LuTrash2 />
                                        </Button>
                                    </div>
                                </div>
                                <hr className="my-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
