import { useNavigate, useLocation } from "react-router";
import { useHandleNavigate } from "../../hooks/useHandleNavigate";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useHeader } from "../../context/HeaderContext";

import logoColor from "../../assets/logo/logo-color.png";
import logoWhite from "../../assets/logo/logo-white.png";

const NAV_ITEMS = [
    { path: "/", label: "Beranda" },
    { path: "/wisata", label: "Wisata" },
    { path: "/agenda", label: "Agenda" },
    { path: "/artikel", label: "Artikel" },
    { path: "/galeri", label: "Galeri" },
    { path: "#footer", label: "Kontak" },
];

export default function Header() {
    const navigate = useNavigate();
    const handleNavigate = useHandleNavigate();
    const location = useLocation();
    const { isScrolled, isMobile, menuOpen, toggleMenu } = useHeader();

    const isSubPage = /^\/(wisata|agenda|artikel)\/[^/]+/.test(location.pathname);

    const solidBg = isScrolled || isSubPage;

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 lg:px-25 py-4 transition-all duration-200
        ${solidBg
                ? "bg-gray-50 text-gray-800 shadow-md dark:bg-gray-800 dark:text-gray-300"
                : "bg-transparent backdrop-opacity-100 backdrop-blur-sm text-white"
            }
        `}
        >
            <button onClick={() => navigate("/")}>
                <img
                    src={solidBg ? logoColor : logoWhite}
                    alt="Logo"
                    className="w-40 h-auto"
                />
            </button>

            {isMobile && (
                <button
                    onClick={toggleMenu}
                    className={`text-2xl ${solidBg ? "text-gray-800 dark:text-gray-300" : "text-white"}`}
                >
                    {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
                </button>
            )}

            <ul
                className={`
            ${isMobile
                        ? menuOpen
                            ? "absolute top-full left-0 w-full bg-white dark:bg-gray-900 p-4 flex flex-col space-y-2"
                            : "hidden"
                        : "flex space-x-6 items-center"
                    }
            text-base font-medium
            ${solidBg ? "text-gray-500" : "text-gray-400"}
          `}
            >
                {NAV_ITEMS.map(({ path, label }) => {
                    const isActive = location.pathname === path;
                    return (
                        <li key={path}>
                            <button
                                onClick={() => handleNavigate(path)}
                                className={`
                    w-full text-left px-1 py-2 rounded-md transition duration-200
                    ${isMobile
                                        ? isActive
                                            ? "bg-primary text-white"
                                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                        : isActive
                                            ? solidBg
                                                ? "text-primary"
                                                : "text-white"
                                            : "hover:text-primary"
                                    }
                  `}
                            >
                                {label}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}