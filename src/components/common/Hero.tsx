import { useHandleNavigate } from "../../hooks/useHandleNavigate";
import Button from "../ui/button/Button";

interface HeroProps {
    title: string;
    subtitle: string;
    image: string;
    showButton?: boolean;
    heightClass?: string;
}

export default function Hero({
    title,
    subtitle,
    image,
    showButton = true,
    heightClass = "h-screen",
}: HeroProps) {

    const handleNavigate = useHandleNavigate();

    return (
        <section
            className={`relative w-full ${heightClass} bg-cover bg-center`}
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-white text-title-md md:text-title-xl font-bold mb-8">
                    {title}
                </h1>
                <p className="text-gray-200 text-sm md:text-lg mb-6">
                    {subtitle.split("\n").map((line, index) => (
                        <span key={index} className="block">
                            {line}
                        </span>
                    ))}
                </p>
                {showButton && (
                    <Button type="button" variant="default" size="md" onClick={() => handleNavigate("#packages")}>
                        Lihat Paket Wisata
                    </Button>
                )}
            </div>
        </section>
    );
}