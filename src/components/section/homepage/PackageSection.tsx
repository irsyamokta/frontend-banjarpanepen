import useSWR from "swr";
import BasicCardTwo from "../../cards/basic/BasicCardTwo";
import { getPackages } from "../../../services/packageService";
import { formatCurrency } from "../../../utils/currencyFormatter";

export default function Package() {
    const { data: response } = useSWR("cardPackage", getPackages);

    return (
        <section id="packages" className="px-6 md:px-12 lg:px-25 py-12 bg-gray-50">
            <div className="text-center">
                <h2 className="text-2xl md:text-title-md font-extrabold text-center" data-aos="fade-up" data-aos-delay="100">
                    Temukan <span className="text-primary">Paket Wisata</span> Sesuai Gaya Liburanmu
                </h2>
                <p className="text-gray-600 text-sm md:text-lg leading-relaxed mt-4" data-aos="fade-up" data-aos-delay="200">
                    Mulai dari wisata sehari penuh hingga live-in bersama warga lokal,
                    setiap paket kami hadir <br />
                    untuk membawa kamu lebih dekat dengan alam dan budaya Banjarpanepen
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[40px]">
                {response && response.data?.slice(0, 3).map((pkg: any) => (
                    <BasicCardTwo
                        key={pkg.id}
                        image={pkg.thumbnail}
                        title={pkg.title}
                        price={formatCurrency(pkg.price)}
                        benefits={pkg.benefit.split(",")}
                    />
                ))}
            </div>
        </section>
    );
}
