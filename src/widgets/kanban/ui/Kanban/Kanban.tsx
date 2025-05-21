import { Text, TextVariant } from "@/shared/ui/Text/Text"
import { VisitToolbar } from "../VisitToolbar/VisitToolbar"
import { Tag, TagScheme, TagVariant } from "@/shared/ui/Tag/Tag"
import s from "./Kanban.module.scss"
import { CancelVisitDto, IVisit, LessonStateEnum } from "@/shared/types/visit"
import { useCancelVisit, useVisits, VisitCard } from "@/entities/visit"
import { useAppSelector } from "@/app/config/store"
import { selectCurrentCenter } from "@/entities/center"
import { Loader } from "@/shared/ui/Loader/Loader"
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
import { LessonLanguageEnum, LessonLevelEnum, LessonTypeEnum } from "@/shared/types/lesson"

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
const fakeVisits: IVisit[] = [
  {
    id: 25122,
    child: {
      id: 3785,
      first_name: "Баг",
      last_name: "",
      birthday: "2015-02-19"
    },
    lesson: {
      id: 5940,
      name: "Тестик рестик",
      center_id: 712,
      min_age_str: "4г. 7м.",
      max_age_str: "16л.",
      duration: 30,
      type: LessonTypeEnum.OFFLINE,
      // languages: [],
      level: LessonLevelEnum.Beginner
    },
    state: LessonStateEnum.MISSED,
    book_timestamp: "2025-05-15T15:41:15.340828+05:00",
    approve_timestamp: null,
    cancelled_timestamp: null
  },
  {
    id: 25123,
    child: {
      id: 3786,
      first_name: "Айнура",
      last_name: "Тестова",
      birthday: "2013-10-10"
    },
    lesson: {
      id: 5941,
      name: "Английский язык",
      center_id: 713,
      min_age_str: "10л.",
      max_age_str: "15л.",
      duration: 60,
      type: LessonTypeEnum.ONLINE,
      // languages: [LessonLanguageEnum.EN],
      level: LessonLevelEnum.CLASS
    },
    state: LessonStateEnum.APPROVED,
    book_timestamp: "2025-05-16T10:00:00+05:00",
    approve_timestamp: "2025-05-16T11:00:00+05:00",
    cancelled_timestamp: null
  },
  {
    id: 25123,
    child: {
      id: 3786,
      first_name: "Айнура",
      last_name: "Тестова",
      birthday: "2013-10-10"
    },
    lesson: {
      id: 5941,
      name: "Английский язык",
      center_id: 713,
      min_age_str: "10л.",
      max_age_str: "15л.",
      duration: 60,
      type: LessonTypeEnum.ONLINE,
      // languages: [LessonLanguageEnum.EN],
      level: LessonLevelEnum.CLASS
    },
    state: LessonStateEnum.APPROVED,
    book_timestamp: "2025-05-16T10:00:00+05:00",
    approve_timestamp: "2025-05-16T11:00:00+05:00",
    cancelled_timestamp: null
  },
  {
    id: 25123,
    child: {
      id: 3786,
      first_name: "Айнура",
      last_name: "Тестова",
      birthday: "2013-10-10"
    },
    lesson: {
      id: 5941,
      name: "Английский язык",
      center_id: 713,
      min_age_str: "10л.",
      max_age_str: "15л.",
      duration: 60,
      type: LessonTypeEnum.ONLINE,
      // languages: [LessonLanguageEnum.EN],
      level: LessonLevelEnum.CLASS
    },
    state: LessonStateEnum.APPROVED,
    book_timestamp: "2025-05-16T10:00:00+05:00",
    approve_timestamp: "2025-05-16T11:00:00+05:00",
    cancelled_timestamp: null
  },
  {
    id: 25123,
    child: {
      id: 3786,
      first_name: "Айнура",
      last_name: "Тестова",
      birthday: "2013-10-10"
    },
    lesson: {
      id: 5941,
      name: "Английский язык",
      center_id: 713,
      min_age_str: "10л.",
      max_age_str: "15л.",
      duration: 60,
      type: LessonTypeEnum.ONLINE,
      // languages: [LessonLanguageEnum.EN],
      level: LessonLevelEnum.CLASS
    },
    state: LessonStateEnum.APPROVED,
    book_timestamp: "2025-05-16T10:00:00+05:00",
    approve_timestamp: "2025-05-16T11:00:00+05:00",
    cancelled_timestamp: null
  },
  {
    id: 25123,
    child: {
      id: 3786,
      first_name: "Айнура",
      last_name: "Тестова",
      birthday: "2013-10-10"
    },
    lesson: {
      id: 5941,
      name: "Английский язык",
      center_id: 713,
      min_age_str: "10л.",
      max_age_str: "15л.",
      duration: 60,
      type: LessonTypeEnum.ONLINE,
      // languages: [LessonLanguageEnum.EN],
      level: LessonLevelEnum.CLASS
    },
    state: LessonStateEnum.APPROVED,
    book_timestamp: "2025-05-16T10:00:00+05:00",
    approve_timestamp: "2025-05-16T11:00:00+05:00",
    cancelled_timestamp: null
  },
  {
    id: 25123,
    child: {
      id: 3786,
      first_name: "Айнура",
      last_name: "Тестова",
      birthday: "2013-10-10"
    },
    lesson: {
      id: 5941,
      name: "Английский язык",
      center_id: 713,
      min_age_str: "10л.",
      max_age_str: "15л.",
      duration: 60,
      type: LessonTypeEnum.ONLINE,
      // languages: [LessonLanguageEnum.EN],
      level: LessonLevelEnum.CLASS
    },
    state: LessonStateEnum.APPROVED,
    book_timestamp: "2025-05-16T10:00:00+05:00",
    approve_timestamp: "2025-05-16T11:00:00+05:00",
    cancelled_timestamp: null
  },
  {
    id: 25124,
    child: {
      id: 3787,
      first_name: "Данияр",
      last_name: "Казахстанов",
      birthday: "2016-01-01"
    },
    lesson: {
      id: 5942,
      name: "Программирование",
      center_id: 714,
      min_age_str: "7л.",
      max_age_str: "14л.",
      duration: 45,
      type: LessonTypeEnum.OFFLINE,
      languages: [LessonLanguageEnum.RU],
      level: LessonLevelEnum.CLASS
    },
    state: LessonStateEnum.CANCELED,
    book_timestamp: "2025-05-14T12:30:00+05:00",
    approve_timestamp: null,
    cancelled_timestamp: "2025-05-15T09:00:00+05:00"
  },
  {
    id: 25125,
    child: {
      id: 3788,
      first_name: "Алекс",
      last_name: "Петров",
      birthday: "2014-03-15"
    },
    lesson: {
      id: 5943,
      name: "Математика",
      center_id: 715,
      min_age_str: "6л.",
      max_age_str: "12л.",
      duration: 60,
      type: LessonTypeEnum.ONLINE,
      languages: [LessonLanguageEnum.KZ],
      level: LessonLevelEnum.CLASS
    },
    state: LessonStateEnum.BOOKED,
    book_timestamp: "2025-05-20T08:00:00+05:00",
    approve_timestamp: null,
    cancelled_timestamp: null
  },
  {
    id: 25126,
    child: {
      id: 3789,
      first_name: "София",
      last_name: "Иванова",
      birthday: "2017-07-25"
    },
    lesson: {
      id: 5944,
      name: "Шахматы",
      center_id: 716,
      min_age_str: "5л.",
      max_age_str: "10л.",
      duration: 60,
      languages: [LessonLanguageEnum.KZ],
      level: LessonLevelEnum.Beginner,
      type: LessonTypeEnum.OFFLINE
    },
    state: LessonStateEnum.APPROVED,
    book_timestamp: "2025-05-17T09:00:00+05:00",
    approve_timestamp: "2025-05-17T10:00:00+05:00",
    cancelled_timestamp: null
  },
  {
    id: 25127,
    child: {
      id: 3790,
      first_name: "Жан",
      last_name: "Абдиров",
      birthday: "2012-11-30"
    },
    lesson: {
      id: 5945,
      name: "История",
      center_id: 717,
      min_age_str: "8л.",
      max_age_str: "14л.",
      duration: 45,
      type: LessonTypeEnum.ONLINE,
      languages: [LessonLanguageEnum.KZ],
      level: LessonLevelEnum.Beginner
    },
    state: LessonStateEnum.BOOKED,
    book_timestamp: "2025-05-21T11:30:00+05:00",
    approve_timestamp: null,
    cancelled_timestamp: null
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
  if (!visits) return <Loader />
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
            let columnVisits = fakeVisits.filter((v) => v.state === column.state)

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
