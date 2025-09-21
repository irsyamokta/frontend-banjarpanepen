import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { EmptyTable } from "../tables/EmptyTable";
import { formatCalendarDate } from "../../utils/dateFormatter";

import { LuEye } from "react-icons/lu";

const visitRequestsData = {
  visits: [
    {
      id: 1,
      nama_pengunjung: "Budi Santoso",
      tujuan: "Paket Sehari di Banjarpanepen",
      tanggal: "2025-09-20",
    },
    {
      id: 2,
      nama_pengunjung: "Siti Aminah",
      tujuan: "Paket Endahing Alam Banjarpanepen",
      tanggal: "2025-09-19",
    },
    {
      id: 3,
      nama_pengunjung: "Ahmad Fathoni",
      tujuan: "Paket Edukasi “Sekolah Alam Banjarpanepen”",
      tanggal: "2025-09-18",
    },
  ],
};

export default function VisitorTable() {
  const sortedVisits = [...visitRequestsData.visits].sort(
    (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
  );

  return (
    <div className="overflow-hidden rounded-xl p-5 border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 mr-4">
          <LuEye className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div>
          <span className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Tabel Kunjungan
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Daftar kunjungan terbaru
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                No
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nama Pengunjung
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Tujuan
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Tanggal
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {sortedVisits.length === 0 ? (
              <EmptyTable colspan={6} description="Belum ada kunjungan" />
            ) : (
              sortedVisits.map((visit, idx) => (
                <TableRow key={visit.id || idx}>
                  <TableCell className="px-3 py-2 text-sm">{idx + 1}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {visit.nama_pengunjung}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {visit.tujuan}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {formatCalendarDate(visit.tanggal)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
