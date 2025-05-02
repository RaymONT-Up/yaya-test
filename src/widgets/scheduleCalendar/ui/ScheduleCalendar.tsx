import React, { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { EventClickArg, type DateSelectArg, type DatesSetArg } from '@fullcalendar/core'
import { Modal } from '@/shared/ui/Modal/Modal'
import { CreateSchedule } from '@/features/schedule/CreateSchedule'
import { useSchedule } from '@/entities/schedule'
import { parseScheduleEvents } from '@/shared/libs/parseScheduleEvents'
import { DuplicateSchedule } from '@/features/schedule/DuplicateSchedule'
import './ScheduleCalendar.css'
import { CalendarToolbar } from './CalendarToolbar'
import { EventApi } from '@fullcalendar/core'

export const ScheduleCalendar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [range, setRange] = useState<{ start: string; end: string } | null>(null)
  const today = new Date()
  const [dateRange, setDateRange] = useState({
    startDate: new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10),
    endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().slice(0, 10)
  })
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null)

  const { data, isLoading, isError } = useSchedule({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate
  })

  const parsedEvents = data ? parseScheduleEvents(data.events) : []

  const handleSelect = (arg: DateSelectArg) => {
    const start = arg.startStr.slice(0, 16)
    const end = arg.endStr.slice(0, 16)
    setRange({ start, end })
    setModalOpen(true)
  }

  const handleDatesSet = (arg: DatesSetArg) => {
    const newStartDate = arg.startStr.slice(0, 10)
    const newEndDate = arg.endStr.slice(0, 10)

    if (newStartDate !== dateRange.startDate || newEndDate !== dateRange.endDate) {
      setDateRange({ startDate: newStartDate, endDate: newEndDate })
    }
  }
  const handleEventClick = (info: EventClickArg) => {
    setSelectedEvent(info.event)
    setEditModalOpen(true)
  }
  const calendarRef = useRef<FullCalendar | null>(null)

  if (isLoading) return <p>Загрузка...</p>
  if (isError) return <p>Ошибка загрузки расписания</p>
  return (
    <>
      <CalendarToolbar
        calendarRef={calendarRef}
        dateRange={dateRange}
        setDuplicateModalOpen={setDuplicateModalOpen}
        setModalOpen={setModalOpen}
      />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        select={handleSelect}
        headerToolbar={false}
        events={parsedEvents}
        allDaySlot={false}
        datesSet={handleDatesSet}
        nowIndicator={true}
        dayHeaderContent={(arg) => {
          const date = arg.date
          const dayNumber = date.toLocaleDateString('ru-RU', { day: '2-digit' })
          const weekday = date.toLocaleDateString('ru-RU', { weekday: 'long' })
          return {
            html: `
              <div class="fc-custom-header">
                <div class="fc-custom-day">${dayNumber}</div>
                <div class="fc-custom-weekday">${weekday.charAt(0).toUpperCase() + weekday.slice(1)}</div>
              </div>
            `
          }
        }}
        eventClick={handleEventClick}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {range ? (
          <CreateSchedule start={range.start} end={range.end} onClose={() => setModalOpen(false)} />
        ) : (
          <CreateSchedule onClose={() => setModalOpen(false)} />
        )}
      </Modal>
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
        {selectedEvent && (
          <CreateSchedule
            isEditing={true}
            selectedEvent={selectedEvent}
            onClose={() => setEditModalOpen(false)}
          />
        )}
      </Modal>
      <Modal isOpen={duplicateModalOpen} onClose={() => setDuplicateModalOpen(false)}>
        <DuplicateSchedule onSubmit={() => setDuplicateModalOpen(false)} />
      </Modal>
    </>
  )
}
