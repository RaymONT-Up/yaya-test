import { useAppDispatch } from '@/app/config/store'
import styles from './LogoutButton.module.scss'
import { logoutThunk } from '@/entities/currentSession'
import { useNavigate } from 'react-router-dom'

export const LogoutButton = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutThunk({ navigate }))
  }

  return (
    <button onClick={handleLogout} className={styles.button}>
      Выйти
    </button>
  )
}
