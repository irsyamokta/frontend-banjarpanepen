import SectionCard from "../../cards/SectionCard";
import { getEvents } from "../../../services/eventService";
import BasicCardThree from "../../cards/basic/BasicCardThree";
import { formatCalendarDate } from "../../../utils/dateFormatter";

interface Event {
    id: string;
    title: string;
    thumbnail: string;
    date: string;
}

export default function EventSection() {
    return (
        <SectionCard<Event>
            queryKey="cardEvent"
            fetcher={getEvents}
            renderItem={(event) => (
                <BasicCardThree
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={formatCalendarDate(event.date)}
                    thumbnail={event.thumbnail}
                    label="Lihat Event"
                    basePath="agenda"
                />
            )}
        />
    );
}
