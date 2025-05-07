import PageMeta from "../../components/common/PageMeta";
import Hero from "../../components/common/Hero";

import heroImage from "../../assets/img/img-hero-galeri.png";
import GallerySection from "../../components/section/gallery/GallerySection";

export default function ClientGallery() {
    return (
        <>
            <PageMeta
                title="Galeri"
                description="Galeri"
            />
            <div className="flex flex-col">
                <Hero
                    title="Cerita dalam Gambar"
                    subtitle={`Setiap foto menyimpan kisah. Jelajahi galeri visual kami yang merekam \nkeindahan dan aktivitas wisata di Desa Banjarpanepen`}
                    image={heroImage}
                    heightClass="h-[60vh]"
                    showButton={false}
                />
                <GallerySection/>
            </div>
        </>
    );
}