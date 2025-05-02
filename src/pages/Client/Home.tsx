import PageMeta from "../../components/common/PageMeta";
import ClientHero from "../../components/client/ClientHero";
import ClientAbout from "../../components/client/ClientAbout";


export default function Home() {
  return (
    <>
      <PageMeta title="Client Dashboard" description="Dashboard" />
      <div>
        <ClientHero />
        <ClientAbout />
      </div>
    </>
  );
}
