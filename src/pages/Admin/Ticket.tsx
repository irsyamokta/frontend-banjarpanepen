import PageMeta from "../../components/common/PageMeta";
import TicketCard from "../../components/cards/TicketCard";

export default function Ticket() {
    return (
        <>
            <PageMeta
                title="Tiket Wisata"
                description="Tiket Wisata"
            />
            <div className="grid grid-cols-1 gap-4 md:gap-6">
                <TicketCard/>
            </div>
        </>
    );
}