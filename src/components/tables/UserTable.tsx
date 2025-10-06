import { useState } from "react";
import { IUserPayload } from "../../types";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { EmptyTable } from "./EmptyTable";
import ImageFallback from "../ui/images/ImageFallback";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import Pagination from "../ui/pagination/Pagination";

import { LuPencil, LuTrash2 } from "react-icons/lu";
import ImageUser from "../../assets/img/img-user.png";

interface UserTableProps {
    data: IUserPayload[];
    onEdit: (user: IUserPayload) => void;
    onDelete: (id: string) => void;
    perPage?: number;
}

const ROLE_LABELS: Record<string, string> = {
    admin: "Administrator",
    finance_batik: "Keuangan Batik",
    admin_batik: "Admin Batik",
    finance_tourism: "Keuangan Wisata",
    admin_tourism: "Admin Wisata",
    visitor: "Pengunjung",
};

const ROLE_COLORS: Record<string, "success" | "warning" | "error" | "info"> = {
    admin: "success",
    finance_batik: "info",
    admin_batik: "warning",
    finance_tourism: "info",
    admin_tourism: "warning",
    visitor: "error",
};

export default function UserTable({ data, onEdit, onDelete, perPage = 10 }: UserTableProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const total = data.length;
    const lastPage = Math.ceil(total / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const currentData = data.slice(startIndex, startIndex + perPage);

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                                Avatar
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                                Nama Lengkap
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                                Email
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                                Telepon
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                                Role
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                                Aksi
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {currentData.length === 0 ? (
                            <EmptyTable colspan={6} description="Tidak ada pengguna yang tersedia" />
                        ) : (
                            currentData.map((user) => {
                                const roleLabel = ROLE_LABELS[user.role] || user.role;
                                const badgeColor = ROLE_COLORS[user.role] || "success";

                                return (
                                    <TableRow key={user.id} className="hover:bg-gray-300/10">
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                            <ImageFallback
                                                src={user.avatar ?? ImageUser}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                                fallbackClassName="w-10 h-10 rounded-full object-cover"
                                            />
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                            {user.name}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                            {user.email}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                            {user.phone}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                            <Badge color={badgeColor}>{roleLabel}</Badge>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="primary"
                                                    onClick={() => onEdit(user)}
                                                >
                                                    <LuPencil />
                                                </Button>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="danger"
                                                    onClick={() => onDelete(user.id)}
                                                >
                                                    <LuTrash2 />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {total > 0 && (
                <div className="border-t border-gray-100 px-3 pb-3">
                    <Pagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                        total={total}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}
        </div>
    );
}
