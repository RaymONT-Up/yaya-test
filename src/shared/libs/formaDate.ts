export const formatDateRange = (startISO: string, endISO: string) => {
  const start = new Date(startISO)
  const end = new Date(endISO)

  const startDay = String(start.getDate()).padStart(2, '0')
  const endDay = String(end.getDate()).padStart(2, '0')
  const month = end.toLocaleString('ru-RU', { month: 'short' })
  const year = end.getFullYear()

  return `${startDay} – ${endDay} ${month}, ${year}`
}
