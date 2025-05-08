
import useSWR from "swr";
import { getTours } from "../../../services/tourService";

import Button from "../../ui/button/Button";
import BasicCardOne from "../../cards/basic/BasicCardOne";

import { LuArrowUpRight } from "react-icons/lu";


export default function Explore() {
    const { data: response } = useSWR("cardExplore", getTours, { suspense: true });
    
    return (
        <section className="px-6 md:px-12 lg:px-25">
            <div className="text-center">
                <h2 className="text-2xl md:text-title-md font-extrabold text-center" data-aos="fade-up" data-aos-delay="100">
                    <span className="text-primary">Eksplorasi Wisata</span>{" "}
                    Banjarpanepen
                </h2>
                <p className="text-gray-600 md:text-lg leading-relaxed mt-4" data-aos="fade-up" data-aos-delay="200">
                    Nikmati beragam destinasi menarik dari alam yang asri hingga pengalaman budaya yang autentik
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[40px]">
                {response && response.data?.slice(0, 3).map((tour: any) => (
                    <BasicCardOne
                        key={tour.id}
                        id={tour.id}
                        title={tour.title}
                        location={tour.location}
                        thumbnail={tour.thumbnail}
                    />
                ))}
            </div>

            <div className="text-center mt-[56px]">
                <Button size="md" variant="default" onClick={() => window.open("/wisata", "_self")}>
                    Lihat Semua <LuArrowUpRight size={30} />
                </Button>
            </div>
        </section>
    );
}