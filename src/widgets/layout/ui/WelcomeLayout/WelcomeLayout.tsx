import { FC, ReactNode } from 'react'
import styles from './WelcomeLayout.module.scss'
import img from '@/shared/assets/png/Login-img.png'

interface WelcomeLayoutProps {
  children: ReactNode
}

export const WelcomeLayout: FC<WelcomeLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src={img} alt="Children crafting" className={styles.image} />
      </div>
      <div className={styles.formSection}>
        <div className={styles.formBox}>{children}</div>
      </div>
    </div>
  )
}
