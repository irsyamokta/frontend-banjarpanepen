import { useState } from "react";
import useSWR from "swr";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { getGalleries, deleteGallery } from "../../services/galleryService";
import { confirmDialog } from "../../utils/confirmationAlert";

import { IGalleryPayload } from "../../types";

import { ModalGalleryForm } from "../modal/ModalGalleryForm";
import HeaderSection from "./HeaderSectionCard";
import EmptyState from "../empty/EmptyState";
import ImageFallback from "../ui/images/ImageFallback";

import { LuPencil, LuTrash2 } from "react-icons/lu";


export default function ImageGalleryCard() {

    const { data: response = [], mutate: mutateData } = useSWR("galleries", getGalleries, { suspense: true });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<IGalleryPayload | null>(null);

    const handleCreate = () => {
        setSelectedData(null);
        setIsModalOpen(true);
    };

    const handleEdit = (data: IGalleryPayload) => {
        setSelectedData(data);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        const confirmed = await confirmDialog({
            title: "Hapus Foto Galeri",
            text: "Apakah Anda yakin ingin menghapus foto galeri ini?",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        });
        if (!confirmed) return;

        try {
            await deleteGallery(id);
            mutateData();
            toast.success("Foto galeri berhasil dihapus!");
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
            <HeaderSection title="Galeri" buttonLabel="Tambah" onButtonClick={handleCreate} />

            {/* Modal */}
            <ModalGalleryForm
                isOpen={isModalOpen}
                onClose={handleClose}
                initialData={selectedData}
                mutateData={mutateData}
            />

            {/* Cards */}
            {response.data.length === 0 && <EmptyState title="Belum ada foto galeri" />}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {response.data.map((item: IGalleryPayload) => (
                    <div key={item.id} className="relative break-inside-avoid overflow-hidden rounded-xl group">
                        {/* Gambar dengan rasio asli dan rounded */}
                        <ImageFallback src={item.image} alt={item.title} />

                        {/* Overlay saat hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 rounded-xl">
                            {/* Tombol atas */}
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="bg-white/80 text-gray-700 p-2 rounded-full hover:bg-white"
                                >
                                    <LuPencil size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-white/80 text-red-600 p-2 rounded-full hover:bg-white"
                                >
                                    <LuTrash2 size={16} />
                                </button>
                            </div>

                            {/* Judul & caption */}
                            <div className="text-white text-sm mt-auto">
                                <h1 className="font-semibold">{item.title}</h1>
                                <p className="text-xs line-clamp-1">{item.caption}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}