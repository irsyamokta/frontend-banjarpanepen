import useSWR from "swr";
import BasicCardFour from "../../cards/basic/BasicCardFour";
import { getTickets } from "../../../services/ticketService";

export default function Ticket() {
    const { data: response } = useSWR("cardTicket", getTickets);

    if (response?.data?.length === 0) return null;

    return (
        <section id="ticket" className="px-6 md:px-12 lg:px-25 py-12 bg-gray-50">
            <div className="text-center">
                <h2 className="text-2xl md:text-title-md font-extrabold text-center" data-aos="fade-up" data-aos-delay="100">
                    Temukan <span className="text-primary">Wisata</span> Sesuai Gaya Liburanmu
                </h2>
                <p className="text-gray-600 text-sm md:text-lg leading-relaxed mt-4" data-aos="fade-up" data-aos-delay="200">
                    Mulai dari wisata sehari penuh hingga live-in bersama warga lokal,
                    setiap wisata kami hadir <br />
                    untuk membawa kamu lebih dekat dengan alam dan budaya Banjarpanepen
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-[40px]">
                {response && response.data?.slice(0, 3).map((ticket: any) => (
                    <div key={ticket.id} className="w-full md:w-[48%] lg:w-[30%] flex-shrink-0">
                        <BasicCardFour
                            id={ticket.id}
                            cover={ticket.cover}
                            title={ticket.title}
                            location={ticket.location}
                            price={ticket.price}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
