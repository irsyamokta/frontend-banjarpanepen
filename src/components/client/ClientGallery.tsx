import React from "react";
import Button from "../ui/button/Button";

import galleryImage1 from "../../assets/img/img-galeri-3.png";
import galleryImage2 from "../../assets/img/img-galeri-4.png";

import { LuArrowUpRight } from "react-icons/lu";

const IMAGES = [galleryImage1, galleryImage2, galleryImage2, galleryImage1];

const ClientGallery: React.FC = () => {
  return (
    <section className="px-6 md:px-12 lg:px-25 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="space-y-4 text-2xl md:text-5xl font-extrabold text-center lg:text-left">
          <h2 className="break-words text-[#087245]">Galeri Momen</h2>
          <h2 className="break-words">Tak Terlupakan</h2>
        </div>

        <div className="lg:col-span-2 text-justify ">
          <p className="text-[#495057] text-base md:text-lg lg:text-2xl leading-relaxed pl-0 lg:pl-20">
            Lihat lebih dekat keajaiban alam, budaya, dan kehidupan sehari-hari
            di Desa Banjarpanepen melalui kumpulan foto terbaik kami. Setiap
            gambar menyimpan cerita yang siap kamu jelajahi secara langsung!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {IMAGES.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-xl">
            <img
              src={image}
              className="w-full object-cover aspect-5/4 rounded-2xl"
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-[56px]">
        <Button className="text-white text-[20px] px-10">
          Lihat Semua <LuArrowUpRight size={30} />
        </Button>
      </div>
    </section>
  );
};

export default ClientGallery;
