import React from "react";
import Card from "../cards/PaketWisataCard";

import ImagePaketWisata1 from "../../assets/img/img-paketwisata-1.png";
import ImagePaketWisata2 from "../../assets/img/img-paketwisata-2.png";
import ImagePaketWisata3 from "../../assets/img/img-paketwisata-3.png"; 

const packages = [
  {
    image: ImagePaketWisata1,
    title: "Sehari Bersama Alam Banjarpanepen",
    price: "Rp120.000",
    benefits: [
      "Trekking ringan ke Bukit Watu Gajah",
      "Berkunjung ke Mata Air Sendang Tirta",
      "Jelajah sawah dan kebun rakyat",
      "Dokumentasi wisata (foto/video)",
    ],
    duration: "1 Hari",
  },
  {
    image: ImagePaketWisata2,
    title: "Live In & Hidup Seperti Warga Desa",
    price: "Rp125.000",
    benefits: [
      "Menginap 1 malam di homestay",
      "Membajak sawah atau menanam padi",
      "Memasak bersama tuan rumah",
      "Berpartisipasi dalam sesi kesenian desa",
    ],
    duration: "2 Hari 1 Malam",
  },
  {
    image: ImagePaketWisata3,
    title: "Wisata Edukasi Pertanian Organik",
    price: "Rp130.000",
    benefits: [
      "Mengenal sistem tanam organik",
      "Praktek menanam, merawat, dan memanen",
      "Membuat pupuk organik sederhana",
      "Edukasi daur ulang limbah pertanian",
    ],
    duration: "1 Hari",
  },
];

const ClientPaketWisata: React.FC = () => {
  return (
    <section className="px-6 md:px-12 lg:px-25 py-12 bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl md:text-5xl font-extrabold text-[#212529]">
          Temukan <span className="text-[#087245]">Paket Wisata</span> Sesuai
          Gaya Liburanmu
        </h2>
        <p className="text-[#495057] text-base md:text-2xl mt-[16px] leading-relaxed">
          Mulai dari wisata sehari penuh hingga live-in bersama warga lokal,
          setiap paket kami hadir <br />
          untuk membawa kamu lebih dekat dengan alam dan budaya Banjarpanepen
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[40px]">
        {packages.map((pkg, index) => (
          <Card
            key={index}
            image={pkg.image}
            title={pkg.title}
            price={pkg.price}
            benefits={pkg.benefits}
            duration={pkg.duration}
          />
        ))}
      </div>
    </section>
  );
};

export default ClientPaketWisata;
