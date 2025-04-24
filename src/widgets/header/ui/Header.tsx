import styles from './Header.module.scss'
import { CenterSelector } from '@/widgets/centerSelector'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <h1>App Header</h1>
        <CenterSelector />
      </div>
    </header>
  )
}
