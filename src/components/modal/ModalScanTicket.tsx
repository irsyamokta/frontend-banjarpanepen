import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

type ScanTicketModalProps = {
    open: boolean;
    onClose: () => void;
    onResult: (value: string) => void;
};

export default function ModalScanTicket({ open, onClose, onResult }: ScanTicketModalProps) {
    const [error] = useState<string | null>(null);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-gray-700/90 flex items-center justify-center z-999">
            <div className="bg-white rounded-xl p-4 w-[320px] xsm:w-[400px] shadow-lg relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    ✖
                </button>

                <h2 className="text-lg font-bold mb-2">Pindai Tiket</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Pastikan QR Code pada tiket terlihat jelas di kamera.
                </p>

                <div className="border rounded-md overflow-hidden">
                    <Scanner
                        onScan={(result) => {
                            if (result && result.length > 0) {
                                const value = result[0].rawValue;
                                onResult(value);
                                onClose();
                            }
                        }}
                    />
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    );
}