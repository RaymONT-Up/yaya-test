import { useContext } from 'react'
import { NotificationContext } from '../ui/NotificationContext/NotificationContext'

export const useNotifications = () => useContext(NotificationContext)
