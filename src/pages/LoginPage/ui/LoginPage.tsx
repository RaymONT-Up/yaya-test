import { FC } from 'react'
import styles from './LoginPage.module.scss'
import { LoginForm } from '@/features/auth/login'
import img from '@/shared/assets/png/Login-img.png'
export const LoginPage: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src={img} alt="Children crafting" className={styles.image} />
      </div>
      <div className={styles.formSection}>
        <div className={styles.formBox}>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
