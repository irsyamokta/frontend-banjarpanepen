import { Link } from "react-router-dom";
import Button from "../../ui/button/Button";
import { LuSquareCheck, LuCalendar, LuArrowUpRight } from "react-icons/lu";
import ImageFallback from "../../ui/images/ImageFallback";

interface PackageCardProps {
    image: string;
    title: string;
    price: string;
    benefits: string[];
    // duration: string;
}

export default function BasicCardTwo({
    image,
    title,
    price,
    benefits,
}: PackageCardProps) {
    return (
        <div>
            <ImageFallback
                src={image}
                alt={title}
                className="w-full object-cover aspect-5/3 rounded-2xl"
                fallbackClassName="aspect-5/3 rounded-2xl"
            />

            <div>
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

                {/* <div className="mt-4">
                    <h4 className="text-xl font-semibold">Durasi</h4>
                    <p className="flex items-center text-xl text-[#495057] mt-2">
                        <LuCalendar className="mr-2 text-[#087245]" size={25} />
                        {duration}
                    </p>
                </div> */}

                <div className="mt-6">
                    <Link to={"https://wa.me/628123456789"} target="_blank">
                        <Button className="w-full" size="xs" variant="default">
                            Pilih Paket <LuArrowUpRight size={30} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
