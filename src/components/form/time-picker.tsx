import Label from "./Label";

type TimePickerProps = {
    id: string;
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    min?: string;
    max?: string;
    required?: boolean;
};

export default function TimePicker({
    id,
    label,
    value,
    onChange,
    min = "00:00",
    max = "23:59",
    required = false,
}: TimePickerProps) {
    return (
        <div>
            {label && <Label htmlFor={id}>{label}</Label>}

            <div className="relative">
                <input
                    type="time"
                    id={id}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    min={min}
                    max={max}
                    required={required}
                    className="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/20 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                />
            </div>
        </div>
    );
}