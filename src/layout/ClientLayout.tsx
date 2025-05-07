<<<<<<< HEAD
import { SidebarProvider } from "../context/SidebarContext";
import ClientHeader from "../components/header/ClientHeader";
import ClientFooter from "../components/header/ClientFooter";
import ClientHome from "../pages/Client/Home";

const LayoutContent: React.FC = () => {
  return (
    <>
      <ClientHeader />
      <ClientHome />
      <ClientFooter />
    </>
  );
};

const ClientLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default ClientLayout;
=======
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
>>>>>>> e3e3f24c08b9d4dea76765d5b17723588a7f98a9
