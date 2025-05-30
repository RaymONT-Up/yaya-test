import { Text, TextVariant } from "@/shared/ui/Text/Text"
import s from "./ReportTableThead.module.scss"

export const ReportTableThead = () => {
  return (
    <thead>
      <tr>
        <th>
          <Text variant={TextVariant.HEADING} headingLevel="h9" className={s.theadTitle}>
            №
          </Text>
        </th>
        <th>
          <Text variant={TextVariant.HEADING} headingLevel="h9" className={s.theadTitle}>
            Фио ребенка
          </Text>
        </th>
        <th>
          <Text variant={TextVariant.HEADING} headingLevel="h9" className={s.theadTitle}>
            Центр
          </Text>
        </th>
        <th>
          <Text variant={TextVariant.HEADING} headingLevel="h9" className={s.theadTitle}>
            Секция
          </Text>
        </th>
        <th>
          <Text variant={TextVariant.HEADING} headingLevel="h9" className={s.theadTitle}>
            Тренер
          </Text>
        </th>
        <th>
          <Text variant={TextVariant.HEADING} headingLevel="h9" className={s.theadTitle}>
            Дата и время
          </Text>
        </th>
        <th>
          <Text variant={TextVariant.HEADING} headingLevel="h9" className={s.theadTitle}>
            Заработано
          </Text>
        </th>
      </tr>
    </thead>
  )
}
