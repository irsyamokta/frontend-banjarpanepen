import { HiOutlineChat } from "react-icons/hi";
import { useState, useEffect } from "react";
import useUserContact from "../../hooks/useUserContact";

const WhatsAppButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { contact } = useUserContact();


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight / 4) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (!isVisible) {
        return null;
    }

    const handleClick = () => {
        window.open(`https://wa.me/${contact?.phone}`, "_blank");
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-20 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center text-xl transition-all duration-300 hover:bg-green-600"
            title="Hubungi Kami via WhatsApp"
        >
            <HiOutlineChat size={24} />
        </button>
    );
};

export default WhatsAppButton;
