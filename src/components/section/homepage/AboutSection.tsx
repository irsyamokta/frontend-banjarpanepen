import aboutImage from "../../../assets/img/img-about.png";

export default function About() {
    return (
        <section className="px-6 md:px-12 lg:px-25 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="text-2xl md:text-title-md font-extrabold text-center lg:text-left" data-aos="fade-right" data-aos-delay="100">
                    <h2 className="break-words">Mengenal Lebih Dekat</h2>
                    <h2 className="text-primary break-words">Desa Banjarpanepen</h2>
                </div>

                <div className="lg:col-span-2 text-justify" data-aos="fade-left" data-aos-delay="100">
                    <p className="text-gray-600 md:text-lg leading-relaxed pl-0 lg:pl-20">
                        Desa Banjarpanepen merupakan salah satu desa yang terletak di Kecamatan Sumpiuh, Kabupaten Banyumas, Jawa Tengah. Dikenal dengan keasrian alamnya dan kekayaan tradisi budaya yang masih terjaga, Banjarpanepen kini berkembang sebagai destinasi wisata berbasis masyarakat yang mengedepankan nilai-nilai lokal dan pelestarian lingkungan.
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <img
                    src={aboutImage}
                    alt="Desa Banjarpanepen"
                    className="rounded-2xl w-full shadow-lg"
                    data-aos="fade-up" data-aos-delay="400" data-aos-offset="300"
                />
            </div>
        </section>
    );
}