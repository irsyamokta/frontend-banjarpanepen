import useSWR from "swr";
import { getEvents } from "../../services/eventService";
import { IEventPayload } from "../../types";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { EmptyTable } from "../tables/EmptyTable";
import { formatCalendarDate } from "../../utils/dateFormatter";
import { formatCurrency } from "../../utils/currencyFormatter";

export default function NearestAgendaTable() {
    const { data: eventsData } = useSWR('nearestEvent', getEvents);

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    {/* Table Header */}
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Agenda
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Tanggal
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Waktu
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Tempat
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Harga
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {(() => {
                            const upcomingEvents = eventsData?.data?.filter(
                                (event: IEventPayload) => new Date(event.date) >= new Date()
                            ) || [];

                            if (upcomingEvents.length === 0) {
                                return (
                                    <EmptyTable
                                        colspan={6}
                                        description="Tidak ada agenda yang akan datang"
                                    />
                                );
                            }

                            return upcomingEvents
                                .sort((a: IEventPayload, b: IEventPayload) => new Date(a.date).getTime() - new Date(b.date).getTime())
                                .map((event: IEventPayload) => (
                                    <TableRow key={event.id}>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {event.title}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {formatCalendarDate(event.date)}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {event.time} WIB
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {event.place}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {event.price === 0 ? "Gratis" : formatCurrency(event.price)}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            <Badge color="error">Segera datang</Badge>
                                        </TableCell>
                                    </TableRow>
                                ));
                        })()}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
