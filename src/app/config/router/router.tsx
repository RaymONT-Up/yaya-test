import { getToken } from '@/entities/currentSession'
import { LoginPage } from '@/pages/LoginPage'
import { MainPage } from '@/pages/MainPage'
import { JSX } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

type AuthGuardProps = {
  mustBe: 'authorized' | 'unauthorized'
  children: JSX.Element
}

export const AuthGuard = ({ mustBe, children }: AuthGuardProps) => {
  const token = getToken()
  const isAuthorized = Boolean(token)

  if (mustBe === 'authorized') {
    return isAuthorized ? children : <Navigate to="/login" />
  }

  return isAuthorized ? <Navigate to="/" /> : children
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard mustBe="authorized">
        <Outlet />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <MainPage />
      }
    ]
  },
  {
    path: '/login',
    element: (
      <AuthGuard mustBe="unauthorized">
        <Outlet />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <LoginPage />
      }
    ]
  }
])
