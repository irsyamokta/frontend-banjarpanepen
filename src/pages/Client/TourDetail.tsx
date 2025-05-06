import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getTourById } from "../../services/tourService";
import PageShell from "../../components/common/PageShell";
import TourDetailContent from "../../components/section/tour/TourDetailContent";
// import { Spinner } from "../../components/ui/spinner/Spinner";


const fetcher = (id: string) => getTourById(id);

export default function TourDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { data: tour } = useSWR(id ? `tour-${id}` : null, () => fetcher(id!), {
        suspense: true,
    });

    if (!tour) return null;
    return (
        <PageShell title={tour.title} description="Detail Wisata">
            <TourDetailContent tour={tour} />
        </PageShell>
    );
}
