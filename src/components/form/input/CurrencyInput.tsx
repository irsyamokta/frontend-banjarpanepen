import React from "react";

interface CurrencyInputProps {
    value: number | null;
    onChange: (value: number) => void;
    placeholder?: string;
    name?: string;
    id?: string;
    disabled?: boolean;
    className?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
    value,
    onChange,
    placeholder,
    name,
    id,
    disabled,
    className,
}) => {
    const formatNumber = (num: number | null) => {
        if (num === null || isNaN(num)) return "";
        return new Intl.NumberFormat("id-ID").format(num);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\./g, "");
        if (/^\d*$/.test(rawValue)) {
            onChange(rawValue === "" ? 0 : Number(rawValue));
        }
    };

    return (
        <input
            type="text"
            inputMode="numeric"
            pattern="[\d.]*"
            name={name}
            id={id}
            disabled={disabled}
            className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-primary focus:ring-primary/20 ${className || ""}`}
            placeholder={placeholder}
            value={formatNumber(value)}
            onChange={handleChange}
        />
    );
};

export default CurrencyInput;