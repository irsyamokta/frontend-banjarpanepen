import PageMeta from "../../components/common/PageMeta";
import Hero from "../../components/common/Hero";

import heroImage from "../../assets/img/img-hero-wisata.png";
import TourSection from "../../components/section/tour/TourSection";

export default function ClientTour() {
    return (
        <>
            <PageMeta
                title="Wisata"
                description="Jelajahi keindahan alam dan budaya Banjarpanepen melalui berbagai destinasi wisata yang menakjubkan. Temukan pengalaman wisata unik yang memperkaya perjalanan Anda di desa Banjarpanepen."
            />
            <div className="flex flex-col">
                <Hero
                    title="Eksplorasi Wisata Banjarpanepen"
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