import { Link } from "react-router-dom";
import Button from "../../ui/button/Button";
import { LuSquareCheck, LuArrowUpRight } from "react-icons/lu";
import ImageFallback from "../../ui/images/ImageFallback";
import useUserContact from "../../../hooks/useUserContact";

interface PackageCardProps {
    image: string;
    title: string;
    price: string;
    benefits: string[];
}

export default function BasicCardTwo({
    image,
    title,
    price,
    benefits,
}: PackageCardProps) {
    const { contact } = useUserContact();

    return (
        <div data-aos="zoom-in-up" className="flex flex-col h-full">
            <ImageFallback
                src={image}
                alt={title}
                className="w-full object-cover aspect-5/3 rounded-2xl"
                fallbackClassName="aspect-5/3 rounded-2xl"
            />

            <div className="flex flex-col flex-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-6 line-clamp-1">{title}</h3>
                <p className="text-2xl md:text-3xl font-extrabold text-primary mt-4">
                    {price}
                </p>
                <hr className="my-4 border-t-2" />
                <div>
                    <h4 className="text-base font-bold text-gray-700 mb-3">
                        Apa yang kamu dapatkan?
                    </h4>
                    <ul className="space-y-2">
                        {benefits.map((benefit, index) => (
                            <li
                                key={index}
                                className="flex items-center text-base text-gray-600"
                            >
                                <LuSquareCheck className="text-primary mr-2" size={25} />
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto pt-6">
                    <Link
                        to={`https://wa.me/${contact?.phone}?text=${encodeURIComponent(
                            `Halo, saya tertarik dengan paket *${title}* seharga ${price}. Bisa dijelaskan lebih lanjut?\n\nBerikut benefit yang saya lihat:\n${benefits.map((b) => `- ${b}`).join("\n")}`
                        )}`}
                        target="_blank"
                    >
                        <Button className="w-full flex items-center justify-center gap-2" size="xs" variant="default">
                            Pilih Paket <LuArrowUpRight size={30} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
