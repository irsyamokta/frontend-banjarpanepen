import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { EmptyTable } from "./EmptyTable";
import Pagination from "../ui/pagination/Pagination";
import { formatDateTime } from "../../utils/dateFormatter";
import { formatCurrency } from "../../utils/currencyFormatter";
import DatePicker from "../../components/form/DatePicker";

interface Visitor {
    id: string;
    user: {
        name: string;
    };
    ticket: {
        title: string;
    };
    quantity: number;
    total_price: number;
    used_at: string;
}

interface VisitorTableProps {
    data: Visitor[];
    perPage?: number;
}

export default function VisitorTable({ data, perPage = 10 }: VisitorTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();

    const filteredData = selectedDate
        ? data.filter((item) => {
            const itemDate = new Date(item.used_at);
            return (
                itemDate.getFullYear() === selectedDate.getFullYear() &&
                itemDate.getMonth() === selectedDate.getMonth() &&
                itemDate.getDate() === selectedDate.getDate()
            );
        })
        : data;

    const total = filteredData.length;
    const lastPage = Math.ceil(total / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const currentData = filteredData.slice(startIndex, startIndex + perPage);

    return (
        <div className=" rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="py-4 px-4 max-w-sm">
                <div>
                    <DatePicker
                        mode="single"
                        value={selectedDate}
                        onChange={(date) => {
                            setSelectedDate(date);
                            setCurrentPage(1);
                        }}
                        placeholder="Tanggal Kunjungan"
                    />
                </div>
            </div>
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                            >
                                Nama Pembeli
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                            >
                                Nama Tiket
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                            >
                                Jumlah
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                            >
                                Total Harga
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                            >
                                Tanggal Kunjungan
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {currentData.length === 0 ? (
                            <EmptyTable colspan={5} description="Tidak ada data pengunjung" />
                        ) : (
                            currentData.map((item, idx) => (
                                <TableRow key={idx} className="hover:bg-gray-300/10">
                                    <TableCell className="px-4 py-3 whitespace-nowrap text-theme-sm text-gray-600 dark:text-gray-400">
                                        {item.user?.name || "-"}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 whitespace-nowrap text-theme-sm text-gray-600 dark:text-gray-400">
                                        {item.ticket?.title || "-"}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 whitespace-nowrap text-theme-sm text-gray-600 dark:text-gray-400">
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 whitespace-nowrap text-theme-sm text-gray-600 dark:text-gray-400">
                                        {formatCurrency(item.total_price)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 whitespace-nowrap text-theme-sm text-gray-600 dark:text-gray-400">
                                        {formatDateTime(item.used_at)}
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
