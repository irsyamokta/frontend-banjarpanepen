import PageMeta from "../../components/common/PageMeta";

import ClientHero from "../../components/client/ClientHero";
import ClientAbout from "../../components/client/ClientAbout";
import ClientExplor from "../../components/client/ClientExplor";
import ClientPaketWisata from "../../components/client/ClientPaketWisata";
import ClientGallery from "../../components/client/ClientGallery";


export default function Home() {
  return (
    <>
      <PageMeta title="Client Dashboard" description="Dashboard" />
      <div className="space-y-[80px]">
        <ClientHero />
        <ClientAbout />
        <ClientExplor />
        <ClientPaketWisata />
        <ClientGallery />
      </div>
    </>
  );
}
