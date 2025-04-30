import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { DateSelectArg, DatesSetArg } from '@fullcalendar/core'
import { Modal } from '@/shared/ui/Modal/Modal'
import { CreateSchedule } from '@/features/schedule/CreateSchedule'
import { useSchedule } from '@/entities/schedule'
import { parseScheduleEvents } from '@/shared/libs/parseScheduleEvents'
import { DuplicateSchedule } from '@/features/schedule/DuplicateSchedule'
import './ScheduleCalendar.css'
export const ScheduleCalendar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false)
  const [range, setRange] = useState<{ start: string; end: string } | null>(null)
  const today = new Date()
  const [dateRange, setDateRange] = useState({
    startDate: new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10),
    endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().slice(0, 10)
  })
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

  if (isLoading) return <p>Загрузка...</p>
  if (isError) return <p>Ошибка загрузки расписания</p>

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        select={handleSelect}
        headerToolbar={{
          left: 'prev next today schedule',
          center: 'title',
          right: 'timeGridWeek timeGridDay'
        }}
        events={parsedEvents}
        allDaySlot={false}
        datesSet={handleDatesSet}
        customButtons={{
          schedule: {
            text: 'Дублировать',
            click: () => {
              setDuplicateModalOpen(true)
            }
          }
        }}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {range && (
          <CreateSchedule start={range.start} end={range.end} onClose={() => setModalOpen(false)} />
        )}
      </Modal>
      <Modal isOpen={duplicateModalOpen} onClose={() => setDuplicateModalOpen(false)}>
        <DuplicateSchedule onSubmit={() => setDuplicateModalOpen(false)} />
      </Modal>
    </>
  )
}
