import React, { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { type DateSelectArg, type DatesSetArg } from '@fullcalendar/core'
import { Modal } from '@/shared/ui/Modal/Modal'
import { CreateSchedule } from '@/features/schedule/CreateSchedule'
import { useSchedule } from '@/entities/schedule'
import { parseScheduleEvents } from '@/shared/libs/parseScheduleEvents'
import { DuplicateSchedule } from '@/features/schedule/DuplicateSchedule'
import './ScheduleCalendar.css'
import styles from './ScheduleCalendar.module.scss'
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/Button'
import { ChevronRight } from '@/shared/assets/svg/ChevronRight'
import { ChevronLeft } from '@/shared/assets/svg/ChevronLeft'
import { Filter } from '@/shared/assets/svg/Filter'
import { Calendar } from '@/shared/assets/svg/Calendar'
import { Plus } from '@/shared/assets/svg/Plus'
import { Settings } from '@/shared/assets/svg/Settings'
import { ChevronDown } from '@/shared/assets/svg/ChevronDown'

const formatDateRange = (startISO: string, endISO: string) => {
  const start = new Date(startISO)
  const end = new Date(endISO)

  const startDay = String(start.getDate()).padStart(2, '0')
  const endDay = String(end.getDate()).padStart(2, '0')
  const month = end.toLocaleString('ru-RU', { month: 'short' }) // Фев
  const year = end.getFullYear()

  return `${startDay} – ${endDay} ${month}, ${year}`
}

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

  const calendarRef = useRef<FullCalendar | null>(null)

  if (isLoading) return <p>Загрузка...</p>
  if (isError) return <p>Ошибка загрузки расписания</p>
  return (
    <>
      <div className={styles.calendarToolbar}>
        <div className={styles.left}>
          <Button
            size={ButtonSize.Small}
            variant={ButtonVariant.Subtle}
            onClick={() => calendarRef.current?.getApi().today()}
          >
            Сегодня
          </Button>
          <div className={styles.changeDate}>
            <Button
              isIconButton
              size={ButtonSize.Small}
              variant={ButtonVariant.Subtle}
              onClick={() => calendarRef.current?.getApi().prev()}
              iconEnd={<ChevronLeft color="#262527" width={16} height={16} />}
            />
            <Button
              isIconButton
              size={ButtonSize.Small}
              variant={ButtonVariant.Subtle}
              onClick={() => calendarRef.current?.getApi().next()}
              iconEnd={<ChevronRight color="#262527" width={16} height={16} />}
            />
          </div>
          <Button
            size={ButtonSize.Small}
            iconStart={<Calendar width={16} height={16} />}
            variant={ButtonVariant.Subtle}
          >
            {formatDateRange(dateRange.startDate, dateRange.endDate)}
          </Button>
          <Button
            size={ButtonSize.Small}
            variant={ButtonVariant.Subtle}
            isIconButton
            iconStart={<Filter width={16} height={16} />}
          />
        </div>

        <div className={styles.center}></div>
        <div className={styles.right}>
          <Button
            iconStart={<Settings />}
            iconEnd={<ChevronDown />}
            size={ButtonSize.Small}
            variant={ButtonVariant.Neutral}
            onClick={() => setDuplicateModalOpen(true)}
          >
            Редактировать
          </Button>
          <Button
            iconStart={<Plus />}
            size={ButtonSize.Small}
            variant={ButtonVariant.Primary}
            onClick={() => setModalOpen(true)}
          >
            Добавить занятие
          </Button>
        </div>
      </div>
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
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {range ? (
          <CreateSchedule start={range.start} end={range.end} onClose={() => setModalOpen(false)} />
        ) : (
          <CreateSchedule onClose={() => setModalOpen(false)} />
        )}
      </Modal>
      <Modal isOpen={duplicateModalOpen} onClose={() => setDuplicateModalOpen(false)}>
        <DuplicateSchedule onSubmit={() => setDuplicateModalOpen(false)} />
      </Modal>
    </>
  )
}
