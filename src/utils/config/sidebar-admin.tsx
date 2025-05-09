import { LuLayoutDashboard, LuMapPinned, LuNewspaper, LuTickets, LuCalendarDays, LuImage, LuSettings  } from "react-icons/lu";

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
        icon: <LuTickets />,
        name: "Paket Wisata",
        path: "/admin/paket-wisata",
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
];

export const OthersItems = [
    {
        icon: <LuSettings />,
        name: "Pengaturan",
        path: "/admin/pengaturan",
    },
];
