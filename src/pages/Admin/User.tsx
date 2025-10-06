import PageMeta from "../../components/common/PageMeta";
import UserCard from "../../components/cards/UserCard";

export default function User() {
    return (
        <>
            <PageMeta
                title="Pengguna"
                description="Pengguna"
            />
            <div className="grid grid-cols-1 gap-4 md:gap-6">
                <UserCard/>
            </div>
        </>
    );
}