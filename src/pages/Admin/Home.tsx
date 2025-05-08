import DashboardCard from "../../components/cards/DashboardCard";
import PageMeta from "../../components/common/PageMeta";
import NearestAgendaTable from "../../components/tables/NearestAgendaTable";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Admin Dashboard"
        description="Admin Dashboard"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <DashboardCard />
          <div className="grid grid-cols-1 gap-6">
            <NearestAgendaTable />
          </div>
        </div>
      </div>
    </>
  );
}
