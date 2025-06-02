import { Text } from "@/shared/ui/Text/Text"
import s from "./ReportTable.module.scss"
import { useAppDispatch, useAppSelector } from "@/app/config/store"
import { reportFiltersActions, useReportFilters, useReportTable } from "@/entities/report"
import { selectCurrentCenter } from "@/entities/center"
import { useEffect } from "react"
import { InfoBlock } from "@/shared/ui/InfoBlock/InfoBlock"
import { Filter } from "@/shared/assets/svg/Filter"
import { ReportTableThead } from "../ReportTableThead/ReportTableThead"
import { TableSkeleton } from "@/widgets/reportTable/ui/TableSkeleton/TableSkeleton"
import { Tooltip } from "@/shared/ui/Tooltip/Tooltip"

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
    if (data?.page_count !== undefined) {
      dispatch(reportFiltersActions.setPagesCount(data.page_count))
    }
    if (data?.count !== undefined) {
      dispatch(reportFiltersActions.setTotalCount(data.count))
    }
  }, [data?.page_count, data?.count, dispatch])
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

  return (
    <div className={s.wrapper}>
      <table className={s.table}>
        <ReportTableThead />
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <tbody>
            {data?.results?.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <Text className={s.tableText} bodySize="small">
                    {idx + 1}
                  </Text>
                </td>
                <td>
                  <Text className={s.tableText} bodySize="small">
                    <Tooltip position="top" text={item.child_name}>
                      {item.child_name}
                    </Tooltip>
                  </Text>
                </td>
                <td>
                  <Text className={s.tableText} bodySize="small">
                    <Tooltip position="top" text={item.center_name}>
                      {item.center_name}
                    </Tooltip>
                  </Text>
                </td>
                <td>
                  <Text className={s.tableText} bodySize="small">
                    <Tooltip position="top" text={item.lesson_name}>
                      {item.lesson_name}
                    </Tooltip>
                  </Text>
                </td>
                <td>
                  <Text className={s.tableText} bodySize="small">
                    <Tooltip position="top" text={item.trainer_name}>
                      {item.trainer_name}
                    </Tooltip>
                  </Text>
                </td>
                <td>
                  <Text className={s.tableText} bodySize="small">
                    <Tooltip
                      position="top"
                      text={`${item.datetime_str.replace(/-/g, ".").replace(" ", " ")}–${item.end_time}`}
                    >
                      {item.datetime_str.replace(/-/g, ".").replace(" ", " ")}–{item.end_time}
                    </Tooltip>
                  </Text>
                </td>
                <td>
                  <Text className={s.tableText} bodySize="small">
                    <Tooltip position="top" text={`${item.earned} ₸`}>
                      {item.earned} ₸
                    </Tooltip>
                  </Text>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  )
}
