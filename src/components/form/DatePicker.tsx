import { useState, useRef, useEffect } from "react";
import Input from "./input/InputField";
import { DayPicker, DateRange, DropdownProps } from "react-day-picker";
import { id } from "date-fns/locale";
import { FiCalendar, FiX } from "react-icons/fi";
import "react-day-picker/dist/style.css";
import classNames from "react-day-picker/style.module.css";
import Select from "./Select";

type SingleProps = {
    mode?: "single";
    value?: Date;
    onChange?: (value: Date | undefined) => void;
    placeholder?: string;
};

type RangeProps = {
    mode: "range";
    value?: DateRange;
    onChange?: (value: DateRange | undefined) => void;
    placeholder?: string;
};

type Props = SingleProps | RangeProps;

function formatValue(mode: "single" | "range", value?: Date | DateRange) {
    if (!value) return "";

    if (mode === "single") {
        return (value as Date).toLocaleDateString("id-ID");
    }

    const range = value as DateRange;
    if (!range?.from) return "";
    if (!range.to) return range.from.toLocaleDateString("id-ID");
    return `${range.from.toLocaleDateString("id-ID")} - ${range.to.toLocaleDateString("id-ID")}`;
}

function CustomDropdown({ value, onChange, options }: DropdownProps) {
    return (
        <Select
            value={value?.toString() ?? ""}
            onChange={(val) => {
                if (onChange) {
                    const syntheticEvent = {
                        target: { value: val },
                    } as React.ChangeEvent<HTMLSelectElement>;
                    onChange(syntheticEvent);
                }
            }}
            options={options && options.map((opt) => ({
                value: opt.value.toString(),
                label: opt.label,
            })) || []}
            placeholder="Pilih"
            className="min-w-[100px]"
        />
    );
}

export default function DatePicker(props: Props) {
    const { mode = "single" } = props;
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const [selected, setSelected] = useState<typeof props.value>(props.value);
    const [position, setPosition] = useState<"top" | "bottom">("bottom");

    useEffect(() => {
        setSelected(props.value);
    }, [props.value]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOpen = () => {
        if (!open && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;

            if (spaceBelow < 320 && spaceAbove > spaceBelow) {
                setPosition("top");
            } else {
                setPosition("bottom");
            }
        }
        setOpen(!open);
    };

    const clearValue = () => {
        setSelected(undefined);
        if (mode === "single") {
            (props as SingleProps).onChange?.(undefined);
        } else {
            (props as RangeProps).onChange?.(undefined);
        }
    };

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Input + Icon */}
            <div className="relative w-full">
                <Input
                    type="text"
                    readOnly
                    onClick={toggleOpen}
                    value={formatValue(mode, selected as any)}
                    placeholder={props.placeholder || (mode === "single" ? "Pilih tanggal" : "Pilih rentang tanggal")}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer pr-10"
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (selected) {
                            clearValue();
                        } else {
                            toggleOpen();
                        }
                    }}
                >
                    {selected ? <FiX size={16} /> : <FiCalendar size={16} />}
                </button>
            </div>

            {/* Popover Kalender */}
            {open && (
                <div
                    className={`absolute z-50 bg-white border rounded-lg shadow-lg p-3 ${position === "top" ? "bottom-full mb-2" : "mt-2"
                        }`}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    {mode === "single" ? (
                        <DayPicker
                            mode="single"
                            selected={selected as Date | undefined}
                            onSelect={(val) => {
                                setSelected(val);
                                (props as SingleProps).onChange?.(val);
                                setOpen(false);
                            }}
                            animate
                            showOutsideDays
                            captionLayout="dropdown"
                            fromYear={2020}
                            toYear={2035}
                            locale={id}
                            required
                            navLayout="around"
                            components={{ Dropdown: CustomDropdown }}
                        />
                    ) : (
                        <DayPicker
                            mode="range"
                            selected={selected as DateRange | undefined}
                            onSelect={(val) => {
                                setSelected(val);
                                (props as RangeProps).onChange?.(val);
                                if (val?.from && val?.to) setOpen(true);
                            }}
                            animate
                            classNames={classNames}
                            showOutsideDays
                            captionLayout="dropdown"
                            fromYear={2020}
                            toYear={2035}
                            locale={id}
                            required
                            navLayout="around"
                            components={{ Dropdown: CustomDropdown }}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
