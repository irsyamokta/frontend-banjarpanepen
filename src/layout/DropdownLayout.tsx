import { Outlet } from "react-router";
import { HeaderProvider } from "../context/HeaderContext";
import Header from "../components/header/Header";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function LayoutContent() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/" replace />;

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header isSolid={true} />
            <main className="flex-1 px-4 md:px-8 lg:px-16">
                <div className="-mx-4 md:-mx-8 lg:-mx-16">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default function DropdownLayout() {
    return (
        <HeaderProvider>
            <LayoutContent />
        </HeaderProvider>
    );
}
