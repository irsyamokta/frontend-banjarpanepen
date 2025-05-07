import useSWR from "swr";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { getGalleries } from "../../../services/galleryService";
import ImageFallback from "../../ui/images/ImageFallback";
import { IGalleryPayload } from "../../../types";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Gallery() {
    const { data: response } = useSWR("cardGalleries", getGalleries);

    useEffect(() => {
        AOS.init();
      }, []);

    return (
      <section className="px-6 md:px-12 lg:px-25 py-12">
        <PhotoProvider>
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {response?.data?.map((item: IGalleryPayload) => (
              <PhotoView key={item.id} src={item.image}>
                <div
                  className="relative break-inside-avoid overflow-hidden rounded-xl group cursor-zoom-in"
                  data-aos="zoom-in"
                  data-aos-duration="2000"
                >
                  <ImageFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    fallbackClassName="aspect-video"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 rounded-xl">
                    <div className="text-white text-sm">
                      <h1 className="font-semibold">{item.title}</h1>
                      <p className="text-xs line-clamp-1">{item.caption}</p>
                    </div>
                  </div>
                </div>
              </PhotoView>
            ))}
          </div>
        </PhotoProvider>
      </section>
    );
}