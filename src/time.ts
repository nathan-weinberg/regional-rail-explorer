import { NetworkTime, NetworkDay, NetworkDayTime } from "./types";

export const daysOfWeek: NetworkDay[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];

export const parseTimeRange = (
    timeRangeString: string
): [NetworkTime, NetworkTime] => {
    const [fromTime, toTime] = timeRangeString
        .split("-")
        .map((p) => p.trim())
        .map(parseTime);
    return [fromTime, toTime];
};

export const parseTime = (timeString: string): NetworkTime => {
    const parts = timeString.split(":");
    const [hours, minutes, seconds = 0] = parts.map((x) => parseInt(x));
    return seconds + 60 * (minutes + 60 * hours);
};

export const stringifyTime = (
    time: NetworkTime,
    { truncateLeadingZeros = true, showSeconds = false } = {}
): string => {
    let seconds = time,
        minutes = 0,
        hours = 0;
    const minutesToAdd = Math.floor(seconds / 60);
    seconds = seconds % 60;
    minutes = minutes += minutesToAdd;
    const hoursToAdd = Math.floor(minutes / 60);
    minutes = minutes % 60;
    hours += hoursToAdd;
    // eslint-disable-next-line prefer-const
    let [hoursString, minutesString, secondsString] = [
        hours,
        minutes,
        seconds,
    ].map((num) => num.toString().padStart(2, "0"));
    if (truncateLeadingZeros && hoursString.startsWith("0")) {
        hoursString = hoursString.slice(1);
    }
    return [hoursString, minutesString, secondsString]
        .slice(0, showSeconds ? 3 : 2)
        .join(":");
};

export const stringify12Hour = (time: NetworkTime) => {
    const hours = Math.floor(time / HOUR);
    const isPM = hours > 12;
    return `${isPM ? hours - 12 : hours} ${isPM ? "PM" : "AM"}`;
};

export const createTime = (
    day: NetworkDay,
    timeString: string
): NetworkDayTime => {
    return {
        day: day,
        time: parseTime(timeString),
    };
};

export const compareTimes = (
    first: NetworkTime,
    second: NetworkTime
): number => {
    if (first === second) {
        return 0;
    }
    return first > second ? 1 : -1;
};

export const MINUTE = 60;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;