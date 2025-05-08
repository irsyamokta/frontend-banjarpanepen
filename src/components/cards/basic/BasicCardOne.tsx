import { Link } from "react-router-dom";
import Button from "../../ui/button/Button";
import { LuArrowUpRight } from "react-icons/lu";
import { PiMapPinSimpleAreaBold } from "react-icons/pi";
import ImageFallback from "../../ui/images/ImageFallback";

interface BasicCardOneProps {
    id: string
    title: string;
    location: string;
    thumbnail: string;
}

export default function BasicCardOne({ id, title, location, thumbnail }: BasicCardOneProps) {
    return (
        <div data-aos="zoom-in-up">
            <ImageFallback
                src={thumbnail}
                alt={title}
                className="w-full object-cover aspect-[5/6] rounded-2xl"
                fallbackClassName="object-cover aspect-[5/6] rounded-2xl"
            />

            <div className="flex items-center justify-between py-4">
                <div>
                    <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                        {title}
                    </h3>
                    <p className="text-base text-gray-500 flex items-center mt-2">
                        <PiMapPinSimpleAreaBold
                            className="mr-3 text-primary flex-shrink-0"
                            size={24}
                        />
                        <span className="line-clamp-1 flex-1 min-w-0">{location}</span>
                    </p>
                </div>

                <Link to={`/wisata/${id}`}>
                    <Button className="items-center" size="square" variant="default">
                        <LuArrowUpRight size={24} />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
