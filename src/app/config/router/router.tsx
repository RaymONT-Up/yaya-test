import { getToken } from '@/entities/currentSession'
import { LoginPage } from '@/pages/LoginPage'
import { MainPage } from '@/pages/MainPage'
import { SelectCenterPage } from '@/pages/SelectCentetPage'
import { VisitPage } from '@/pages/VisitPage'
import { RoutePath } from '@/shared/consts/routerPaths'
import { MainLayout } from '@/widgets/layout'
import { JSX, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

type AuthGuardProps = {
  mustBe: 'authorized' | 'unauthorized'
  children: JSX.Element
}
const withSuspense = (Component: React.LazyExoticComponent<React.FC>) => (
  // !TODO loader для страниц уточнить у дизайнера
  <Suspense fallback={<div>Загрузка...</div>}>
    <Component />
  </Suspense>
)

export const AuthGuard = ({ mustBe, children }: AuthGuardProps) => {
  const token = getToken()
  const isAuthorized = Boolean(token)

  if (mustBe === 'authorized') {
    return isAuthorized ? children : <Navigate to={RoutePath.LOGIN} />
  }

  return isAuthorized ? <Navigate to={RoutePath.MAIN} /> : children
}

export const router = createBrowserRouter([
  {
    path: RoutePath.MAIN,
    element: (
      <AuthGuard mustBe="authorized">
        <MainLayout />
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
        <MainLayout />
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
  }
])
