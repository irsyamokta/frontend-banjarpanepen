import { IconType } from "react-icons";

export interface InfoItem {
    label: string;
    value: string;
    icon: IconType;
}

interface InfoCardProps {
    title: string;
    items: InfoItem[];
}


export default function InfoCard({ title, items }: InfoCardProps) {
    return (
        <div className="bg-gray-50 rounded-xl shadow-lg p-4 w-full md:w-80">
            <h2 className="text-md font-semibold mb-2">{title}</h2>
            <hr className="mb-3 border-t-2" />
            <div className="flex flex-col space-y-5 text-sm">
                {items.map((item, index) => (
                    <div key={index}>
                        <div className="flex items-center gap-2 mb-1">
                            <item.icon className="text-primary" size={16} />
                            <span className="font-medium">{item.label}</span>
                        </div>
                        <p className="ml-6 text-gray-700">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
