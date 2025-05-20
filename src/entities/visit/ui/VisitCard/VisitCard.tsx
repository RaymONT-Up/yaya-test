import React from "react"
import s from "./VisitCard.module.scss"
import { Text } from "@/shared/ui/Text/Text"
import { IVisit } from "@/shared/types/visit"
import { LessonTypeEnum } from "@/shared/types/lesson"
import { getAge } from "@/shared/libs/getChildAge"

interface VisitCardProps {
  visit: IVisit
}

export const VisitCard: React.FC<VisitCardProps> = ({ visit }) => {
  return (
    <div className={s.card}>
      <div className={s.cardMark} />
      <Text className={s.cardTitle} fontWeight={600} bodySize="small">
        {visit.lesson.name}
      </Text>
      <div className={s.cardInfo}>
        <Text className={s.cardTime} fontWeight={600} bodySize="tiny">
          {visit.book_timestamp.slice(11, 16)} –
        </Text>
        <div className={s.dot} />
        <Text className={s.cardAge} bodySize="tiny">
          {visit.lesson.min_age_str}-{visit.lesson.max_age_str}
        </Text>
        {visit.lesson.languages && visit.lesson.languages?.length > 0 && (
          <>
            <div className={s.dot} />
            <Text className={s.cardLang} bodySize="tiny">
              {visit.lesson.languages.join(", ")}
            </Text>
          </>
        )}
        {visit.lesson.level && (
          <>
            <div className={s.dot} />
            <Text className={s.cardTag} bodySize="tiny">
              {visit.lesson.level}
            </Text>
          </>
        )}
        <div className={s.dot} />
        <Text className={s.cardFormat} bodySize="tiny">
          {visit.lesson.type === LessonTypeEnum.ONLINE ? "Онлайн" : ""}
        </Text>
      </div>
      <div className={s.cardChild}>
        <Text className={s.cardChildName} fontWeight={600} bodySize="small">
          {visit.child.first_name} {visit.child.last_name}
        </Text>
        <Text className={s.cardBirthday} bodySize="tiny">
          {new Date(visit.child.birthday).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })}{" "}
          ({getAge(visit.child.birthday)} лет)
        </Text>
      </div>
    </div>
  )
}
