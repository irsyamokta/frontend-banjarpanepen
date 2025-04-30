import { LuUserCheck, LuUsers, LuLayoutDashboard, LuNewspaper, LuTableOfContents } from "react-icons/lu";

export const adminNavItems = [
    {
        icon: <LuLayoutDashboard />,
        name: "Dashboard",
        path: "/admin/dashboard",
    },
    {
        icon: <LuUsers />,
        name: "Users",
        path: "/admin/users",
    },
    {
        icon: <LuUserCheck />,
        name: "Requested Role",
        path: "/admin/requested-role",
    },
    {
        icon: <LuNewspaper />,
        name: "News",
        path: "/admin/news",
    },
    {
        icon: <LuTableOfContents />,
        name: "Category",
        path: "/admin/category",
    },
];
