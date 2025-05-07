import PageMeta from "../../components/common/PageMeta";
import ImageGalleryCard from "../../components/cards/ImageGalleryCard";

export default function Gallery() {
    return (
        <>
            <PageMeta
                title="Agenda Desa"
                description="Agenda Desa"
            />
            <div className="grid grid-cols-1 gap-4 md:gap-6">
                <ImageGalleryCard />
            </div>
        </>
    );
}