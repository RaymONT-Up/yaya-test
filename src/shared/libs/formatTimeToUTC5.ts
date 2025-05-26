export const formatTimeToUtc5 = (date: Date) =>
  date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Yekaterinburg"
  })
