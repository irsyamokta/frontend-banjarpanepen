import PageMeta from "../../components/common/PageMeta";
import TransactionCard from "../../components/cards/TransactionCard";

export default function Transaction() {
    return (
        <>
            <PageMeta
                title="Transaksi"
                description="Transaksi"
            />
            <div className="grid grid-cols-1 gap-4 md:gap-6">
                <TransactionCard/>
            </div>
        </>
    );
}