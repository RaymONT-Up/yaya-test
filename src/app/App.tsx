import { NotificationPortal, NotificationProvider } from '@/shared/ui/Notification'
import { AppRouterProvider } from './config/router/routerProvider'
import './styles/index.scss'
export function App() {
  return (
    <>
      <NotificationProvider>
        <AppRouterProvider />
        <NotificationPortal />
      </NotificationProvider>
    </>
  )
}
