export const TIME = {
    months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    monthsShort: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ],
    week: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
};

export const DATE_CREATED = {
    fullDate: new Date().toLocaleString(),
    day: TIME.week[new Date().getDay()],
    month: TIME.months[new Date().getMonth()],
    dd: new Date().getDate(),
    mm: new Date().getMonth() + 1, //January is 0
    yyyy: new Date().getFullYear(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes()
};
