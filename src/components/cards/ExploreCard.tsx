import Button from "../ui/button/Button";
import { LuArrowUpRight } from "react-icons/lu";
import { PiMapPinSimpleAreaBold } from "react-icons/pi";

interface CardProps {
  title: string;
  location: string;
  image: string;
}

const ExploreCard: React.FC<CardProps> = ({ title, location, image }) => {
  return (
    <div>
      <img
        src={image}
        alt={title}
        className="w-full object-cover aspect-5/6 rounded-2xl "
      />

      <div className="pt-5 flex flex-col-2 justify-between object-cover">
        <div>
          <h3 className="text-xl font-bold text-[#212529]">{title}</h3>

          <p className="text-xl text-[#6C757D] flex items-center mt-2">
            <PiMapPinSimpleAreaBold
              className="mr-3 "
              size={30}
              color="#087245"
            />
            {location}
          </p>
        </div>

        <Button className="items-center" size="md" variant="default">
          <LuArrowUpRight size={30} className="" />
        </Button>
      </div>
    </div>
  );
};

export default ExploreCard;
