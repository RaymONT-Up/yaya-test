import { Text, TextVariant } from "@/shared/ui/Text/Text"
import { VisitToolbar } from "../VisitToolbar/VisitToolbar"
import { Tag, TagScheme, TagVariant } from "@/shared/ui/Tag/Tag"
import s from "./Kanban.module.scss"
import { CancelVisitDto, IVisit, LessonStateEnum } from "@/shared/types/visit"
import { useCancelVisit, useVisits, VisitCard } from "@/entities/visit"
import { useAppSelector } from "@/app/config/store"
import { selectCurrentCenter } from "@/entities/center"
import { useRef, useState } from "react"
import { format } from "date-fns"
import { useDebounce } from "@/shared/libs/useDebounce"
import { ComponentLoader } from "@/shared/ui/ComponentLoader/ComponentLoader"
import { CancelVisit } from "@/features/visit/CancelVisit"
import { useNotifications } from "@/shared/ui/Notification"
import { Check } from "@/shared/assets/svg/Check"
import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button"
import { NotificationVariant } from "@/shared/ui/Notification/ui/Notification/Notification"
import { AlertTriangle } from "@/shared/assets/svg/AlertTriangle"

type ColumnHeader = {
  title: string
  scheme: TagScheme
  state: LessonStateEnum
  className: string
}

const columns: ColumnHeader[] = [
  {
    title: "Записались",
    scheme: TagScheme.Brand,
    state: LessonStateEnum.BOOKED,
    className: s.booked
  },
  {
    title: "Посетили",
    scheme: TagScheme.Positive,
    state: LessonStateEnum.APPROVED,
    className: s.approved
  },
  {
    title: "Отменили",
    scheme: TagScheme.Danger,
    state: LessonStateEnum.CANCELED,
    className: s.canceled
  },
  {
    title: "Пропустили",
    scheme: TagScheme.Neutral,
    state: LessonStateEnum.MISSED,
    className: s.missed
  }
]

export const Kanban = () => {
  const { id } = useAppSelector(selectCurrentCenter)
  const [selectedLessonIds, setLessonIds] = useState<number[]>([])
  const [selectedVisit, setSelectedVisit] = useState<IVisit | null>(null)
  const [isCancelOpen, setCancelOpen] = useState(false)
  const debouncedLessonIds = useDebounce(selectedLessonIds, 1000)
  const [date, setDate] = useState(new Date())
  const { data: visits, isLoading } = useVisits({
    centerId: id,
    date: format(date, "yyyy-MM-dd"),
    lesson_ids: debouncedLessonIds
  })

  const { addNotification, removeNotification } = useNotifications()
  const pendingCancelRef = useRef<{ id: number; payload: CancelVisitDto } | null>(null)
  const [temporaryCanceledIds, setTemporaryCanceledIds] = useState<number[]>([])

  const { mutate: cancelVisit } = useCancelVisit({
    onSuccess: () => {
      setSelectedVisit(null)
      setTemporaryCanceledIds([])
      pendingCancelRef.current = null
    },
    onError: () => {
      addNotification({
        title: "Ошибка при отмене записи",
        variant: NotificationVariant.Danger,
        icon: <AlertTriangle />,
        className: s.cancelNotification
      })
      setSelectedVisit(null)
      setTemporaryCanceledIds([])
      pendingCancelRef.current = null
    },
    notifyOnError: false
  })

  const handleOpenCancel = (visit: IVisit) => {
    if (visit.state !== LessonStateEnum.CANCELED && !temporaryCanceledIds.includes(visit.id)) {
      setSelectedVisit(visit)
      setCancelOpen(true)
    }
  }
  const handleCancel = (payload: CancelVisitDto) => {
    const { visit_id: id } = payload
    setTemporaryCanceledIds((prev) => [...prev, id])
    pendingCancelRef.current = { id, payload }

    const notificationId = addNotification(
      {
        title: "Запись отменена",
        variant: NotificationVariant.Success,
        icon: <Check />,
        className: s.cancelNotification,
        primaryButton: (
          <Button
            variant={ButtonVariant.Subtle}
            size={ButtonSize.Small}
            onClick={() => {
              setTemporaryCanceledIds((prev) => prev.filter((vid) => vid !== id))
              pendingCancelRef.current = null
              removeNotification(notificationId)
              addNotification({
                title: "Запись восстановлена",
                variant: NotificationVariant.Success,
                icon: <Check />,
                className: s.cancelNotification
              })
            }}
          >
            Восстановить
          </Button>
        )
      },
      8000
    )

    setTimeout(() => {
      const current = pendingCancelRef.current
      if (current?.id === id) {
        cancelVisit(current.payload)
      }
    }, 8000)
  }
  return (
    <>
      <VisitToolbar
        date={date}
        onChangeDate={setDate}
        onLessonIdsChange={setLessonIds}
        selectedLessonIds={selectedLessonIds}
      />
      {isLoading || !visits ? (
        <div className={s.kanbanLoader}>
          <ComponentLoader size={56} />
        </div>
      ) : (
        <div className={s.kanban}>
          {columns.map((column, index) => {
            let columnVisits = visits.filter((v) => v.state === column.state)

            if (column.state === LessonStateEnum.CANCELED) {
              const tempCanceled = visits.filter((v) => temporaryCanceledIds.includes(v.id))
              columnVisits = [...columnVisits, ...tempCanceled]
            } else {
              columnVisits = columnVisits.filter((v) => !temporaryCanceledIds.includes(v.id))
            }
            return (
              <div key={index} className={`${s.column} ${column.className}`}>
                <div className={s.header}>
                  <Text variant={TextVariant.HEADING} headingLevel="h8" className={s.title}>
                    {column.title}
                  </Text>
                  <Tag
                    label={columnVisits.length.toString()}
                    scheme={column.scheme}
                    variant={TagVariant.Secondary}
                    className={s.tag}
                  />
                </div>
                <div className={s.items}>
                  {columnVisits.map((visit) => {
                    const isCanceledNow = temporaryCanceledIds.includes(visit.id)
                    return (
                      <VisitCard
                        key={visit.id}
                        visit={visit}
                        canceledNow={isCanceledNow}
                        onClick={() => handleOpenCancel(visit)}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
      {selectedVisit && (
        <CancelVisit
          isOpen={isCancelOpen}
          selectedVisit={selectedVisit}
          onClose={() => setCancelOpen(false)}
          handleCancel={handleCancel}
        />
      )}
    </>
  )
}
