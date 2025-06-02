import { getToken } from "@/entities/currentSession"
import { RoleGuard } from "@/features/auth/RoleGuard"
import { ErrorPage } from "@/pages/error"
import { LoginPage } from "@/pages/LoginPage"
import { MainPage } from "@/pages/MainPage"
import { ReportPage } from "@/pages/ReportPage"
import { SelectCenterPage } from "@/pages/SelectCentetPage"
import { VisitPage } from "@/pages/VisitPage"
import { RoutePath } from "@/shared/consts/routerPaths"
import { RolePermissionKeys } from "@/shared/types/role"
import { PageLoader } from "@/shared/ui/PageLoader/PageLoader"
import { MainLayout } from "@/widgets/layout"
import { JSX, Suspense } from "react"
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom"

type AuthGuardProps = {
  mustBe: "authorized" | "unauthorized"
  children: JSX.Element
}
const withSuspense = (Component: React.LazyExoticComponent<React.FC>) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
)

export const AuthGuard = ({ mustBe, children }: AuthGuardProps) => {
  const token = getToken()
  const isAuthorized = Boolean(token)

  if (mustBe === "authorized") {
    return isAuthorized ? children : <Navigate to={RoutePath.LOGIN} />
  }

  return isAuthorized ? <Navigate to={RoutePath.MAIN} /> : children
}

export const router = createBrowserRouter([
  {
    path: RoutePath.MAIN,
    element: (
      <AuthGuard mustBe="authorized">
        <RoleGuard permission={RolePermissionKeys.SCHEDULE_VIEW}>
          <MainLayout />
        </RoleGuard>
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: withSuspense(MainPage)
      }
    ]
  },
  {
    path: RoutePath.VISITS,
    element: (
      <AuthGuard mustBe="authorized">
        <RoleGuard permission={RolePermissionKeys.VISIT_VIEW}>
          <MainLayout />
        </RoleGuard>
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: withSuspense(VisitPage)
      }
    ]
  },
  {
    path: RoutePath.REPORT,
    element: (
      <AuthGuard mustBe="authorized">
        <RoleGuard permission={RolePermissionKeys.REPORT_VIEW}>
          <MainLayout shouldContentScroll />
        </RoleGuard>
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: withSuspense(ReportPage)
      }
    ]
  },
  {
    path: RoutePath.SELECT_CENTER,
    element: (
      <AuthGuard mustBe="authorized">
        <Outlet />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: withSuspense(SelectCenterPage)
      }
    ]
  },
  {
    path: RoutePath.LOGIN,
    element: (
      <AuthGuard mustBe="unauthorized">
        <Outlet />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: withSuspense(LoginPage)
      }
    ]
  },
  {
    path: RoutePath.ERROR,
    element: <Outlet />,
    children: [
      {
        index: true,
        element: withSuspense(ErrorPage)
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to={`${RoutePath.ERROR}?status_code=404`} replace />
  }
])
