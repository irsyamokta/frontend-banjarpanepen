import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"; // Tambahkan useNavigate
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import logoColor from "../../assets/logo/logo-color.png";
import logoWhite from "../../assets/logo/logo-white.png"; // Path to your logo

const NAV_ITEMS = [
  { path: "/", label: "Beranda" },
  { path: "/wisata", label: "Wisata" },
  { path: "/agenda", label: "Agenda" },
  { path: "/artikel", label: "Artikel" },
  { path: "/galeri", label: "Galeri" },
];

const ClientHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (path: string) => {
    if (path === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Reset scroll
    }
    navigate(path);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Reset scroll
    navigate("/"); // Navigasi ke path "/"
  };

  const Logo: React.FC = () => (
    <div className="flex items-center">
      <button onClick={handleLogoClick} className="focus:outline-none">
        <img
          src={scrolled ? logoColor : logoWhite}
          alt="Logo"
          className="w-40 h-auto"
        />
      </button>
    </div>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 lg:px-25 py-4 transition-all duration-200 ${
        scrolled
          ? "bg-[#F8F9FA] text-gray-800 shadow-md dark:bg-gray-800 dark:text-gray-300"
          : "bg-transparent backdrop-opacity-100 backdrop-blur-sm backdrop-contrast-70 drop-shadow-5xl text-white"
      }`}
    >
      <Logo />

      <BurgerMenuButton
        isOpen={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        scrolled={scrolled}
      />

      <NavigationMenu
        isOpen={menuOpen}
        scrolled={scrolled}
        onNavigate={handleNavigation} // Tambahkan handler navigasi
      />
    </nav>
  );
};

interface BurgerMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  scrolled: boolean;
}

const BurgerMenuButton: React.FC<BurgerMenuButtonProps> = ({
  isOpen,
  onClick,
  scrolled,
}) => (
  <button
    className={`md:hidden text-2xl transition-colors duration-100 ${
      scrolled ? "text-gray-800 dark:text-gray-300" : "text-white"
    }`}
    onClick={onClick}
  >
    {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
  </button>
);

interface NavigationMenuProps {
  isOpen: boolean;
  scrolled: boolean;
  onNavigate: (path: string) => void; // Tambahkan prop untuk navigasi
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  isOpen,
  scrolled,
  onNavigate,
}) => (
  <ul
    className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-lg font-medium transition-all duration-100 ${
      isOpen ? "block" : "hidden md:flex"
    } ${scrolled ? "text-gray-500" : "text-gray-400"}`}
  >
    {NAV_ITEMS.map((item) => (
      <li key={item.path}>
        <button
          onClick={() => onNavigate(item.path)} // Gunakan handler navigasi
          className={`transition-colors duration-200 ${
            scrolled ? "hover:text-black" : "hover:text-white"
          }`}
        >
          {item.label}
        </button>
      </li>
    ))}
  </ul>
);

export default ClientHeader;
