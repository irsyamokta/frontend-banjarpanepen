import PageMeta from "../../components/common/PageMeta";
import About from "../../components/section/homepage/AboutSection";
import Explore from "../../components/section/homepage/ExploreSection";
import Hero from "../../components/common/Hero";
import Package from "../../components/section/homepage/PackageSection";
import Gallery from "../../components/section/homepage/GallerySection";

import heroImage from "../../assets/img/img-hero.png";

export default function Homepage() {
    return (
        <>
            <PageMeta
                title="Beranda"
                description="Beranda"
            />
            <div className="flex flex-col gap-4 md:gap-6">
                <Hero
                    title="Desa Wisata Banjarpanepen"
                    subtitle={`Temukan keindahan alam yang memesona, kekayaan budaya lokal, \nserta keramahan masyarakat di Desa Wisata Banjarpanepen`}
                    image={heroImage}
                />
                <About />
                <Explore />
                <Package />
                <Gallery />
            </div>
        </>
    );
}