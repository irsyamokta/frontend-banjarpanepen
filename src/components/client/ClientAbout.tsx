import React from "react";
import aboutImage from "../../assets/img/img-about.png";

const ClientAbout: React.FC = () => {
  return (
    <section className="px-25 py-25">
      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-15">
        {/* Title Section */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#212529]">
            Mengenal Lebih Dekat
          </h2>
          <h3 className="text-2xl md:text-4xl font-extrabold text-[#087245]">
            Desa Banjarpanepen
          </h3>
        </div>

        {/* Description Section */}
        <div className="md:col-span-2">
          <p className="text-[#495057] text-base md:text-xl leading-relaxed text-justify">
            Desa Banjarpanepen merupakan salah satu desa yang terletak di
            Kecamatan Sumpiuh, Kabupaten Banyumas, Jawa Tengah. Dikenal dengan
            keasrian alamnya dan kekayaan tradisi budaya yang masih terjaga,
            Banjarpanepen kini berkembang sebagai destinasi wisata berbasis
            masyarakat yang mengedepankan nilai-nilai lokal dan pelestarian
            lingkungan.
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="mt-8">
        <img
          src={aboutImage}
          alt="Desa Banjarpanepen"
          className="rounded-lg w-full shadow-lg"
        />
      </div>
    </section>
  );
};

export default ClientAbout;
