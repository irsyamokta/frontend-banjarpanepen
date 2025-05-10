import useSWR from "swr";
import Button from "../../ui/button/Button";
import { LuArrowUpRight } from "react-icons/lu";
import { getGalleries } from "../../../services/galleryService";
import ImageFallback from "../../ui/images/ImageFallback";

export default function Gallery() {
    const { data: response } = useSWR("cardGalleries", getGalleries);

    return (
        <section className="px-6 md:px-12 lg:px-25 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="text-2xl md:text-title-md font-extrabold text-center lg:text-left" data-aos="fade-up" data-aos-delay="100">
                    <h2 className="break-words text-primary">Galeri Momen</h2>
                    <h2 className="break-words">Tak Terlupakan</h2>
                </div>

                <div className="lg:col-span-2 text-justify">
                    <p className="text-gray-600 md:text-lg leading-relaxed pl-0 lg:pl-20" data-aos="fade-up" data-aos-delay="100">
                        Lihat lebih dekat keajaiban alam, budaya, dan kehidupan sehari-hari
                        di Desa Banjarpanepen melalui kumpulan foto terbaik kami. Setiap
                        gambar menyimpan cerita yang siap kamu jelajahi secara langsung!
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-8">
                {response?.data?.slice(0, 4).map((gallery: any, index: number) => (
                    <div key={index} className="overflow-hidden rounded-xl" data-aos="zoom-in" data-aos-delay="100">
                        <ImageFallback
                            src={gallery.image}
                            alt={`gallery ${index+1}`}
                            className="w-full h-full object-cover aspect-5/4 rounded-2xl"
                            fallbackClassName="object-cover aspect-5/4 rounded-2xl"
                        />
                    </div>
                ))}
            </div>

            <div className="text-center mt-[56px]">
                <Button size="md" variant="default" onClick={() => window.open("/galeri", "_self")}>
                    Lihat Semua <LuArrowUpRight size={30} />
                </Button>
            </div>
        </section>
    );
}
