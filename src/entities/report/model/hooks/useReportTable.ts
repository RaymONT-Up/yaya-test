import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { PartnerReportResponse, ReportFilters } from "@/shared/types/report"
import { $getPartnerReportData } from "@/shared/api/report/report"

export const PARTNER_REPORT_QUERY_KEY = "partner-report"

interface useReportTableParams {
  filters: ReportFilters
  centerId: number | null
}
export const useReportTable = ({ filters, centerId }: useReportTableParams, enabled = true) => {
  const hasDates = filters.date_from.trim() !== "" && filters.date_to.trim() !== ""

  return useQuery<PartnerReportResponse>({
    queryKey: [PARTNER_REPORT_QUERY_KEY, filters],
    queryFn: () => $getPartnerReportData(filters).then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: enabled && hasDates && centerId !== null
  })
}
