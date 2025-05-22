import { CancelVisitDto, IVisit } from "../../types/visit"
import { apiWithTokenAndCenter } from "../api"
import { AxiosResponse } from "axios"

// date format "YYYY-MM-DD"
export const $getVisits = async (
  date?: string,
  lesson_ids?: number[]
): Promise<AxiosResponse<IVisit[]>> => {
  const response = await apiWithTokenAndCenter.get<IVisit[]>("/partners/visits/", {
    params: {
      date,
      lesson_ids
    },
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams()

      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => {
            searchParams.append(key, val.toString())
          })
        } else if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString())
        }
      })

      return searchParams.toString()
    }
  })
  return response
}
// Отмена одного конкретного посещения
export const $cancelVisit = async (data: CancelVisitDto): Promise<AxiosResponse<IVisit>> => {
  const response = await apiWithTokenAndCenter.post("/partners/visits/cancel/", data)
  return response
}
