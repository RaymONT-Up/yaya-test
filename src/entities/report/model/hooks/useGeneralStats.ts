import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { $getPartnerGeneralStats } from "@/shared/api/report/report"
import { GeneralStatsResponse, ReportStatsFilters } from "@/shared/types/report"

export const PARTNER_GENERAL_STATS_QUERY_KEY = "partner-general-stats"

interface UseGeneralStatsParams {
  filters: ReportStatsFilters
  centerId: number | null
}

export const useGeneralStats = ({ filters, centerId }: UseGeneralStatsParams, enabled = true) => {
  const hasDates = filters.date_from.trim() !== "" && filters.date_to.trim() !== ""

  return useQuery<GeneralStatsResponse>({
    queryKey: [PARTNER_GENERAL_STATS_QUERY_KEY, filters],
    queryFn: () => $getPartnerGeneralStats(filters).then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: enabled && hasDates && centerId !== null
  })
}
