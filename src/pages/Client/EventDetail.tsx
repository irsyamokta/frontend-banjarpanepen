import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getEventById } from "../../services/eventService";
import PageShell from "../../components/common/PageShell";
import EventDetailContent from "../../components/section/event/EventDetailContent";
// import { Spinner } from "../../components/ui/spinner/Spinner";

const fetcher = (id: string) => getEventById(id);

export default function EventDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { data: event } = useSWR(id ? `event-${id}` : null, () => fetcher(id!), {
        suspense: true,
    });

    if (!event) return null;
    return (
        <PageShell title={event.title} description="Detail lengkap tentang event dan agenda di Banjarpanepen. Temukan informasi waktu, lokasi, dan kegiatan yang akan berlangsung dalam acara ini untuk pengalaman yang lebih mendalam.">
            <EventDetailContent article={event} />
        </PageShell>
    );
}
