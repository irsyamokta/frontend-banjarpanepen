import { useState } from "react";
import { FiCalendar, FiClock, FiTag } from "react-icons/fi";
import Button from "../../ui/button/Button";
import InfoCard from "../../cards/InfoCard";
import { formatCurrency } from "../../../utils/currencyFormatter";
import { PiMapPinSimpleAreaBold } from "react-icons/pi";
import { formatCalendarDate } from "../../../utils/dateFormatter";
import ImageFallback from "../../ui/images/ImageFallback";

interface Event {
    title: string;
    description?: string;
    thumbnail: string;
    date: string;
    time: string;
    price: number;
    place: string;
}

interface EventDetailContentProps {
    article: Event;
}

export default function EventDetailContent({ article: event }: EventDetailContentProps) {
    const [showMore, setShowMore] = useState(false);

    return (
        <>
            {/* Thumbnail */}
            <div className="w-full h-64 md:h-96 overflow-hidden rounded-xl">
                <ImageFallback
                    src={event.thumbnail}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    fallbackClassName="h-full object-cover"
                />
            </div>

            {/* Title + Location + About + InfoCard */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* About */}
                <div className="flex-1">
                    <h1 className="text-2xl md:text-title-md font-bold mb-3 md:mb-5">
                        {event.title}
                    </h1>
                    <p className="flex text-sm text-gray-600 mb-4">
                        <PiMapPinSimpleAreaBold
                            className="mr-3 text-primary w-5 h-5 flex-shrink-0"
                        />
                        {event.place}
                    </p>
                    <hr className="mt-4 mb-4 border-t-2" />
                    <div className="text-sm leading-relaxed text-gray-800">
                        <p className={showMore ? "" : "line-clamp-3"}>{event.description}</p>
                        <Button
                            size="none"
                            variant="link"
                            onClick={() => setShowMore((s) => !s)}
                        >
                            {showMore ? "Lihat lebih sedikit" : "Lihat semua"}
                        </Button>
                    </div>
                </div>
                {/* InfoCard */}
                <div className="flex-none w-full md:w-72 lg:w-80">
                    <InfoCard
                        title="Informasi Acara"
                        items={[
                            {
                                label: "Tanggal",
                                value: `${formatCalendarDate(event.date)}`,
                                icon: FiCalendar,
                            },
                            {
                                label: "Waktu",
                                value: `${event.time} WIB`,
                                icon: FiClock,
                            },
                            {
                                label: "Harga Tiket Masuk",
                                value: `${event.price ? `${formatCurrency(event.price) } / orang` : "Gratis"}`,
                                icon: FiTag,
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    );
}
