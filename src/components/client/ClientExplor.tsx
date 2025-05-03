import Card from "../cards/ExploreCard";
import Button from "../ui/button/Button";

import ImageExplore1 from "../../assets/img/img-explor-1.png";
import ImageExplore2 from "../../assets/img/img-explor-2.png";
import ImageExplore3 from "../../assets/img/img-explor-3.png";

import { LuArrowUpRight } from "react-icons/lu";

const destinations = [
  {
    title: "Bukit Watu Gajah",
    location: "Dusun Kaliputih",
    image: ImageExplore1,
  },
  {
    title: "Sumber Mata Air Sendang Tirta",
    location: "Dusun Karanganyar",
    image: ImageExplore2,
  },
  {
    title: "Galeri Budaya Banjarpanepen",
    location: "Balai Budaya Desa",
    image: ImageExplore3,
  },
];

const ClientExplor: React.FC = () => {
  return (
    <section className="px-6 md:px-12 lg:px-25">
      <div className="text-center">
        <h2 className="text-2xl md:text-5xl font-extrabold text-[#212529]">
          <span className="text-[#087245]">Eksplorasi Wisata</span>{" "}
          Banjarpanepen
        </h2>
        <p className="text-[#495057] text-base md:text-2xl mt-[16px] leading-relaxed">
          Nikmati beragam destinasi menarik dari alam yang asri <br />
          hingga pengalaman budaya yang autentik
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[40px]">
        {destinations.map((destination, index) => (
          <Card
            key={index}
            title={destination.title}
            location={destination.location}
            image={destination.image}
          />
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

export default ClientExplor;
