import PageMeta from "../../components/common/PageMeta";
import EventCard from "../../components/cards/EventCard";

export default function TourPackage() {
    return (
        <>
            <PageMeta
                title="Agenda Desa"
                description="Agenda Desa"
            />
            <div className="grid grid-cols-1 gap-4 md:gap-6">
                <EventCard />
            </div>
        </>
    );
}