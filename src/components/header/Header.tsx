import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Button from "../ui/button/Button";
import { useAuth } from "../../context/AuthContext";
import logoWhite from "../../assets/logo/logo-white.png";
import logoColor from "../../assets/logo/logo-color.png";
import UserDropdown from "../header/UserDropdown";

const NAV_ITEMS = [
    { path: "/", label: "Beranda" },
    { path: "/wisata", label: "Wisata" },
    { path: "/agenda", label: "Agenda" },
    { path: "/artikel", label: "Artikel" },
    { path: "/galeri", label: "Galeri" },
    { path: "#footer", label: "Kontak" },
];

export default function Header({ isSolid: solidProp = false }: { isSolid?: boolean }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isSolid = useMemo(
        () =>
            solidProp ||
            scrolled ||
            /^\/(wisata|agenda|artikel)\/[^/]+/.test(location.pathname),
        [solidProp, scrolled, location.pathname]
    );

    const handleNavigate = (path: string) => {
        setMenuOpen(false);
        if (path.startsWith("#")) {
            document.querySelector(path)?.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate(path);
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isSolid ? "bg-white shadow-md" : "bg-transparent"
                }`}
        >
            <div className="flex items-center justify-between px-6 lg:px-20 py-4">
                {/* Logo */}
                <button onClick={() => navigate("/")} className="flex items-center">
                    <img
                        src={isSolid ? logoColor : logoWhite}
                        alt="Logo"
                        className="w-36 transition-all duration-200"
                    />
                </button>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    {NAV_ITEMS.map(({ path, label }) => {
                        const isActive = location.pathname === path;
                        return (
                            <button
                                key={path}
                                onClick={() => handleNavigate(path)}
                                className={`transition-colors duration-300 ${isSolid
                                    ? isActive
                                        ? "text-primary"
                                        : "text-gray-800 hover:text-primary"
                                    : "text-white hover:text-primary"
                                    }`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>

                {/* Desktop Auth / User Dropdown */}
                <div className="hidden lg:flex items-center">
                    {!user || user.role !== "visitor" ? (
                        <Button
                            onClick={() => navigate("/signin")}
                            variant="default"
                            size="sm"
                            className="px-8"
                        >
                            Login
                        </Button>
                    ) : (
                        <UserDropdown isSolid={isSolid} />
                    )}
                </div>

                {/* Mobile User & Menu */}
                <div className="flex items-center gap-4 lg:hidden">
                    {user && user.role == "visitor" && <UserDropdown isSolid={isSolid} />}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`text-3xl transition-colors duration-300 ${isSolid ? "text-gray-800" : "text-white"
                            }`}
                    >
                        {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Navigation */}
            {menuOpen && (
                <div className="lg:hidden bg-black/70 text-white px-6 py-6 space-y-6">
                    <nav className="flex flex-col gap-4 text-lg font-medium">
                        {NAV_ITEMS.map(({ path, label }) => (
                            <button
                                key={path}
                                onClick={() => handleNavigate(path)}
                                className="block text-left px-3 py-2 rounded hover:bg-white/10 transition-colors"
                            >
                                {label}
                            </button>
                        ))}
                    </nav>

                    {!user && (
                        <div className="pt-6">
                            <Button
                                onClick={() => {
                                    setMenuOpen(false);
                                    navigate("/signin");
                                }}
                                variant="default"
                                className="w-full py-2 text-base"
                            >
                                Login
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
