import PageMeta from "../../components/common/PageMeta";
import Transaction from "../../components/transaction/UserTransaction";

export default function TransactionDetail() {
    return (
        <>
            <PageMeta
                title="Transaksi"
                description="Transaksi"
            />
            <Transaction />
        </>
    );
}
