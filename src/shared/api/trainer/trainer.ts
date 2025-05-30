import { AxiosResponse } from "axios"
import { apiWithTokenAndCenter } from "../api"
import { Trainer } from "../../types/trainer"

export const $getTrainers = async (centers?: number[]): Promise<AxiosResponse<Trainer[]>> => {
  const response = await apiWithTokenAndCenter.get<Trainer[]>("/partners/trainers/", {
    params: {
      centers: centers
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

        if (Array.isArray(value)) {
          searchParams.append(key, value.join(","))
        } else {
          searchParams.append(key, value.toString())
        }
      })

      return searchParams.toString()
    }
  })
  return response
}
