import { useState } from "react";
import { Order } from "../../types";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { EmptyTable } from "./EmptyTable";
import Badge from "../ui/badge/Badge";
import Pagination from "../ui/pagination/Pagination";

const capitalizeWords = (str: string) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

interface OrderTableProps {
    data: Order[];
    perPage?: number;
}

export default function TransactionTable({ data, perPage = 10 }: OrderTableProps) {
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
                                Nama Lengkap
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                                Jumlah
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                                Total
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                                Saluran
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                                Metode Pembayaran
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                                Status
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                                Tanggal Transaksi
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {currentData.length === 0 ? (
                            <EmptyTable colspan={7} description="Tidak ada data transaksi" />
                        ) : (
                            currentData.map((t, idx) => (
                                <TableRow key={idx} className="hover:bg-gray-300/10">
                                    <TableCell className="px-4 py-3 whitespace-nowrap text-theme-sm text-gray-500 dark:text-gray-400">
                                        {capitalizeWords(t.name)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 whitespace-nowrap text-theme-sm text-gray-500 dark:text-gray-400">
                                        {t.quantity}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 whitespace-nowrap text-theme-sm text-gray-500 dark:text-gray-400">
                                        {t.total_price.toLocaleString("id-ID")}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 whitespace-nowrap text-theme-sm text-gray-500 dark:text-gray-400">
                                        {capitalizeWords(t.channel)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 whitespace-nowrap text-theme-sm text-gray-500 dark:text-gray-400">
                                        {capitalizeWords(t.payment_method)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 whitespace-nowrap text-theme-sm text-gray-500 dark:text-gray-400">
                                        {
                                            t.status === "pending" ? (
                                                <Badge color="warning">Pending</Badge>
                                            ) : t.status === "paid" ? (
                                                <Badge color="success">Dibayar</Badge>
                                            ) : (
                                                t.status === "expired" ? (
                                                    <Badge color="error">Kedaluwarsa</Badge>
                                                ) : (
                                                    t.status === "canceled" && (
                                                        <Badge color="error">Dibatalkan</Badge>
                                                    )
                                                )
                                            )
                                        }
                                    </TableCell>
                                    <TableCell className="px-4 py-3 whitespace-nowrap text-theme-sm text-gray-500 dark:text-gray-400">
                                        {new Date(t.order_date).toLocaleDateString("id-ID")}
                                    </TableCell>
                                </TableRow>
                            ))
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
