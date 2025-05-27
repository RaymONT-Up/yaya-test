import { Text, TextVariant } from "@/shared/ui/Text/Text"
import s from "./ReportTable.module.scss"
import { useAppDispatch, useAppSelector } from "@/app/config/store"
import { reportFiltersActions, useReportFilters, useReportTable } from "@/entities/report"
import { selectCurrentCenter } from "@/entities/center"
import { useEffect } from "react"
import { InfoBlock } from "@/shared/ui/InfoBlock/InfoBlock"
import { Filter } from "@/shared/assets/svg/Filter"

export const ReportTable = () => {
  const dispatch = useAppDispatch()

  const { id } = useAppSelector(selectCurrentCenter)
  const { page, page_size, date_from, centers, date_to, lessons, trainers } =
    useAppSelector(useReportFilters)
  const { data, isLoading } = useReportTable({
    centerId: id,
    filters: {
      date_from,
      date_to,
      centers,
      lessons,
      page,
      page_size,
      trainers
    }
  })
  useEffect(() => {
    if (data?.count !== undefined) {
      dispatch(reportFiltersActions.setTotalCount(data.count))
    }
  }, [data?.count, dispatch])
  if (!isLoading && data?.count === 0) {
    return (
      <div className={s.emptyWrapper}>
        <InfoBlock
          title="Совпадений не найдено"
          text="Пожалуйста, используйте фильтры выше, чтобы настроить поиск более точно."
          icon={<Filter width={40} height={40} color="#3F68FF" />}
        />
      </div>
    )
  }
  const startIndex = (page - 1) * page_size
  const endIndex = startIndex + page_size
  const paginatedData = data?.results.slice(startIndex, endIndex)
  return (
    <div className={s.wrapper}>
      <table className={s.table}>
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
        <tbody>
          {paginatedData?.map((item, idx) => (
            <tr key={idx}>
              <td>
                <Text className={s.tableText} bodySize="small">
                  {idx + 1}
                </Text>
              </td>
              <td>
                <Text className={s.tableText} bodySize="small">
                  {item.child_name}
                </Text>
              </td>
              <td>
                <Text className={s.tableText} bodySize="small">
                  {item.center_name}
                </Text>
              </td>
              <td>
                <Text className={s.tableText} bodySize="small">
                  {item.lesson_name}
                </Text>
              </td>
              <td>
                <Text className={s.tableText} bodySize="small">
                  {item.trainer_name}
                </Text>
              </td>
              <td>
                <Text className={s.tableText} bodySize="small">
                  {item.datetime_str.replace(/-/g, ".").replace(" ", " ")}–{item.end_time}
                </Text>
              </td>
              <td>
                <Text className={s.tableText} bodySize="small">
                  {item.earned} ₸
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
