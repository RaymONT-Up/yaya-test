import { RolePermissions, RoleType } from "@/shared/types/role"

export interface CurrentSessionState {
  user_id: string | null
  token: string | null
  username: string | null
  loading: boolean
  roleLoading: boolean
  error: string | null
  roleError: string | null
  role?: RoleType | null
  role_display?: string | null
  permissions?: RolePermissions | null
}
