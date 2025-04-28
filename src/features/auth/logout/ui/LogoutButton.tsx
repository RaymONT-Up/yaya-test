import { useAppDispatch } from '@/app/config/store'
import styles from './LogoutButton.module.scss'
import { logoutThunk } from '@/entities/currentSession'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonVariant } from '@/shared/ui/Button'

export const LogoutButton = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutThunk({ navigate }))
  }

  return (
    <Button variant={ButtonVariant.Subtle} onClick={handleLogout} className={styles.button}>
      Выйти
    </Button>
  )
}
