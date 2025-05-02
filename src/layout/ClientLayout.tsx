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
