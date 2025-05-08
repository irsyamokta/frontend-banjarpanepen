import SectionCard from "../../cards/SectionCard";
import { getTours } from "../../../services/tourService";
import BasicCardOne from "../../cards/basic/BasicCardOne";

interface Tour {
    id: string;
    title: string;
    location: string;
    thumbnail: string;
}

export default function TourSection() {
    return (
        <SectionCard<Tour>
            queryKey="cardTour"
            fetcher={getTours}
            renderItem={(tour) => (
                <BasicCardOne
                    key={tour.id}
                    id={tour.id}
                    title={tour.title}
                    location={tour.location}
                    thumbnail={tour.thumbnail}
                />
            )}
        />
    );
}
