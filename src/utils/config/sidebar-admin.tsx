import { LuLayoutDashboard, LuMapPinned, LuNewspaper, LuTickets, LuCalendarDays, LuImage, LuSettings  } from "react-icons/lu";
import { PiBackpackBold, PiUsersBold } from "react-icons/pi";
import { GrTransaction } from "react-icons/gr";

export const adminNavItems = [
    {
        icon: <LuLayoutDashboard />,
        name: "Dashboard",
        path: "/admin",
    },
    {
        icon: <LuMapPinned />,
        name: "Objek Wisata",
        path: "/admin/wisata",
    },
    {
        icon: <PiBackpackBold />,
        name: "Paket Wisata",
        path: "/admin/paket-wisata",
    },
    {
        icon: <LuTickets />,
        name: "Tiket Wisata",
        path: "/admin/tiket",
    },
    {
        icon: <LuNewspaper />,
        name: "Artikel",
        path: "/admin/artikel",
    },
    {
        icon: <LuCalendarDays />,
        name: "Agenda Desa",
        path: "/admin/agenda-desa",
    },
    {
        icon: <LuImage />,
        name: "Galeri",
        path: "/admin/galeri",
    },
    {
        icon: <GrTransaction />,
        name: "Transaksi",
        path: "/admin/transaksi",
    },
    {
        icon: <PiUsersBold />,
        name: "Pengguna",
        path: "/admin/pengguna",
    },
];

export const OthersItems = [
    {
        icon: <LuSettings />,
        name: "Pengaturan",
        path: "/admin/pengaturan",
    },
];
