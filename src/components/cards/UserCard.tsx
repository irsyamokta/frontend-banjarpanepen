import { useState } from "react";
import useSWR from "swr";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { getUsers, deleteUser } from "../../services/userService";
import { confirmDialog } from "../../utils/confirmationAlert";

import { IUserPayload } from "../../types";

import { ModalUserForm } from "../modal/ModalUserForm";
import HeaderSection from "./HeaderSectionCard";
import UserTable from "../tables/UserTable";

export default function UserCard() {
    const { data: response = [], mutate: mutateData } = useSWR("users", getUsers, { suspense: true });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<IUserPayload | null>(null);

    const handleCreate = () => {
        setSelectedData(null);
        setIsModalOpen(true);
    };

    const handleEdit = (data: IUserPayload) => {
        setSelectedData(data);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        const confirmed = await confirmDialog({
            title: "Hapus Pengguna",
            text: "Apakah Anda yakin ingin menghapus pengguna ini?",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        });
        if (!confirmed) return;

        try {
            await deleteUser(id);
            mutateData();
            toast.success("Pengguna berhasil dihapus!");
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
            <HeaderSection title="Daftar Pengguna" buttonLabel="Tambah" onButtonClick={handleCreate} />

            <ModalUserForm
                isOpen={isModalOpen}
                onClose={handleClose}
                initialData={selectedData}
                mutateData={mutateData}
            />

            <UserTable
                data={response.data || []}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}
