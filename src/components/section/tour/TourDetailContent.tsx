// src/components/tour/TourDetailContent.tsx
import { useState } from "react";
import { PiCheck, PiMapPinSimpleAreaBold } from "react-icons/pi";
import { FiCalendar, FiClock, FiTag } from "react-icons/fi";
import Button from "../../ui/button/Button";
import InfoCard from "../../cards/InfoCard";
import { formatCurrency } from "../../../utils/currencyFormatter";
import MapEmbed from "../../common/MapEmbed";
import ImageFallback from "../../ui/images/ImageFallback";

interface Tour {
    title: string;
    description?: string;
    thumbnail: string;
    location: string;
    about: string;
    operational: string
    start: string;
    end: string;
    price: number;
    facility: string;
    maps: string;
}

interface TourDetailContentProps {
    tour: Tour;
}

export default function TourDetailContent({ tour }: TourDetailContentProps) {
    const [showMore, setShowMore] = useState(false);
    const facilities = tour.facility.split(",").map((f) => f.trim());

    return (
        <>
            {/* Thumbnail */}
            <div className="w-full h-64 md:h-96 overflow-hidden rounded-xl">
                <ImageFallback
                    src={tour.thumbnail}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                    fallbackClassName="h-full object-cover"
                />
            </div>

            {/* Title + Location + About + InfoCard */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* About */}
                <div className="flex-1">
                    <h1 className="text-2xl md:text-title-md font-bold mb-3 md:mb-5">
                        {tour.title}
                    </h1>
                    <p className="flex text-gray-600 mb-4">
                        <PiMapPinSimpleAreaBold
                            className="mr-3 text-primary"
                            size={24}
                        />
                        {tour.location}
                    </p>
                    <hr className="mt-4 mb-4 border-t-2" />
                    <div className="text-sm leading-relaxed text-gray-800">
                        <p className={showMore ? "" : "line-clamp-3"}>{tour.about}</p>
                        <Button
                            size="none"
                            variant="link"
                            onClick={() => setShowMore((s) => !s)}
                        >
                            {showMore ? "Lihat lebih sedikit" : "Lihat semua"}
                        </Button>
                    </div>
                    <hr className="mt-4 border-t-2" />
                </div>
                {/* InfoCard */}
                <div className="flex-none w-full md:w-72 lg:w-80">
                    <InfoCard
                        title="Informasi Wisata"
                        items={[
                            {
                                label: "Operasional",
                                value: tour.operational
                                    .split(",")
                                    .map((d) => d.trim())
                                    .join(", "),
                                icon: FiCalendar,
                            },
                            {
                                label: "Jam",
                                value: `${tour.start} - ${tour.end} WIB`,
                                icon: FiClock,
                            },
                            {
                                label: "Harga Tiket Masuk",
                                value: `${formatCurrency(tour.price)} / orang`,
                                icon: FiTag,
                            },
                        ]}
                    />
                </div>
            </div>

            {/* Fasilitas */}
            <div>
                <h2 className="text-lg font-semibold mb-4">
                    Apa aja yang ada di sini?
                </h2>
                <div className="lg:w-1/4 grid grid-cols-2 gap-x-2 gap-y-3 text-sm text-gray-700">
                    {facilities.map((item, idx) => (
                        <div className="flex items-center space-x-1" key={idx}>
                            <PiCheck size={18} className="text-primary" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="mt-4 mb-4 border-t-2" />

            {/* Peta */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">
                    Kamu bakal ada di sini
                </h2>
                <MapEmbed embedUrl={tour.maps} className="w-full h-96 rounded-xl" />
            </div>
        </>
    );
}
