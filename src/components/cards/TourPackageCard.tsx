import { useState } from "react";
import useSWR from "swr";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { getPackages, deletePackage } from "../../services/packageService";
import { confirmDialog } from "../../utils/confirmationAlert";
import { formatCurrency } from "../../utils/currencyFormatter";

import { IPackagePayload } from "../../types";

import { ModalPackageForm } from "../modal/ModalPackageForm";
import Button from "../ui/button/Button";
import HeaderSection from "../cards/HeaderSectionCard";
import EmptyState from "../empty/EmptyState";
import Badge from "../ui/badge/Badge";
import ImageFallback from "../ui/images/ImageFallback";

import { LuPencil, LuTrash2 } from "react-icons/lu";

export default function TourPackageCard() {

    const { data: response = [], mutate: mutateData } = useSWR("packages", getPackages, { suspense: true });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<IPackagePayload | null>(null);

    const handleCreate = () => {
        setSelectedData(null);
        setIsModalOpen(true);
    };

    const handleEdit = (data: IPackagePayload) => {
        setSelectedData(data);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        const confirmed = await confirmDialog({
            title: "Hapus Paket Wisata",
            text: "Apakah Anda yakin ingin menghapus paket wisata ini?",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        });
        if (!confirmed) return;

        try {
            await deletePackage(id);
            mutateData();
            toast.success("Paket wisata berhasil dihapus!");
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
            {/* Header with "Buat" button */}
            <HeaderSection title="Paket Wisata" buttonLabel="Buat" onButtonClick={handleCreate} />

            {/* Modal */}
            <ModalPackageForm
                isOpen={isModalOpen}
                onClose={handleClose}
                initialData={selectedData}
                mutateData={mutateData}
            />

            {/* Cards */}
            {response.data.length === 0 && <EmptyState title="Belum ada paket wisata" />}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {response.data.map((item: IPackagePayload) => (
                    <div
                        key={item.id}
                        className="flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden"
                    >
                        <div className="w-full h-48 overflow-hidden">
                            <ImageFallback src={item.thumbnail} alt={item.title} />
                        </div>
                        <div className="p-6 flex flex-col flex-1 justify-between">
                            <div className="flex flex-col">
                                <h1 className="text-lg font-bold text-gray-800">{item.title}</h1>
                                {/* Menampilkan benefit di bawah nama paket */}
                                <p className="text-sm text-gray-500 mt-2">
                                    {item.benefit.split(",").map((benefit, index) => (
                                        <Badge key={index} color="primary" variant="light" size="md" className="mr-1 mb-1">
                                            {benefit.trim()}
                                        </Badge>
                                    ))}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                {/* Menampilkan harga di sebelah kanan tombol aksi */}
                                <h2 className="text-xl font-bold text-gray-500">{formatCurrency(item.price)}</h2>
                                <div className="flex gap-2">
                                    <Button type="button" size="sm" variant="primary" onClick={() => handleEdit(item)}>
                                        <LuPencil />
                                    </Button>
                                    <Button type="button" size="sm" variant="danger" onClick={() => handleDelete(item.id)}>
                                        <LuTrash2 />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}