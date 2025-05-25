import { AxiosResponse } from "axios"
import { apiWithTokenAndCenter } from "../api"
import { GeneralStatsResponse, PartnerReportResponse, ReportFilters } from "../../types/report"

export const $getPartnerReportData = async (
  filters: ReportFilters
): Promise<AxiosResponse<PartnerReportResponse>> => {
  const response = await apiWithTokenAndCenter.get<PartnerReportResponse>(
    "/partners/reports/data/",
    {
      params: filters,
      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams()

        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            searchParams.append(key, value.join(","))
          } else if (value !== undefined && value !== null) {
            searchParams.append(key, value.toString())
          }
        })

        return searchParams.toString()
      }
    }
  )

  return response
}

export const $getPartnerGeneralStats = async (
  filters: ReportFilters
): Promise<AxiosResponse<GeneralStatsResponse>> => {
  const response = await apiWithTokenAndCenter.get<GeneralStatsResponse>(
    "/partners/reports/general-stats/",
    {
      params: filters,
      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams()

        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            searchParams.append(key, value.join(","))
          } else if (value !== undefined && value !== null) {
            searchParams.append(key, value.toString())
          }
        })

        return searchParams.toString()
      }
    }
  )

  return response
}
