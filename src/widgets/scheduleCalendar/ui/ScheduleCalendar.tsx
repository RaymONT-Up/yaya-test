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
import { useAppSelector } from '@/app/config/store'
import { selectCurrentCenter } from '@/entities/center'
const renderDayHeader = ({ date }: { date: Date }) => {
  const dayNumber = date.toLocaleDateString('ru-RU', { day: '2-digit' })
  const weekday = date.toLocaleDateString('ru-RU', { weekday: 'long' })

  return (
    <div className="fc-custom-header">
      <div className="fc-custom-day">{dayNumber}</div>
      <div className="fc-custom-weekday">{weekday.charAt(0).toUpperCase() + weekday.slice(1)}</div>
    </div>
  )
}

export const ScheduleCalendar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false)
  // const [editModalOpen, setEditModalOpen] = useState(false)
  const [range, setRange] = useState<{ start: string; end: string } | null>(null)
  const today = new Date()
  const [dateRange, setDateRange] = useState({
    startDate: new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10),
    endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().slice(0, 10)
  })
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null)
  //
  const { id } = useAppSelector(selectCurrentCenter)

  const { data, isError } = useSchedule({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    centerId: id
  })

  const parsedEvents = data ? parseScheduleEvents(data.events) : []

  const handleSelect = (arg: DateSelectArg) => {
    const now = new Date()
    const selectionStart = new Date(arg.start)

    if (selectionStart < now) {
      return
    }

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
    console.log(selectedEvent)
    // setEditModalOpen(true)
  }
  const calendarRef = useRef<FullCalendar | null>(null)
  const handleOnClose = () => {
    setModalOpen(false)
    setRange(null)
    setRange({ start: '', end: '' })
  }
  // if (isLoading) return <p>Загрузка...</p>
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
        timeZone="Asia/Aqtobe"
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
        dayHeaderContent={renderDayHeader}
        eventClick={handleEventClick}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
        selectMirror={true}
      />

      <CreateSchedule
        isOpen={modalOpen}
        start={range?.start}
        end={range?.end}
        onClose={handleOnClose}
      />
      {/* <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
        {selectedEvent && (
          <CreateSchedule
            isEditing={true}
            selectedEvent={selectedEvent}
            onClose={() => setEditModalOpen(false)}
          />
        )}
      </Modal> */}
      <Modal isOpen={duplicateModalOpen} onClose={() => setDuplicateModalOpen(false)}>
        <DuplicateSchedule onSubmit={() => setDuplicateModalOpen(false)} />
      </Modal>
    </>
  )
}
