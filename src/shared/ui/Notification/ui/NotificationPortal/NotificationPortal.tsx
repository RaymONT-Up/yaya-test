import { createPortal } from 'react-dom'
import { useNotifications } from '../../model/useNotifications'
import { Notification } from '../../ui/Notification/Notification'
import styles from './NotificationPortal.module.scss'

export const NotificationPortal = () => {
  const { notifications } = useNotifications()

  return createPortal(
    <div className={styles.notificationContainer}>
      {notifications.map((n) => (
        <Notification key={n.id} {...n} />
      ))}
    </div>,
    document.body
  )
}
