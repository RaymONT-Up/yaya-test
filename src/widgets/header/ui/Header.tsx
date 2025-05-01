import styles from './Header.module.scss'
// import { CenterSelector } from '@/widgets/centerSelector'
import { LogoutButton } from '@/features/auth/logout'
import { Logo } from '@/shared/assets/svg/Logo'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Logo width={80} height={34} />
        <div className={styles.actions}>
          {/* <CenterSelector /> */}
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
