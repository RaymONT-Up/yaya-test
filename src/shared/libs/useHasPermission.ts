import { getCenterId } from "@/entities/center"
import { getToken } from "@/entities/currentSession"
import { useRolePermissions } from "@/entities/role"
import { RolePermissionKey } from "@/shared/types/role"

export const useHasPermission = (key: RolePermissionKey): boolean => {
  const centerId = getCenterId()
  const token = getToken()
  const { data: res } = useRolePermissions({ token, centerId })

  if (!res?.permissions) return false

  return Boolean(res.permissions[key])
}
