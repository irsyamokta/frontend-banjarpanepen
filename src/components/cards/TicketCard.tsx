import { useState } from "react";
import useSWR from "swr";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { getTickets, deleteTicket } from "../../services/ticketService";
import { confirmDialog } from "../../utils/confirmationAlert";
import { formatCurrency } from "../../utils/currencyFormatter";

import { ITicketPayload } from "../../types";

import { ModalTicketForm } from "../modal/ModalTicketForm";
import Button from "../ui/button/Button";
import HeaderSection from "./HeaderSectionCard";
import EmptyState from "../empty/EmptyState";
import ImageFallback from "../ui/images/ImageFallback";

import { LuMapPin, LuPencil, LuTrash2, LuTickets } from "react-icons/lu";

export default function TicketCard() {
    const { data: response = [], mutate: mutateData } = useSWR("tickets", getTickets, { suspense: true });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<ITicketPayload | null>(null);

    const handleCreate = () => {
        setSelectedData(null);
        setIsModalOpen(true);
    };

    const handleEdit = (data: ITicketPayload) => {
        setSelectedData(data);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        const confirmed = await confirmDialog({
            title: "Hapus Tiket",
            text: "Apakah Anda yakin ingin menghapus tiket ini?",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        });
        if (!confirmed) return;

        try {
            await deleteTicket(id);
            mutateData();
            toast.success("Tiket berhasil dihapus!");
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
            <HeaderSection title="Daftar Tiket" buttonLabel="Tambah" onButtonClick={handleCreate} />

            <ModalTicketForm
                isOpen={isModalOpen}
                onClose={handleClose}
                initialData={selectedData}
                mutateData={mutateData}
            />

            {response.data.length === 0 && <EmptyState title="Belum ada tiket" />}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {response.data.map((item: ITicketPayload) => (
                    <div
                        key={item.id}
                        className="flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden"
                    >
                        <div className="w-full h-48 overflow-hidden">
                            <ImageFallback
                                src={item.cover}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                fallbackClassName="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-1 justify-between">
                            <div>
                                <h1 className="text-xl font-bold text-gray-800 line-clamp-1">{item.title}</h1>
                                <p className="text-sm text-gray-500 mt-2 line-clamp-3">{item.description}</p>

                                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <LuMapPin className="w-4 h-4 shrink-0" />
                                        <span className="truncate">{item.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 font-bold text-gray-700">
                                        <LuTickets className="w-4 h-4 shrink-0" />
                                        <span>{item.price === 0 ? "Gratis" : formatCurrency(item.price)}</span>
                                    </div>
                                </div>
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