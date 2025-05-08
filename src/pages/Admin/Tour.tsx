import PageMeta from "../../components/common/PageMeta";
import TourCard from "../../components/cards/TourCard";

export default function Tour() {
    return (
        <>
            <PageMeta
                title="Wisata"
                description="Wisata"
            />
            <div className="grid grid-cols-1 gap-4 md:gap-6">
                <TourCard />
            </div>
        </>
    );
}