import { getToken } from "@/entities/currentSession"
import { PageLoader } from "@/shared/ui/PageLoader/PageLoader"
import { JSX } from "react"
import { Navigate } from "react-router-dom"
import { RoutePath } from "@/shared/consts/routerPaths"
import { RolePermissions } from "@/shared/types/role"
import { useRolePermissions } from "@/entities/role"
import { getCenterId } from "@/entities/center"

interface RoleGuardProps {
  children: JSX.Element
  permission: keyof RolePermissions
}

export const RoleGuard = ({ children, permission }: RoleGuardProps) => {
  const centerId = getCenterId()
  const token = getToken()
  const { data: res, isLoading, isError } = useRolePermissions({ token, centerId })
  if (!token) return null
  if (isLoading) return <PageLoader />

  if (isError || !res?.permissions || !res.permissions[permission]) {
    return <Navigate to={`${RoutePath.ERROR}?status_code=403`} />
  }
  return children
}
