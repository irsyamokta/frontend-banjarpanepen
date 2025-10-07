import useSWR from "swr";
import { getOrders } from "../../services/orderService";

import HeaderSection from "./HeaderSectionCard";
import TransactionTable from "../tables/TransactionTable";

export default function TransactionCard() {
    const { data: response = [], mutate: mutateData } = useSWR("orders", getOrders, { suspense: true });
    mutateData();

    return (
        <div className="grid grid-cols-1 gap-4 md:gap-6">
            <HeaderSection title="Daftar Transaksi" showButton={false}/>

            <TransactionTable
                data={response.data || []}
            />
        </div>
    );
}
