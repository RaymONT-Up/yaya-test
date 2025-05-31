import React, { useMemo, useRef, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { EventClickArg, type DateSelectArg, type DatesSetArg } from "@fullcalendar/core"
import { CreateSchedule } from "@/features/schedule/CreateSchedule"
import { useCancelSchedule, useMassCancelSchedules, useSchedule } from "@/entities/schedule"
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
import { EventContent } from "../EventContent/EventContent"
import { DayHeader } from "../DayHeader/DayHeader"
import { CancelSchedule } from "@/features/schedule/CancelSchedule"
import { CancelScheduleSDto } from "@/shared/types/schedule"
import { formatDateShort } from "@/shared/libs/formaDate"
import { ComponentLoader } from "@/shared/ui/ComponentLoader/ComponentLoader"
import { useDebounce } from "@/shared/libs/useDebounce"
import { useHasPermission } from "@/shared/libs/useHasPermission"
import { RolePermissionKeys } from "@/shared/types/role"

export const ScheduleCalendar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [range, setRange] = useState<{ start: string; end: string } | null>(null)
  const getWeekRange = (date: Date) => {
    const day = date.getDay() || 7
    const monday = new Date(date)
    monday.setDate(date.getDate() - day + 1)
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 7)
    return {
      startDate: monday.toISOString().slice(0, 10),
      endDate: sunday.toISOString().slice(0, 10)
    }
  }

  const [dateRange, setDateRange] = useState(getWeekRange(new Date()))
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>()
  const [hiddenEvents, setHiddenEvents] = useState<string[]>([])
  const [selectedLessonIds, setLessonIds] = useState<number[]>([])
  const debouncedLessonIds = useDebounce(selectedLessonIds, 1000)
  const { id } = useAppSelector(selectCurrentCenter)

  // Persmission check
  const hasEditSchedulePermission = useHasPermission(RolePermissionKeys.SCHEDULE_EDIT)

  const { data, isLoading } = useSchedule({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    centerId: id,
    lesson_ids: debouncedLessonIds
  })
  const pendingCancelRef = useRef<{ id: string; reason: string } | null>(null)
  const pendingMassCancelRef = useRef<CancelScheduleSDto | null>(null)

  const { mutate: cancelScheduleMutate } = useCancelSchedule({
    onSuccess: () => {},
    onError: () => {}
  })

  const { mutate: massCancelSchedulesMutate } = useMassCancelSchedules({
    onSuccess: () => {},
    onError: () => {}
  })

  const { addNotification, removeNotification } = useNotifications()

  const parsedEvents = useMemo(() => {
    return data ? parseScheduleEvents(data.events) : []
  }, [data])
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
        cancelScheduleMutate({ id: Number(id), cancel_reason: reason })
        pendingCancelRef.current = null
      }
    }, 5000)
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
        massCancelSchedulesMutate(current)
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
  const calendarRef = useRef<FullCalendar | null>(null)

  const handleDatesSet = (arg: DatesSetArg) => {
    const newStartDate = arg.startStr.slice(0, 10)
    const newEndDate = arg.endStr.slice(0, 10)

    if (newStartDate !== dateRange.startDate || newEndDate !== dateRange.endDate) {
      setDateRange({ startDate: newStartDate, endDate: newEndDate })
    }
  }
  // Открытие модального окна редактирования и отмены события
  const handleEventClick = (info: EventClickArg) => {
    if (!hasEditSchedulePermission) {
      return
    }
    const currentDate = new Date()
    const eventDate = new Date(info.event.startStr)

    if (eventDate > currentDate) {
      setSelectedEvent(info.event)
      setEditModalOpen(true)
    }
  }
  const handleOnClose = () => {
    setModalOpen(false)
    setRange(null)
    setRange({ start: "", end: "" })
  }
  return (
    <>
      <CalendarToolbar
        hasEditSchedulePermission={hasEditSchedulePermission}
        calendarRef={calendarRef}
        dateRange={dateRange}
        setDuplicateModalOpen={setDuplicateModalOpen}
        setCancelModalOpen={setCancelModalOpen}
        setModalOpen={setModalOpen}
        onLessonIdsChange={setLessonIds}
        selectedLessonIds={selectedLessonIds}
      />
      {isLoading ? (
        <div className={styles.calendarLoader}>
          <ComponentLoader size={56} />
        </div>
      ) : (
        <div className="calendar-scroll-container">
          <FullCalendar
            expandRows={false}
            height="auto"
            firstDay={1}
            timeZone="Asia/Aqtobe"
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            selectable={hasEditSchedulePermission}
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
            nowIndicatorContent={() => (
              <div className={styles.nowIndicator}>
                <div className={styles.leftDot} />
                <div className={styles.rightDot} />
              </div>
            )}
            dayHeaderContent={DayHeader}
            eventClick={handleEventClick}
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            }}
            slotDuration="00:30:00"
            selectMirror={true}
            eventDidMount={(info) => {
              const eventEl = info.el
              const eventEnd = info.event.end || info.event.start
              const now = new Date()

              if (eventEnd && eventEnd < now) {
                eventEl.classList.add("fc-event-past")
              }
            }}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            }}
          />
        </div>
      )}

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
