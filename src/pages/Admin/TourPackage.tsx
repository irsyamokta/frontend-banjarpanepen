import PageMeta from "../../components/common/PageMeta";
import TourPackageCard from "../../components/cards/TourPackageCard";

export default function TourPackage() {
    return (
        <>
            <PageMeta
                title="Paket Wisata"
                description="Tour Package"
            />
            <div className="grid grid-cols-1 gap-4 md:gap-6">
                <TourPackageCard />
            </div>
        </>
    );
}