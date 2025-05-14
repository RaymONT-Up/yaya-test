export const formatDateRange = (startISO: string, endISO: string) => {
  const start = new Date(startISO)
  const end = new Date(endISO)

  const startDay = String(start.getDate()).padStart(2, "0")
  const endDay = String(end.getDate()).padStart(2, "0")
  const month = end.toLocaleString("ru-RU", { month: "short" })
  const year = end.getFullYear()

  return `${startDay} – ${endDay} ${month}, ${year}`
}

// форматирует Date в часы:минуты
export const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}

export const parseTimeToMinutes = (str: string) => {
  const [h, m] = str.split(":").map(Number)
  return h * 60 + m
}

export const formatDate = (date: Date): string => {
  const pad = (num: number) => num.toString().padStart(2, "0")
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())

  return `${year}-${month}-${day}`
}

export function formatScheduleTimeRaw(startIso: string, endIso: string) {
  const extractTime = (iso: string) => iso.slice(11, 16)
  const extractDate = (iso: string) => {
    const date = new Date(iso)
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "short"
    }).format(date)
  }

  const date = extractDate(startIso)
  const startTime = extractTime(startIso)
  const endTime = extractTime(endIso)

  const durationMinutes = Math.round(
    (new Date(endIso).getTime() - new Date(startIso).getTime()) / 60000
  )

  return {
    dateTime: `${date}, ${startTime}–${endTime}`,
    duration: `${durationMinutes}мин`
  }
}

// YYYY-MM-DD
export const toDateString = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
