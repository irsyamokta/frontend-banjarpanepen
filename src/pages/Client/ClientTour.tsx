import PageMeta from "../../components/common/PageMeta";
import Hero from "../../components/common/Hero";

import heroImage from "../../assets/img/img-hero-wisata.png";
import TourSection from "../../components/section/tour/TourSection";

export default function ClientTour() {
    return (
        <>
            <PageMeta
                title="Wisata"
                description="Wisata"
            />
            <div className="flex flex-col">
                <Hero
                    title="Kalender Event Wisata Desa"
                    subtitle={`Temukan keajaiban alam, budaya, dan keramahan desa yang menanti untuk kamu jelajahi. \nSetiap sudut Banjarpanepen menawarkan pengalaman wisata yang berbeda dan bermakna`}
                    image={heroImage}
                    heightClass="h-[60vh]"
                    showButton={false}
                />
                <TourSection />
            </div>
        </>
    );
}