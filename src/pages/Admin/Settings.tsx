import PageMeta from "../../components/common/PageMeta";
import SettingsCard from "../../components/cards/SettingsCard";

export default function Settings() {
    return (
        <>
            <PageMeta
                title="Pengaturan"
                description="Pengaturan"
            />
            <div className="grid grid-cols-1 gap-4 md:gap-6">
                <SettingsCard/>
            </div>
        </>
    );
}