import { AxiosResponse } from "axios"
import { Permission, RoleResponse } from "../../types/role"
import { apiWithTokenAndCenter } from "@/shared/api/api"

export const $getPermissions = async (): Promise<AxiosResponse<Permission[]>> => {
  const response = await apiWithTokenAndCenter.get<Permission[]>("/partners/permissions/")
  return response
}

export const $getRole = async (): Promise<AxiosResponse<RoleResponse>> => {
  const response = await apiWithTokenAndCenter.get<RoleResponse>("/partners/profile/")
  return response
}
