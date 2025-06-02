import { useEffect } from "react"
import { getRoleThunk } from "@/entities/currentSession"
import { PageLoader } from "@/shared/ui/PageLoader/PageLoader"
import { useAppDispatch, useAppSelector } from "@/app/config/store"
import { JSX } from "react"
import { Navigate } from "react-router-dom"
import { RoutePath } from "@/shared/consts/routerPaths"
import { RolePermissions } from "@/shared/types/role"

interface RoleGuardProps {
  children: JSX.Element
  permission: keyof RolePermissions
}

export const RoleGuard = ({ children, permission }: RoleGuardProps) => {
  const dispatch = useAppDispatch()
  const { permissions, roleLoading, roleError } = useAppSelector(
    (state) => state.currentSessionSliceReducer
  )

  useEffect(() => {
    if (!permissions && !roleError) {
      dispatch(getRoleThunk())
    }
  }, [dispatch, permissions])

  if (roleLoading || (!permissions && !roleError)) {
    return <PageLoader />
  }
  if (roleError || !permissions || !permissions[permission]) {
    return <Navigate to={`${RoutePath.ERROR}?status_code=403`} />
  }
  return children
}
