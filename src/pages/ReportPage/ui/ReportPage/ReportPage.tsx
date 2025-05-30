import { Text, TextVariant } from "@/shared/ui/Text/Text"
import s from "./ReportPage.module.scss"
import { ReportToolbar } from "@/widgets/report"
import { ReportStats } from "@/widgets/reportStats"
import { ReportTable, TableReportPagination } from "@/widgets/reportTable"

const ReportPage = () => {
  return (
    <section className={s.reportPage}>
      <Text variant={TextVariant.HEADING} headingLevel="h5" className={s.title}>
        Отчеты
      </Text>
      <ReportToolbar />
      <ReportStats />
      <ReportTable />
      <TableReportPagination />
    </section>
  )
}

export default ReportPage
