import React from "react";
import Button from "../ui/button/Button";
import { LuSquareCheck, LuCalendar, LuArrowUpRight } from "react-icons/lu";

interface PackageCardProps {
  image: string;
  title: string;
  price: string;
  benefits: string[];
  duration: string;
}

const PackageCard: React.FC<PackageCardProps> = ({
  image,
  title,
  price,
  benefits,
  duration,
}) => {
  return (
    <div>
      <img
        src={image}
        alt={title}
        className="w-full object-cover aspect-5/3 rounded-2xl"
      />

      <div>
        <h3 className="text-xl font-bold text-[#212529] mt-[24px]">{title}</h3>
        <p className="text-4xl font-extrabold text-[#087245] mt-[16px]">
          {price}
        </p>
        <hr className="my-4 border-t-2" />
        <div>
          <h4 className="text-xl font-semibold mb-3">
            Apa yang kamu dapatkan?
          </h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-center text-xl text-[#495057]"
              >
                <LuSquareCheck className="text-[#087245] mr-2" size={25} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="text-xl font-semibold">Durasi</h4>
          <p className="flex items-center text-xl text-[#495057] mt-2">
            <LuCalendar className="mr-2 text-[#087245]" size={25} />
            {duration}
          </p>
        </div>

        <div className="mt-6">
          <Button className="w-full text-[20px] font-medium py-3 rounded-lg flex items-center justify-center">
            Pilih Paket <LuArrowUpRight size={30} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
