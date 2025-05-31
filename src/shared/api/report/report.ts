import { AxiosResponse } from "axios"
import { apiWithTokenAndCenter } from "../api"
import {
  GeneralStatsResponse,
  PartnerReportResponse,
  ReportDownloadFilters,
  ReportFilters,
  ReportStatsFilters
} from "../../types/report"

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
          if (
            value === undefined ||
            value === null ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
          ) {
            return
          }

          if (Array.isArray(value)) {
            searchParams.append(key, value.join(","))
          } else {
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
  filters: ReportStatsFilters
): Promise<AxiosResponse<GeneralStatsResponse>> => {
  const response = await apiWithTokenAndCenter.get<GeneralStatsResponse>(
    "/partners/reports/general-stats/",
    {
      params: filters,
      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams()

        Object.entries(params).forEach(([key, value]) => {
          if (
            value === undefined ||
            value === null ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
          ) {
            return
          }

          if (Array.isArray(value)) {
            searchParams.append(key, value.join(","))
          } else {
            searchParams.append(key, value.toString())
          }
        })

        return searchParams.toString()
      }
    }
  )

  return response
}
export const $downloadReportFile = async (
  filters: ReportDownloadFilters
): Promise<AxiosResponse<Blob>> => {
  const response = await apiWithTokenAndCenter.get<Blob>("/partners/reports/download/", {
    params: filters,
    responseType: "blob",
    headers: {
      Accept: "*/*"
    },
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          return
        }
        searchParams.append(key, Array.isArray(value) ? value.join(",") : value.toString())
      })
      return searchParams.toString()
    }
  })

  return response
}
