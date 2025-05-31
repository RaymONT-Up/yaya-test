import { useAppSelector } from "@/app/config/store"
import { RootState } from "@/app/config/store"
import { RolePermissionKey } from "@/shared/types/role"

export const useHasPermission = (key: RolePermissionKey): boolean => {
  const permissions = useAppSelector(
    (state: RootState) => state.currentSessionSliceReducer.permissions
  )

  if (!permissions) return false

  return Boolean(permissions[key])
}
