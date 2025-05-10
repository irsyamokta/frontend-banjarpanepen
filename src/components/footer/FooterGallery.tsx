import useSWR from "swr";
import { getGalleries } from "../../services/galleryService";

function FooterGallery() {
    const { data: response } = useSWR("footerGallery", getGalleries);

    const sortedImages = response?.data
        ?.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4);

    return (
        <div className="text-center justify-center md:justify-self-end md:text-left">
            <h4 className="text-lg md:text-xl text-gray-100 font-bold mb-4">Galeri</h4>
            <div className="grid grid-cols-2 gap-4">
                {sortedImages?.map((image: any, index: number) => (
                    <div key={index} className="overflow-hidden">
                        <img
                            src={image.image}
                            alt={`Gallery Image ${index + 1}`}
                            className="w-full object-cover aspect-5/4 rounded-xl"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FooterGallery;