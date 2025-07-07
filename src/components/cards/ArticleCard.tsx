import { useState } from "react";
import useSWR from "swr";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { getArticles, deleteArticle } from "../../services/articleService";
import { confirmDialog } from "../../utils/confirmationAlert";
import { formatDateTime } from "../../utils/dateFormatter";
import { createMarkup } from "../../utils/htmlMarkup";

import { IArticlePayload } from "../../types";

import { ModalArticleForm } from "../modal/ModalArticleForm";
import Button from "../ui/button/Button";
import HeaderSection from "../cards/HeaderSectionCard";
import EmptyState from "../empty/EmptyState";
import ImageFallback from "../ui/images/ImageFallback";

import { LuPencil, LuTrash2 } from "react-icons/lu";

export default function ArticleCard() {

    const { data: response = [], mutate: mutateData } = useSWR("articles", getArticles, { suspense: true });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<IArticlePayload | null>(null);

    const handleCreate = () => {
        setSelectedData(null);
        setIsModalOpen(true);
    };

    const handleEdit = (data: IArticlePayload) => {
        setSelectedData(data);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        const confirmed = await confirmDialog({
            title: "Hapus Artikel",
            text: "Apakah Anda yakin ingin menghapus artikel ini?",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        });
        if (!confirmed) return;

        try {
            await deleteArticle(id);
            mutateData();
            toast.success("Artikel berhasil dihapus!");
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
            <HeaderSection title="Artikel" buttonLabel="Buat" onButtonClick={handleCreate} />

            {/* Modal */}
            <ModalArticleForm
                isOpen={isModalOpen}
                onClose={handleClose}
                initialData={selectedData}
                mutateData={mutateData}
            />

            {/* Cards */}
            {response.data.length === 0 && <EmptyState title="Belum ada artikel" />}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {response.data.map((item: IArticlePayload) => (
                    <div
                        key={item.id}
                        className="flex flex-row-reverse rounded-2xl border border-gray-200 bg-white overflow-hidden"
                    >
                        {/* Konten kiri */}
                        <div className="flex flex-col p-6 flex-1 justify-between">
                            <div className="space-y-2">
                                <h1 className="text-xl font-semibold text-gray-800">{item.title}</h1>
                                <div
                                    className="text-sm text-gray-600 line-clamp-3"
                                    dangerouslySetInnerHTML={createMarkup(item.content || "")}
                                />
                                <p className="text-sm text-gray-600 mt-5">Penulis: {item.writer}</p>
                                <p className="text-xs text-gray-500">Dibuat: {formatDateTime(item.created_at)}</p>
                                <p className="text-xs text-gray-500">Diperbarui: {formatDateTime(item.updated_at)}</p>
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

                        {/* Thumbnail kanan */}
                        <div className="w-40 h-auto overflow-hidden order-last">
                            <ImageFallback src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" fallbackClassName="w-full h-full object-cover" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}