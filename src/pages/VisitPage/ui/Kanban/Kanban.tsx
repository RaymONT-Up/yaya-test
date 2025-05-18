import { Text, TextVariant } from "@/shared/ui/Text/Text"
import s from "./Kanban.module.scss"

export const Kanban = () => {
  return (
    <div className={s.kanban}>
      <div className={`${s.column} ${s.signed}`}>
        <Text variant={TextVariant.HEADING} headingLevel="h8" className={s.title}>
          Записались
        </Text>
      </div>
      <div className={`${s.column} ${s.visited}`}>
        <Text variant={TextVariant.HEADING} headingLevel="h8" className={s.title}>
          Посетили
        </Text>
      </div>
      <div className={`${s.column} ${s.canceled}`}>
        <Text variant={TextVariant.HEADING} headingLevel="h8" className={s.title}>
          Отменили
        </Text>
      </div>
      <div className={`${s.column} ${s.missed}`}>
        <Text variant={TextVariant.HEADING} headingLevel="h8" className={s.title}>
          Пропустили
        </Text>
      </div>
    </div>
  )
}
