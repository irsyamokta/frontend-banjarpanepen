import useSWR from "swr";
import { getTours } from "../../../services/tourService";

import Button from "../../ui/button/Button";
import BasicCardOne from "../../cards/basic/BasicCardOne";
import { LuArrowUpRight } from "react-icons/lu";

export default function Explore() {
    const { data: response } = useSWR("cardExplore", getTours, { suspense: true });
    const tours = response?.data || [];

    if (!tours.length) return null;

    return (
        <section className="px-6 md:px-12 lg:px-25">
            <div className="text-center">
                <h2
                    className="text-2xl md:text-title-md font-extrabold text-center"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <span className="text-primary">Eksplorasi Wisata</span>{" "}
                    Banjarpanepen
                </h2>
                <p
                    className="text-gray-600 text-sm md:text-lg leading-relaxed mt-4"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Nikmati beragam destinasi menarik dari alam yang asri hingga pengalaman budaya yang autentik
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-[40px]">
                {tours.slice(0, 3).map((tour: any) => (
                    <div
                        key={tour.id}
                        className="w-full md:w-[48%] lg:w-[30%] flex-shrink-0"
                    >
                        <BasicCardOne
                            id={tour.id}
                            title={tour.title}
                            location={tour.location}
                            thumbnail={tour.thumbnail}
                        />
                    </div>
                ))}
            </div>

            {tours.length > 3 && (
                <div className="text-center mt-[56px]">
                    <Button
                        size="xs"
                        variant="default"
                        onClick={() => window.open("/wisata", "_self")}
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        Lihat Semua <LuArrowUpRight size={24} />
                    </Button>
                </div>
            )}
        </section>
    );
}
