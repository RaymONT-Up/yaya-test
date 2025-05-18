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
  permission?: keyof RolePermissions
}

export const RoleGuard = ({ children, permission }: RoleGuardProps) => {
  const dispatch = useAppDispatch()
  const { role, permissions, loading, error } = useAppSelector(
    (state) => state.currentSessionSliceReducer
  )

  useEffect(() => {
    if ((!role || !permissions) && !loading && !error) {
      dispatch(getRoleThunk())
    }
  }, [dispatch, role, permissions, error, loading])

  if (loading) {
    return <PageLoader />
  }

  if (error || !role || !permissions || (permission && !permissions[permission])) {
    return <Navigate to={RoutePath.ERROR} />
  }

  return children
}
