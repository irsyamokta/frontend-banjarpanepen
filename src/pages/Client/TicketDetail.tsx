import PageMeta from "../../components/common/PageMeta";
import TicketHistory from "../../components/ticket/UserTicket";

export default function Ticket() {
    return (
        <>
            <PageMeta
                title="Tiket"
                description="Tiket"
            />
            <TicketHistory />
        </>
    );
}
