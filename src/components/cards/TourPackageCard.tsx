import useSWR from "swr";
import { getPackages, deletePackage } from "../../services/packageService";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { IPackagePayload } from "../../types";
import { ModalPackageForm } from "../modal/ModalPackageForm";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { confirmDialog } from "../../utils/confirmationAlert";
import Button from "../ui/button/Button";
import HeaderSection from "../cards/HeaderSectionCard";

export default function TourPackageCard() {
    const fetcher = async () => {
        const data = await getPackages();
        return data.data;
    };

    const { data: response = [], mutate: mutateData } = useSWR("packages", fetcher);
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
            confirmButtonText: "Yes, Delete!",
            cancelButtonText: "Cancel",
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {response.map((item: IPackagePayload) => (
                    <div
                        key={item.id}
                        className="flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden"
                    >
                        <div className="w-full h-48 overflow-hidden">
                            <img
                                src={item.thumbnail || "/src/assets/img/761.png"}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-1 justify-between">
                            <div>
                                <h1 className="text-lg font-bold text-gray-800">{item.title}</h1>
                                <h2 className="text-sm text-gray-500 mt-1">Rp. {item.price}</h2>
                                <p className="text-sm text-gray-500 mt-3 line-clamp-5">{item.benefit}</p>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <Button type="button" size="sm" variant="primary" onClick={() => handleEdit(item)}>
                                    <LuPencil />
                                </Button>
                                <Button type="button" size="sm" variant="danger" onClick={() => handleDelete(item.id)}>
                                    <LuTrash2 />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}