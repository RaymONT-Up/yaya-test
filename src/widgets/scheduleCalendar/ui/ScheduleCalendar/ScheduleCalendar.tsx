import React, { useMemo, useRef, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { EventClickArg, type DateSelectArg, type DatesSetArg } from "@fullcalendar/core"
import { CreateSchedule } from "@/features/schedule/CreateSchedule"
import { useSchedule } from "@/entities/schedule"
import { parseScheduleEvents } from "@/shared/libs/parseScheduleEvents"
import { DuplicateSchedule } from "@/features/schedule/DuplicateSchedule"
import "./ScheduleCalendar.css"
import { CalendarToolbar } from "../CalendarToolbar/CalendarToolbar"
import { EventApi } from "@fullcalendar/core"
import { useAppSelector } from "@/app/config/store"
import { selectCurrentCenter } from "@/entities/center"
import { EditSchedule } from "@/features/schedule/EditSchedule"
import { useNotifications } from "@/shared/ui/Notification"
import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button"
import { NotificationVariant } from "@/shared/ui/Notification/ui/Notification/Notification"
import styles from "./ScheduleCalendar.module.scss"
import { Check } from "@/shared/assets/svg/Check"
import { $cancelSchedule, $cancelSchedules } from "@/shared/api/schedule/schedule"
import { EventContent } from "../EventContent/EventContent"
import { DayHeader } from "../DayHeader/DayHeader"
import { CancelSchedule } from "@/features/schedule/CancelSchedule"
import { CancelScheduleSDto } from "@/shared/types/schedule"
import { formatDateShort } from "@/shared/libs/formaDate"

export const ScheduleCalendar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [range, setRange] = useState<{ start: string; end: string } | null>(null)
  const today = new Date()
  const [dateRange, setDateRange] = useState({
    startDate: new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10),
    endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().slice(0, 10)
  })
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>()
  const [hiddenEvents, setHiddenEvents] = useState<string[]>([])
  const pendingCancelRef = useRef<{ id: string; reason: string } | null>(null)
  const pendingMassCancelRef = useRef<CancelScheduleSDto | null>(null)

  const { id } = useAppSelector(selectCurrentCenter)

  const { data } = useSchedule({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    centerId: id
  })
  const { addNotification, removeNotification } = useNotifications()

  const parsedEvents = data ? parseScheduleEvents(data.events) : []
  const visibleEvents = useMemo(() => {
    return parsedEvents?.filter((event) => !hiddenEvents.includes(event.id))
  }, [parsedEvents, hiddenEvents])

  const handleCancelScheduleRequest = (id: string, reason: string) => {
    setHiddenEvents((prev) => [...prev, id])
    const cancelData = { id, reason }
    pendingCancelRef.current = cancelData

    // показываем уведомление
    const notificationId = addNotification({
      title: "Занятие удалено",
      variant: NotificationVariant.Success,
      primaryButton: (
        <Button
          variant={ButtonVariant.Subtle}
          size={ButtonSize.Small}
          onClick={() => {
            setHiddenEvents((prev) => prev.filter((eId) => eId !== id))
            pendingCancelRef.current = null
            removeNotification(notificationId)
            addNotification({
              title: "Занятие восстановлено",
              variant: NotificationVariant.Success,
              icon: <Check />,
              className: styles.cancelNotification
            })
          }}
        >
          Восстановить
        </Button>
      ),
      icon: <Check />,
      className: styles.cancelNotification
    })

    // через 5 секунд — если не восстановлено, отправляем запрос
    setTimeout(() => {
      const current = pendingCancelRef.current
      if (current?.id === id) {
        cancelSchedule(id, reason)
        pendingCancelRef.current = null
      }
    }, 5000)
  }
  const cancelSchedule = (id: string, reason: string) => {
    $cancelSchedule({ id: Number(id), cancel_reason: reason })
  }

  const handleMassCancelSchedules = (dto: CancelScheduleSDto) => {
    const matchingEvents = parsedEvents.filter((event) => {
      const eventDate = new Date(event.start)
      const start = new Date(dto.start_date)
      const end = new Date(dto.end_date)
      end.setHours(23, 59, 59, 999)

      return (
        eventDate >= start &&
        eventDate <= end &&
        dto.lessons.includes(Number(event.extendedProps.lesson?.id))
      )
    })

    const idsToHide = matchingEvents.map((e) => e.id)
    setHiddenEvents((prev) => [...prev, ...idsToHide])
    pendingMassCancelRef.current = dto
    const startFormatted = formatDateShort(dto.start_date)
    const endFormatted = formatDateShort(dto.end_date)
    const notificationId = addNotification({
      title: `Занятия с ${startFormatted} – ${endFormatted} отменены!`,
      variant: NotificationVariant.Success,
      primaryButton: (
        <Button
          variant={ButtonVariant.Subtle}
          size={ButtonSize.Small}
          onClick={() => {
            setHiddenEvents((prev) => prev.filter((id) => !idsToHide.includes(id)))
            pendingMassCancelRef.current = null
            removeNotification(notificationId)
            addNotification({
              title: "Занятия восстановлены",
              variant: NotificationVariant.Success,
              icon: <Check />,
              className: styles.cancelNotification
            })
          }}
        >
          Восстановить
        </Button>
      ),
      icon: <Check />,
      className: styles.cancelNotification
    })

    setTimeout(() => {
      const current = pendingMassCancelRef.current
      if (current) {
        $cancelSchedules(current)
        pendingMassCancelRef.current = null
      }
    }, 5000)
  }
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
    const currentDate = new Date()
    const eventDate = new Date(info.event.startStr)

    if (eventDate > currentDate) {
      setSelectedEvent(info.event)
      setEditModalOpen(true)
    }
  }
  const calendarRef = useRef<FullCalendar | null>(null)
  const handleOnClose = () => {
    setModalOpen(false)
    setRange(null)
    setRange({ start: "", end: "" })
  }
  // if (isLoading) return <p>Загрузка...</p>
  // if (isError) return <p>Ошибка загрузки расписания</p>
  return (
    <>
      <CalendarToolbar
        calendarRef={calendarRef}
        dateRange={dateRange}
        setDuplicateModalOpen={setDuplicateModalOpen}
        setCancelModalOpen={setCancelModalOpen}
        setModalOpen={setModalOpen}
      />
      <FullCalendar
        timeZone="Asia/Aqtobe"
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        select={handleSelect}
        selectAllow={(selectInfo) => {
          const now = new Date()
          const start = new Date(selectInfo.start)
          return start >= now
        }}
        headerToolbar={false}
        events={visibleEvents}
        eventContent={EventContent}
        allDaySlot={false}
        datesSet={handleDatesSet}
        nowIndicator={true}
        dayHeaderContent={DayHeader}
        eventClick={handleEventClick}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        }}
        slotDuration="01:00:00"
        selectMirror={true}
      />
      <CreateSchedule
        isOpen={modalOpen}
        start={range?.start}
        end={range?.end}
        onClose={handleOnClose}
      />
      {selectedEvent && (
        <EditSchedule
          selectedEvent={selectedEvent}
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          handleCancelScheduleRequest={handleCancelScheduleRequest}
        />
      )}
      <DuplicateSchedule onClose={() => setDuplicateModalOpen(false)} isOpen={duplicateModalOpen} />
      <CancelSchedule
        onClose={() => setCancelModalOpen(false)}
        isOpen={cancelModalOpen}
        handleCancelSchedules={handleMassCancelSchedules}
      />
    </>
  )
}
