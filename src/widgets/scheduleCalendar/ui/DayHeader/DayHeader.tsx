export const DayHeader = ({ date }: { date: Date }) => {
  const dayNumber = date.toLocaleDateString('ru-RU', { day: '2-digit' })
  const weekday = date.toLocaleDateString('ru-RU', { weekday: 'long' })

  return (
    <div className="fc-custom-header">
      <div className="fc-custom-day">{dayNumber}</div>
      <div className="fc-custom-weekday">{weekday.charAt(0).toUpperCase() + weekday.slice(1)}</div>
    </div>
  )
}
