// src/components/common/MapEmbed.tsx
interface MapEmbedProps {
    embedUrl: string;
    srcOrLocation?: string;
    className?: string;
}

export default function MapEmbed({ embedUrl, className }: MapEmbedProps) {
    if (!embedUrl) {
        return (
            <div className={`w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 ${className}`}>
                Peta Lokasi Tidak Tersedia
            </div>
        );
    }

    return (
        <iframe
            src={embedUrl}
            className={className || "w-full h-96 rounded-xl"}
            loading="lazy"
            allowFullScreen
            title="Peta Lokasi"
        />
    );
}
