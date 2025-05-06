import { Link } from "react-router-dom";
import Button from "../../ui/button/Button";
import { LuArrowUpRight } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import ImageFallback from "../../ui/images/ImageFallback";

interface BasicCardThreeProps {
    id: string;
    title: string;
    date: string;
    thumbnail: string;
    label: string;
    basePath: string;
}

export default function BasicCardThree({
    id,
    title,
    date,
    thumbnail,
    label,
    basePath
}: BasicCardThreeProps) {
    return (
        <div className="w-full">

            <ImageFallback
                src={thumbnail}
                alt={title}
                className="w-full object-cover aspect-video rounded-2xl"
                fallbackClassName="aspect-video rounded-2xl"
            />

            <div className="mt-4">
                <h3 className="text-base font-bold text-gray-900 line-clamp-1">{title}</h3>
                <p className="text-base text-gray-500 flex items-center mt-2">
                    <LuCalendar className="mr-2 text-primary" size={24} />
                    {date}
                </p>

                <Link to={`/${basePath}/${id}`}>
                    <Button
                        variant="link"
                        size="none"
                    >
                        {label}
                        <LuArrowUpRight size={16} />
                    </Button>
                </Link>
            </div>
        </div>
    );
}