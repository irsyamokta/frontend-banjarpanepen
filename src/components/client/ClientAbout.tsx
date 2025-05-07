import React from "react";
import aboutImage from "../../assets/img/img-about.png";

const ClientAbout: React.FC = () => {
  return (
    <section className="px-6 md:px-12 lg:px-25 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div
          className="space-y-4 text-2xl md:text-5xl font-extrabold text-center lg:text-left"
          data-aos="fade-right">
          <h2 className="break-words">Mengenal Lebih Dekat</h2>
          <h2 className="text-[#087245] break-words">Desa Banjarpanepen</h2>
        </div>

        <div className="lg:col-span-2 text-justify ">
          <p className="text-[#495057] text-base md:text-lg lg:text-2xl leading-relaxed pl-0 lg:pl-20">
            Desa Banjarpanepen merupakan salah satu desa yang terletak di
            Kecamatan Sumpiuh, Kabupaten Banyumas, Jawa Tengah. Dikenal dengan
            keasrian alamnya dan kekayaan tradisi budaya yang masih terjaga,
            Banjarpanepen kini berkembang sebagai destinasi wisata berbasis
            masyarakat yang mengedepankan nilai-nilai lokal dan pelestarian
            lingkungan.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <img
          src={aboutImage}
          alt="Desa Banjarpanepen"
          className="rounded-2xl w-full shadow-lg"
        />
      </div>
    </section>
  );
};

export default ClientAbout;
