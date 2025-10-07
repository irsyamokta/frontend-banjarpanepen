import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../services/orderService";
import { toast } from "react-toastify";
import Button from "../../ui/button/Button";
import { LuMapPin, LuMinus, LuPlus } from "react-icons/lu";
import ImageFallback from "../../ui/images/ImageFallback";
import { useAuth } from "../../../context/AuthContext";

interface BasicCardFourProps {
    id: string;
    cover: string;
    title: string;
    location: string;
    price: number;
}

export default function BasicCardFour({
    id,
    cover,
    title,
    location,
    price,
}: BasicCardFourProps) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleIncrement = () => setQuantity((q) => q + 1);
    const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    const totalPrice = price * quantity;

    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(price);

    const formattedTotal = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(totalPrice);

    const handleBuy = async () => {
        if (!user) {
            return navigate("/signin");
        }

        setLoading(true);
        try {
            const orderData = {
                name: user.name,
                quantity,
                total_price: totalPrice,
                ticket_id: id,
                user_id: user.id,
            };
            await createOrder(orderData);
            navigate("/transaksi");
        } catch (err: any) {
            toast.error(err.response.data.message || "Gagal membeli tiket.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            data-aos="zoom-in-up"
            className="flex flex-col h-full rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
        >
            {/* Cover */}
            <ImageFallback
                src={cover}
                alt={title}
                className="w-full h-52 object-cover"
                fallbackClassName="w-full h-52 bg-gray-100"
            />

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-1">
                    {title}
                </h3>

                <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm">
                    <LuMapPin className="text-primary" size={18} />
                    <span className="line-clamp-1">{location}</span>
                </div>

                <p className="text-xl md:text-2xl font-extrabold text-primary mt-4">
                    {formattedPrice}
                </p>

                {/* Counter */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-lg">
                        <button
                            onClick={handleDecrement}
                            className="px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            <LuMinus />
                        </button>
                        <span className="px-4 text-lg font-semibold">{quantity}</span>
                        <button
                            onClick={handleIncrement}
                            className="px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            <LuPlus />
                        </button>
                    </div>

                    <div className="text-right">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-lg font-bold text-gray-900">{formattedTotal}</p>
                    </div>
                </div>

                {/* Button Beli */}
                <div className="mt-auto pt-6">
                    <Button
                        onClick={handleBuy}
                        className="w-full flex items-center justify-center gap-2"
                        size="xs"
                        variant="default"
                        disabled={loading}
                    >
                        {loading ? "Memproses..." : "Beli Tiket"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
