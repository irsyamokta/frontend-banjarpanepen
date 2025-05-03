import ImageHero from "../../assets/img/img-hero.png";
import Button from "../ui/button/Button";

const ClientHero: React.FC = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${ImageHero})` }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="text-white text-4xl md:text-7xl font-bold mb-8">
          Desa Wisata Banjarpanepen
        </h1>
        <p className="text-white text-lg md:text-2xl mb-15">
          Temukan keindahan alam yang memesona, kekayaan budaya lokal, <br />
          serta keramahan masyarakat di Desa Wisata Banjarpanepen
        </p>
        <Button className="text-[20px] px-8" type="button" variant="default" size="md" >
          Lihat Paket Wisata
        </Button>
      </div>
    </section>
  );
};

export default ClientHero;
