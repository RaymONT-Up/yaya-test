import { useAppDispatch, useAppSelector } from '@/app/config/store'
import styles from './LogoutButton.module.scss'
import { logoutThunk } from '@/entities/currentSession'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/Button'
import { Logout } from '@/shared/assets/svg/Logout'

export const LogoutButton = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading } = useAppSelector((state) => state.currentSessionSliceReducer)
  const handleLogout = () => {
    dispatch(logoutThunk({ navigate }))
  }

  return (
    <Button
      variant={ButtonVariant.Neutral}
      size={ButtonSize.Small}
      onClick={handleLogout}
      className={styles.button}
      loading={loading}
      iconStart={<Logout />}
    >
      Выйти
    </Button>
  )
}
