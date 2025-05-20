import { Text, TextVariant } from "@/shared/ui/Text/Text"
import { VisitToolbar } from "../VisitToolbar/VisitToolbar"
import { Tag, TagScheme, TagVariant } from "@/shared/ui/Tag/Tag"
import s from "./Kanban.module.scss"
import { LessonStateEnum } from "@/shared/types/visit"
import { useVisits, VisitCard } from "@/entities/visit"
import { useAppSelector } from "@/app/config/store"
import { selectCurrentCenter } from "@/entities/center"
import { Loader } from "@/shared/ui/Loader/Loader"
import { useState } from "react"
import { format } from "date-fns"
import { useDebounce } from "@/shared/libs/useDebounce"
import { ComponentLoader } from "@/shared/ui/ComponentLoader/ComponentLoader"

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
  const debouncedLessonIds = useDebounce(selectedLessonIds, 1000)
  const [date, setDate] = useState(new Date())
  const { data: visits, isLoading } = useVisits({
    centerId: id,
    date: format(date, "yyyy-MM-dd"),
    lesson_ids: debouncedLessonIds
  })
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
            const columnVisits = visits.filter((v) => v.state === column.state)

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
                  {columnVisits.map((visit) => (
                    <VisitCard key={visit.id} visit={visit} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
