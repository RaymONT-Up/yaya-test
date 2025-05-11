import { ReactNode, useState, useCallback } from 'react'
import { NotificationContext, NotificationState } from './NotificationContext'
import { NotificationProps } from '@/shared/ui/Notification/ui/Notification/Notification'

// export type NotificationPosition =
//   | 'top-right'
//   | 'top-left'
//   | 'bottom-right'
//   | 'bottom-left';

interface Props {
  children: ReactNode
  // position?: NotificationPosition;
}

export const NotificationProvider = ({ children }: Props) => {
  const [notifications, setNotifications] = useState<NotificationState[]>([])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const addNotification = useCallback(
    (notification: NotificationProps, timeout = 5000) => {
      const id = Date.now().toString()
      const newNotification = { ...notification, id, timeout }
      setNotifications((prev) => [...prev, newNotification])
      setTimeout(() => removeNotification(id), timeout)
      return id
    },
    [removeNotification]
  )

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}
