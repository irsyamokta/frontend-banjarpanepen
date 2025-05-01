import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"; // Icons for burger menu
import logoColor from "../../assets/logo/logo-color.png";

// Navigation items configuration
const NAV_ITEMS = [
  { path: "/beranda", label: "Beranda" },
  { path: "/wisata", label: "Wisata" },
  { path: "/agenda", label: "Agenda" },
  { path: "/artikel", label: "Artikel" },
  { path: "/galeri", label: "Galeri" },
];

const ClientHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll to toggle navbar styles
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-25 py-4 transition-all duration-200 ${
        scrolled
          ? "bg-white text-gray-800 shadow-md dark:bg-gray-800 dark:text-gray-300"
          : "bg-transparent backdrop-opacity-100 backdrop-blur-sm backdrop-contrast-70 drop-shadow-5xl text-white"
      }`}
    >
      {/* Logo */}
      <Logo />

      {/* Mobile Menu Toggle Button */}
      <BurgerMenuButton
        isOpen={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        scrolled={scrolled}
      />

      {/* Navigation Menu */}
      <NavigationMenu isOpen={menuOpen} scrolled={scrolled} />
    </nav>
  );
};

const Logo: React.FC = () => (
  <div className="flex items-center">
    <Link to="/dashboard">
      <img src={logoColor} alt="Logo" className="w-40 h-auto" />
    </Link>
  </div>
);

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
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  isOpen,
  scrolled,
}) => (
  <ul
    className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-lg font-medium transition-all duration-100 ${
      isOpen ? "block" : "hidden md:flex"
    } ${scrolled ? "text-gray-500" : "text-gray-400"}`}
  >
    {NAV_ITEMS.map((item) => (
      <li key={item.path}>
        <Link
          to={item.path}
          className={`transition-colors duration-200 ${
            scrolled ? "hover:text-black" : "hover:text-white"
          }`}
        >
          {item.label}
        </Link>
      </li>
    ))}
  </ul>
);

export default ClientHeader;
