import { LuMail, LuPhone, LuInstagram } from "react-icons/lu";
import useUserContact from "../../hooks/useUserContact";

function FooterContact() {
    const { contact, loading, error } = useUserContact();

    const email = "banjarpanepen@gmail.com";
    const phone = contact?.phone || "";
    const instagramUsername = contact?.instagram?.replace("@", "") || "";

    const contactItems = [
        {
            icon: <LuMail className="text-xl" />,
            text: email,
            href: `mailto:${email}`,
        },
        {
            icon: <LuPhone className="text-xl" />,
            text: phone,
            href: `https://wa.me/${phone}`,
        },
        {
            icon: <LuInstagram className="text-xl" />,
            text: `@${instagramUsername}`,
            href: `https://instagram.com/${instagramUsername}`,
        },
    ];

    return (
        <div className="text-center md:justify-self-center md:text-left">
            <h4 className="text-lg md:text-xl text-gray-100 font-bold mb-4">Kontak</h4>

            {loading ? (
                <p className="text-sm text-gray-300">Memuat...</p>
            ) : error ? (
                <p className="text-sm text-red-300">Gagal memuat kontak.</p>
            ) : (
                <ul className="space-y-4 text-sm md:text-lg">
                    {contactItems.map((item, index) => (
                        <li
                            key={index}
                            className="flex justify-center md:justify-start items-center"
                        >
                            {item.icon}
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 hover:underline"
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FooterContact;