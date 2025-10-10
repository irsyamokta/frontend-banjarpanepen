import useSWR from "swr";
import { getHistoryOrders } from "../../services/orderService";
import HeaderSection from "../cards/HeaderSectionCard";
import { QRCodeCanvas } from "qrcode.react";
import EmptyState from "../../components/empty/EmptyState";
import { formatDateTime } from "../../utils/dateFormatter";
import { formatCurrency } from "../../utils/currencyFormatter";

type TicketOrder = {
    id: string;
    ticket_id: string;
    buyer_name: string;
    quantity: number;
    category_name: string;
    price: number;
    qr_code: string | null;
    used_at: string | null;
    status_label: string;
};

type Transaction = {
    id: string;
    type: string;
    total_price: number;
    status: string;
    status_label: string;
    created_at: string;
    ticket_orders: TicketOrder[];
};

const fetcher = async () => {
    const data = await getHistoryOrders();
    return data.map((item: any) => ({
        id: item.id,
        type: "ticket",
        total_price: item.total_price,
        status: item.status,
        status_label:
            item.status === "paid"
                ? "Sudah Dibayar"
                : item.status === "pending"
                    ? "Menunggu Pembayaran"
                    : "Dibatalkan",
        created_at: item.order_date,
        ticket_orders: [
            {
                id: item.ticket.id,
                ticket_id: item.ticket_id,
                buyer_name: item.name ?? "-",
                quantity: item.quantity,
                category_name: item.ticket.title,
                price: item.ticket.price,
                qr_code: item.qr_code,
                used_at: item.used_at,
                status_label: item.used_at
                    ? "Sudah digunakan"
                    : "Belum digunakan",
            },
        ],
    }));
};

export default function TicketHistory() {
    const {
        data: ticketTransactions,
        error,
        isLoading,
    } = useSWR<Transaction[]>("/orders/history", fetcher, { suspense: true, revalidateOnFocus: true, revalidateOnMount: true, refreshInterval: 1000 });

    if (isLoading) {
        return <p className="text-center mt-10">Memuat data...</p>;
    }

    if (error) {
        return (
            <div className="px-4 lg:px-20 mb-8 overflow-x-hidden pt-28">
                <EmptyState
                    title="Terjadi Kesalahan"
                    description="Gagal memuat data transaksi. Silakan coba lagi nanti."
                />
            </div>
        );
    }

    const paidTransactions =
        ticketTransactions?.filter((t) => t.status === "paid") ?? [];

    if (paidTransactions.length === 0) {
        return (
            <div className="px-4 lg:px-20 mb-8 overflow-x-hidden pt-28">
                <HeaderSection title="Riwayat Tiket" showButton={false} />
                <EmptyState
                    title="Belum Ada Tiket"
                    description="Kamu belum memiliki tiket yang sudah dibayar."
                />
            </div>
        );
    }

    return (
        <div className="px-4 lg:px-20 mb-8 overflow-x-hidden">
            <div className="pt-28">
                <HeaderSection title="Riwayat Tiket" showButton={false} />

                <div className="space-y-6 mt-4">
                    {paidTransactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="border rounded-2xl p-6 bg-white"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold">{transaction.id}</h2>
                                    <p className="text-sm text-gray-500">
                                        {formatDateTime(transaction.created_at)}
                                    </p>
                                </div>
                            </div>

                            <h3 className="text-md font-semibold mb-2">Detail Tiket</h3>
                            <ul className="space-y-3">
                                {transaction.ticket_orders.map((ticket) => (
                                    <li
                                        key={ticket.id}
                                        className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start border-b pb-4"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 w-full">
                                            {ticket.qr_code && (
                                                <div className="mt-2 sm:mt-0 flex-shrink-0">
                                                    <QRCodeCanvas
                                                        id={`qr-${ticket.id}`}
                                                        value={ticket.qr_code}
                                                        size={130}
                                                        level="H"
                                                    />
                                                </div>
                                            )}
                                            <div className="w-full sm:w-72">
                                                <p className="font-medium">{ticket.category_name}</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {formatCurrency(ticket.price)} × {ticket.quantity}
                                                </p>
                                                <div className="mt-2">
                                                    <p
                                                        className={`text-sm font-semibold ${ticket.used_at
                                                                ? "text-green-500"
                                                                : "text-red-500"
                                                            }`}
                                                    >
                                                        {ticket.status_label}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
