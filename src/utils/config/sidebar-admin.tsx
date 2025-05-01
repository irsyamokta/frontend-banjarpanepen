import { LuLayoutDashboard, LuMapPinned, LuNewspaper, LuTickets, LuCalendarDays, LuImage  } from "react-icons/lu";

export const adminNavItems = [
    {
        icon: <LuLayoutDashboard />,
        name: "Dashboard",
        path: "/admin/dashboard",
    },
    {
        icon: <LuMapPinned />,
        name: "Objek Wisata",
        path: "/admin/users",
    },
    {
        icon: <LuTickets />,
        name: "Paket Wisata",
        path: "/admin/paket-wisata",
    },
    {
        icon: <LuNewspaper />,
        name: "Artikel",
        path: "/admin/requested-role",
    },
    {
        icon: <LuCalendarDays />,
        name: "Agenda Desa",
        path: "/admin/agenda-desa",
    },
    {
        icon: <LuImage />,
        name: "Galeri",
        path: "/admin/category",
    },
];
