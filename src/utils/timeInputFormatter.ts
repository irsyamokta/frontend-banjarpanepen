export function formatTimeInput(value: string): string {
    const trimmed = value.trim();
    const numeric = trimmed.replace(/\D/g, "");

    if (numeric.length === 0) return "";

    let hours = parseInt(numeric.slice(0, 2));
    let minutes = parseInt(numeric.slice(2, 4) || "0");

    if (isNaN(hours)) hours = 0;
    if (isNaN(minutes)) minutes = 0;

    hours = Math.min(Math.max(hours, 0), 23);
    minutes = Math.min(Math.max(minutes, 0), 59);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
}
