import { Outlet } from "react-router";
import { HeaderProvider } from "../context/HeaderContext";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";
import WhatsAppButton from "../components/common/WhatsAppButton";

function LayoutContent() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 px-4 md:px-8 lg:px-16">
                <div className="-mx-4 md:-mx-8 lg:-mx-16">
                    <Outlet />
                </div>
            </main>
            <Footer />
            <ScrollToTopButton />
            <WhatsAppButton />
        </div>
    );
}

export default function ClientLayout() {
    return (
        <HeaderProvider>
            <LayoutContent />
        </HeaderProvider>
    );
}
