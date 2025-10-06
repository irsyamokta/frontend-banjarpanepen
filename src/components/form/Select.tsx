import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  hideChevron?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  hideChevron,
  placeholder = "Pilih Opsi",
  value,
  onChange,
  className = "",
}) => {
  const [open, setOpen] = useState(false);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`}>
      {/* Input Display */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex h-11 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-primary focus:ring-3 focus:ring-primary/20 dark:bg-gray-800 dark:text-white`}
      >
        <span className={selected ? "text-gray-800 dark:text-white" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>
        {!hideChevron && <LuChevronDown className="h-4 w-4 text-gray-500" />}
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${value === opt.value ? "bg-gray-100 dark:bg-gray-700 font-medium" : ""
                }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;