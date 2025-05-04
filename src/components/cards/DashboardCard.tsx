import useSWR from "swr";

import { getTours } from "../../services/tourService";
import { getPackages } from "../../services/packageService";
import { getEvents } from "../../services/eventService";
import { getArticles } from "../../services/articleService";
import { getGalleries } from "../../services/galleryService";

import { LuTickets, LuCalendar, LuNewspaper, LuImage, LuMapPinned } from "react-icons/lu";

export default function DashboardCard() {
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

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 md:gap-6">
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
                    <LuTickets className="text-gray-800 size-6 dark:text-white/90" />
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

        </div>
    );
}