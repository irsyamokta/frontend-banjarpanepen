import React from "react";
import { LuMail, LuPhone, LuInstagram } from "react-icons/lu";
import logoColor from "../../assets/logo/logo-color.png"; // Path to your logo
import galleryImage1 from "../../assets/image/img-galeri-1.png"; // Path to gallery images
import galleryImage2 from "../../assets/image/img-galeri-2.png";

const CONTACT_INFO = [
  { icon: <LuMail className="text-xl" />, text: "email@gmail.com" },
  { icon: <LuPhone className="text-xl" />, text: "+62 128 8929 3849" },
  { icon: <LuInstagram className="text-xl" />, text: "@deswispanepen" },
];

const ADDRESS = `Desa Banjarpanepen, Kecamatan Sumpiuh,
Kabupaten Banyumas, Provinsi Jawa Tengah, 53195
Indonesia`;

const IMAGES = [galleryImage1, galleryImage2, galleryImage2, galleryImage1];

const ClientFooter: React.FC = () => {
  return (
    <footer className="bg-[#212529] text-[#ADB5BD] py-10 w-full">
      <div className="w-full px-6 md:px-10 lg:px-25">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Logo />
          <Kontak />
          <Galeri />
        </div>
        <Copyright />
      </div>
    </footer>
  );
};

const Logo: React.FC = () => (
  <div className="text-center md:text-left">
    <div className="flex justify-center md:justify-start items-center mb-4">
      <img src={logoColor} alt="Logo" className="w-65 h-auto mr-3" />
    </div>
    <p className="text-sm md:text-lg whitespace-pre-line">{ADDRESS}</p>
  </div>
);

const Kontak: React.FC = () => (
  <div className="text-center md:justify-self-center md:text-left">
    <h4 className="text-lg md:text-xl text-gray-100 font-bold mb-4">Kontak</h4>
    <ul className="space-y-4 text-sm md:text-lg">
      {CONTACT_INFO.map((item, index) => (
        <li
          key={index}
          className="flex justify-center md:justify-start items-center"
        >
          {item.icon}
          <span className="ml-2">{item.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Galeri: React.FC = () => (
  <div className="text-center justify-center md:justify-self-end md:text-left">
    <h4 className="text-lg md:text-xl text-gray-100 font-bold mb-4">Galeri</h4>
    <div className="grid grid-cols-2 gap-4">
      {IMAGES.map((image, index) => (
        <div key={index} className="overflow-hidden rounded-xl">
          <img
            src={image}
            alt={`Gallery Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  </div>
);

const Copyright: React.FC = () => (
  <div className="bg-[#212529] text-[#ADB5BD] pt-6 border-t border-gray-700 text-center mt-8">
    <p className="text-sm md:text-lg">
      © 2025 Desa Banjarpanepen. Hak Cipta Dilindungi oleh Telkom University
      Purwokerto.
    </p>
  </div>
);

export default ClientFooter;
