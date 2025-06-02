import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { ROLE_QUERY_KEY } from "../const/roleKey"
import { $getRole } from "@/shared/api/role/role"
import { RoleResponse } from "@/shared/types/role"

interface UseRolePermissionsParams {
  token: string | null
  centerId: number | null
}

export const useRolePermissions = ({ token, centerId }: UseRolePermissionsParams) => {
  return useQuery<RoleResponse>({
    queryKey: [ROLE_QUERY_KEY, token, centerId],
    queryFn: () => {
      console.log(centerId)
      if (!token || !centerId) {
        return Promise.reject(new Error("Missing token or centerId"))
      }
      return $getRole().then((res) => res.data)
    },
    enabled: !!token && !!centerId,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    placeholderData: keepPreviousData
  })
}
