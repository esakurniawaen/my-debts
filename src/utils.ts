import { DateTime, type DateTimeFormatOptions } from "luxon";

export const capitalizeWords = (text: string) => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const capitalizeFirstWord = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const toDatetimeLocal = (datetimeInUnix: number) => {
  return DateTime.fromMillis(datetimeInUnix).toFormat("yyyy-MM-dd'T'HH:mm");
};

export const fromDatetimeLocal = (datetimeLocal: string) => {
  return DateTime.fromJSDate(new Date(datetimeLocal)).toMillis();
};

export const toLocaleString = (
  datetimeInUnix: number,
  datetimeFormat: DateTimeFormatOptions
) => {
  return DateTime.fromMillis(datetimeInUnix).toLocaleString(datetimeFormat);
};
