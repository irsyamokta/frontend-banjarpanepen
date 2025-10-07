interface PaginationProps {
    currentPage: number;
    lastPage: number;
    total: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    lastPage,
    total,
    onPageChange,
}: PaginationProps) {
    const pages = [];

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(lastPage, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-between items-center mt-6">
            {/* Info */}
            <p className="text-sm text-gray-500">
                Halaman {currentPage} dari {lastPage} | Total {total} transaksi
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className={`px-3 py-1 rounded-lg border text-sm transition ${currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100"
                        }`}
                >
                    Prev
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded-lg border text-sm transition ${currentPage === page
                            ? "bg-primary text-white border-primary"
                            : "hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    disabled={currentPage === lastPage}
                    onClick={() => onPageChange(currentPage + 1)}
                    className={`px-3 py-1 rounded-lg border text-sm transition ${currentPage === lastPage
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
