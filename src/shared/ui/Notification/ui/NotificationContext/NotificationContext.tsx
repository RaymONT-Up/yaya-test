import { createContext } from 'react'
import { NotificationProps } from '../Notification/Notification'

export interface NotificationState extends NotificationProps {
  id: string
  timeout?: number
}

interface NotificationContextType {
  notifications: NotificationState[]
  addNotification: (notification: Omit<NotificationProps, 'id'> & { timeout?: number }) => string
  removeNotification: (id: string) => void
}

export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => {
    return ''
  },
  removeNotification: () => {}
})
