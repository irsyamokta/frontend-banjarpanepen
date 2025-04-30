export function formatDate(date: Date | string): string {
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0];
}

export const formatDateTime = (date: string | Date): string => {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
        return 'Invalid Date';
    }

    const dateOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    const formatterDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(parsedDate);
    const formatterTime = new Intl.DateTimeFormat('en-GB', { ...timeOptions, timeZone: 'Asia/Jakarta' }).format(parsedDate);

    return `${formatterDate} ${formatterTime}`;
};
