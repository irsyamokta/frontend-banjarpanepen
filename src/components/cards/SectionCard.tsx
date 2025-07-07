import useSWR from "swr";
import EmptyState from "../empty/EmptyState";

interface SectionCardProps<T> {
    queryKey: string;
    fetcher: () => Promise<{ data: T[] }>;
    renderItem: (item: T) => React.ReactNode;
}

export default function SectionCard<T>({ queryKey, fetcher, renderItem }: SectionCardProps<T>) {
    const { data: response } = useSWR<{ data: T[] }>(queryKey, fetcher, { suspense: true });

    const isEmpty = !response?.data || response.data.length === 0;

    return (
        <section className="px-6 md:px-12 lg:px-25 py-12 -mt-10 bg-gray-50">
            {isEmpty ? (
                <div className="flex justify-center items-center py-20">
                    <EmptyState />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[40px]">
                    {response.data.map((item, index) => (
                        <div key={index}>{renderItem(item)}</div>
                    ))}
                </div>
            )}
        </section>
    );
}
