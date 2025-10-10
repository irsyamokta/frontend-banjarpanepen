import { useState, useEffect } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";
import HeaderSection from "../cards/HeaderSectionCard";
import EmptyState from "../../components/empty/EmptyState";
import { formatDateTime } from "../../utils/dateFormatter";
import { formatCurrency } from "../../utils/currencyFormatter";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import { confirmDialog } from "../../utils/confirmationAlert";
import { getHistoryOrders, cancelOrder } from "../../services/orderService";

type Transaction = {
    id: string;
    total_price: number;
    quantity: number;
    status: string;
    order_date: string;
    used_at: string | null;
    qr_code: string | null;
    ticket: {
        id: string;
        title: string;
        price: number;
    };
    snap_token: string | null;
    snap_token_expired_at?: string | null;
};

const fetcher = async (): Promise<Transaction[]> => {
    const data = await getHistoryOrders();
    return data.map((item: any) => ({
        id: item.id,
        total_price: item.total_price,
        quantity: item.quantity,
        status: item.status,
        order_date: item.order_date,
        used_at: item.used_at,
        qr_code: item.qr_code,
        ticket: item.ticket,
        snap_token: item.snap_token,
    }));
};

export default function UserTransaction() {
    const { data: transactions, error, isLoading, mutate } = useSWR("/transactions", fetcher, { revalidateOnMount: true });
    const [loadingId, setLoadingId] = useState<string | null>(null);

    useEffect(() => {
        if (!document.getElementById("midtrans-script")) {
            const script = document.createElement("script");
            script.id = "midtrans-script";
            script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
            script.setAttribute("data-client-key", import.meta.env.MIDTRANS_CLIENT_KEY as string);
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    if (isLoading) return <p className="text-center mt-10">Memuat data...</p>;

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

    if (!transactions || transactions.length === 0) {
        return (
            <div className="px-4 lg:px-20 mb-8 overflow-x-hidden pt-28">
                <HeaderSection title="Riwayat Transaksi" showButton={false} />
                <EmptyState
                    title="Belum Ada Transaksi"
                    description="Kamu belum memiliki transaksi yang sudah dibayar."
                />
            </div>
        );
    }

    const handlePayNow = async (id: string) => {
        try {
            setLoadingId(id);
            const selectedTrans = transactions?.find((t) => t.id === id);
            if (!selectedTrans || !selectedTrans.snap_token) {
                toast.error("Tiket tidak tersedia.");
                return;
            }

            (window as any).snap.pay(selectedTrans.snap_token, {
                onSuccess: async function () {
                    toast.success("Pembayaran berhasil diselesaikan.");
                    await mutate();
                },
                onPending: async function () {
                    toast.info("Pembayaran sedang dalam proses.");
                    await mutate();
                },
                onError: async function () {
                    toast.error("Pembayaran gagal.");
                    await mutate();
                },
                onClose: function () {
                    setLoadingId(null);
                },
            });
        } catch (error) {
            toast.error("Gagal melakukan pembayaran.");
        } finally {
            setLoadingId(null);
        }
    };

    const handleCancel = async (id: string) => {
        const confirmed = await confirmDialog({
            title: "Batalkan Transaksi?",
            text: "Apakah kamu yakin ingin membatalkan transaksi ini?",
            confirmButtonText: "Ya, Batalkan",
            cancelButtonText: "Tidak",
        });
        if (!confirmed) return;

        try {
            setLoadingId(id);
            await cancelOrder(id);
            mutate();
        } catch (error: any) {
            toast.error(error.response.data.message || "Terjadi kesalahan.");
        } finally {
            setLoadingId(null);
        }
    };

    const isExpired = (trans: Transaction) => {
        return (
            trans.status === "expired" ||
            (trans.snap_token_expired_at && new Date(trans.snap_token_expired_at) < new Date())
        );
    };

    return (
        <div className="px-4 lg:px-20 mb-8 overflow-x-hidden">
            <div className="pt-28">
                <HeaderSection title="Detail Transaksi" showButton={false} />

                <div className="space-y-6 mt-4">
                    {transactions.map((trans: Transaction) => (
                        <div key={trans.id} className="border rounded-2xl p-6 bg-white">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold">{trans.ticket.title}</h2>
                                    <p className="text-sm text-gray-500">
                                        {formatDateTime(trans.order_date)}
                                    </p>
                                </div>
                                <Badge
                                    color={
                                        trans.status === "paid"
                                            ? "success"
                                            : isExpired(trans)
                                                ? "error"
                                                : trans.status === "canceled"
                                                    ? "error"
                                                    : "warning"
                                    }
                                    className="px-4 py-2"
                                >
                                    {trans.status === "paid"
                                        ? "Sudah Dibayar"
                                        : isExpired(trans)
                                            ? "Kedaluwarsa"
                                            : trans.status === "canceled"
                                                ? "Dibatalkan"
                                                : "Menunggu"}
                                </Badge>

                            </div>

                            {/* Detail Tiket */}
                            <h3 className="text-md font-semibold mb-2">Detail Tiket</h3>
                            <ul className="space-y-3">
                                <li className="flex justify-between items-start border-b pb-2">
                                    <div>
                                        <p className="font-medium">{trans.ticket.title}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {formatCurrency(trans.ticket.price)} × {trans.quantity}
                                        </p>
                                    </div>
                                    <div className="font-medium text-right">
                                        {formatCurrency(trans.ticket.price * trans.quantity)}
                                    </div>
                                </li>
                            </ul>

                            {/* Total */}
                            <div className="flex justify-end mt-4 gap-2">
                                <h3 className="font-bold text-lg">Subtotal:</h3>
                                <h1 className="font-bold text-lg">
                                    {formatCurrency(trans.total_price)}
                                </h1>
                            </div>

                            {/* Tombol Aksi */}
                            {trans.status === "pending" && !isExpired(trans) && (
                                <div className="flex flex-col-reverse sm:flex-row gap-4 mt-6">
                                    <Button
                                        variant="outline"
                                        className="border-primary text-primary hover:bg-gray-100 sm:w-1/2"
                                        onClick={() => handleCancel(trans.id)}
                                        disabled={loadingId === trans.id}
                                    >
                                        Batalkan
                                    </Button>
                                    <Button
                                        className="sm:w-1/2"
                                        onClick={() => handlePayNow(trans.id)}
                                        disabled={loadingId === trans.id}
                                    >
                                        {loadingId === trans.id ? "Memproses..." : "Bayar Sekarang"}
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
