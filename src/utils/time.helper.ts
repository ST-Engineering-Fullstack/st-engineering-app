import dayjs from 'dayjs';

export const getDateInFormat = (date?: Date | string, format?: string) => {
    let currentDate = date ?? new Date();
    if (typeof currentDate === 'number') currentDate = new Date(currentDate);
    const currentFormat = format ?? 'YYYY.MM.DD';
    return dayjs(currentDate).format(currentFormat);
};