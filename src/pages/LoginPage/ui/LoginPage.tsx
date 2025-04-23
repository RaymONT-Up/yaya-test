import { FC } from 'react'
import styles from './LoginPage.module.scss'
import { LoginForm } from '@/features/auth/login'

export const LoginPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <LoginForm />
      </div>
    </div>
  )
}
