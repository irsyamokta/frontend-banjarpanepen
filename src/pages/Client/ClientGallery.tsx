import PageMeta from "../../components/common/PageMeta";
import Hero from "../../components/common/Hero";

import heroImage from "../../assets/img/img-hero-galeri.png";
import GallerySection from "../../components/section/gallery/GallerySection";

export default function ClientGallery() {
    return (
        <>
            <PageMeta
                title="Galeri"
                description="Jelajahi galeri visual yang menampilkan keindahan alam, aktivitas wisata, dan kehidupan sehari-hari di Desa Banjarpanepen melalui foto-foto yang memukau."
            />
            <div className="flex flex-col">
                <Hero
                    title="Cerita dalam Gambar"
                    subtitle={`Setiap foto menyimpan kisah. Jelajahi galeri visual kami yang merekam \nkeindahan dan aktivitas wisata di Desa Banjarpanepen`}
                    image={heroImage}
                    heightClass="h-[80vh] md:h-[60vh]"
                    showButton={false}
                />
                <GallerySection />
            </div>
        </>
    );
}