import PageMeta from "../../components/common/PageMeta";
import Hero from "../../components/common/Hero";

import heroImage from "../../assets/img/img-hero-agenda.png";
import EventSection from "../../components/section/event/EventSection";

export default function ClientEvent() {
    return (
        <>
            <PageMeta
                title="Agenda"
                description="Agenda"
            />
            <div className="flex flex-col">
                <Hero
                    title="Eksplorasi Wisata Banjarpanepen"
                    subtitle={`Saksikan beragam kegiatan budaya dan event lokal yang membawa \nsuasana desa menjadi semakin hangat dan meriah`}
                    image={heroImage}
                    heightClass="h-[60vh]"
                    showButton={false}
                />
                <EventSection/>
            </div>
        </>
    );
}