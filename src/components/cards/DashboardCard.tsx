import { useState } from "react";
import useSWR from "swr";
import Swal from "sweetalert2";

import { getTours } from "../../services/tourService";
import { getPackages } from "../../services/packageService";
import { getTickets } from "../../services/ticketService";
import { getEvents } from "../../services/eventService";
import { getArticles } from "../../services/articleService";
import { getGalleries } from "../../services/galleryService";
import { scanOrder, getVisitorOrders } from "../../services/orderService";

import ModalScanTicket from "../../components/modal/ModalScanTicket";
import VisitorTable from "../tables/VisitorTable";

import { LuTickets, LuCalendar, LuNewspaper, LuImage, LuMapPinned, LuUsers } from "react-icons/lu";
import { PiBackpackBold } from "react-icons/pi";
import { BiQrScan } from "react-icons/bi";

export default function DashboardCard() {
    const [openScan, setOpenScan] = useState(false);

    const { data: tourRequestsData } = useSWR('totalTour', getTours, {
        suspense: true,
        revalidateOnMount: true,
        fallbackData: { total: 0 },
    });
    const { data: packageRequestsData } = useSWR('totalPackage', getPackages, {
        suspense: true,
        revalidateOnMount: true,
        fallbackData: { total: 0 },
    });
    const { data: ticketRequestsData } = useSWR('totalTicket', getTickets, {
        suspense: true,
        revalidateOnMount: true,
        fallbackData: { total: 0 },
    });
    const { data: eventRequestsData } = useSWR('totalEvent', getEvents, {
        suspense: true,
        revalidateOnMount: true,
        fallbackData: { total: 0 },
    });
    const { data: articleRequestsData } = useSWR('totalArticle', getArticles, {
        suspense: true,
        revalidateOnMount: true,
        fallbackData: { total: 0 },
    });
    const { data: imageRequestsData } = useSWR('totalImage', getGalleries, {
        suspense: true,
        revalidateOnMount: true,
        fallbackData: { total: 0 },
    });
    const { data: visitorRequestsData, mutate: mutateVisitor } = useSWR('totalVisitor', getVisitorOrders, {
        suspense: true,
        revalidateOnMount: true,
        fallbackData: { total: 0 },
    });
    const { data: visitorData, mutate } = useSWR('visitors', getVisitorOrders, {
        suspense: true,
        revalidateOnMount: true,
    });


    const handleScan = async (value: string) => {
        try {
            const response = await scanOrder(value);
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: response.message || "Tiket berhasil digunakan",
                timer: 2000,
                showConfirmButton: false,
            });
            mutate();
            mutateVisitor();
            setOpenScan(false);
        } catch (error: any) {
            const message =
                error.response?.data?.message || "Terjadi kesalahan saat memindai tiket";
            Swal.fire({
                icon: "error",
                title: "Gagal!",
                text: message,
                confirmButtonColor: "#087245",
            });
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
                {/* Total Wisata */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                        <LuMapPinned className="text-gray-800 size-6 dark:text-white/90" />
                    </div>

                    <div className="flex items-end justify-between mt-5">
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Wisata
                            </span>
                            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                                {tourRequestsData.total}
                            </h4>
                        </div>
                    </div>
                </div>

                {/* Total Paket Wisata */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                        <PiBackpackBold className="text-gray-800 size-6 dark:text-white/90" />
                    </div>

                    <div className="flex items-end justify-between mt-5">
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Paket Wisata
                            </span>
                            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                                {packageRequestsData.total}
                            </h4>
                        </div>
                    </div>
                </div>

                {/* Total Tiket */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                        <LuTickets className="text-gray-800 size-6 dark:text-white/90" />
                    </div>

                    <div className="flex items-end justify-between mt-5">
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Tiket
                            </span>
                            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                                {ticketRequestsData.total}
                            </h4>
                        </div>
                    </div>
                </div>

                {/* Total Visitor */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                        <LuUsers className="text-gray-800 size-6 dark:text-white/90" />
                    </div>

                    <div className="flex items-end justify-between mt-5">
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Pengunjung
                            </span>
                            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                                {visitorRequestsData.total}
                            </h4>
                        </div>
                    </div>
                </div>

                {/* Total Artikel */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                        <LuNewspaper className="text-gray-800 size-6 dark:text-white/90" />
                    </div>

                    <div className="flex items-end justify-between mt-5">
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Artikel
                            </span>
                            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                                {articleRequestsData.total}
                            </h4>
                        </div>
                    </div>
                </div>

                {/* Total Agenda */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                        <LuCalendar className="text-gray-800 size-6 dark:text-white/90" />
                    </div>

                    <div className="flex items-end justify-between mt-5">
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Agenda Desa
                            </span>
                            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                                {eventRequestsData.total}
                            </h4>
                        </div>
                    </div>
                </div>

                {/* Total Galeri */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                        <LuImage className="text-gray-800 size-6 dark:text-white/90" />
                    </div>

                    <div className="flex items-end justify-between mt-5">
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Galeri
                            </span>
                            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                                {imageRequestsData.total}
                            </h4>
                        </div>
                    </div>
                </div>

                {/* Scan Button */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                        <BiQrScan className="text-gray-800 size-6 dark:text-white/90" />
                    </div>

                    <div className="flex flex-col mt-5">
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Pindai
                            </span>
                        </div>
                        <ModalScanTicket
                            open={openScan}
                            onClose={() => setOpenScan(false)}
                            onResult={(value) => handleScan(value)}
                        />
                        <button onClick={() => setOpenScan(true)} className="mt-4 text-sm bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md">
                            Pindai Tiket
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <VisitorTable data={visitorData.data} />
            </div>
        </>
    );
}