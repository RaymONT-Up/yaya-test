import { AxiosResponse } from "axios"
import { Permission, RoleResponse } from "../../types/role"
import { apiClient } from "@/shared/api/api"

export const $getPermissions = async (): Promise<AxiosResponse<Permission[]>> => {
  const response = await apiClient.get<Permission[]>("/partners/permissions/")
  return response
}

export const $getRole = async (): Promise<AxiosResponse<RoleResponse>> => {
  const response = await apiClient.get<RoleResponse>("/partners/profile/")
  return response
}
