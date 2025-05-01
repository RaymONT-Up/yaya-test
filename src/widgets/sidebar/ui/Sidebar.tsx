import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { sidebarItems } from '../config/sidebarConfig'
import styles from './Sidebar.module.scss'
import { Text, TextVariant } from '@/shared/ui/Text/Text'
import { useLocation } from 'react-router-dom'
import centerImg from '@/shared/assets/png/Login-img.png'
import { CenterSelector } from '@/widgets/centerSelector'
export const Sidebar = () => {
  const location = useLocation()
  return (
    <aside className={styles.sidebar}>
      <div className={styles.selectCenter}>
        <div className={styles.imageWrapper}>
          <img src={centerImg} alt="Центр" className={styles.image} />
        </div>
        <div className={styles.centerSelector}>
          <CenterSelector />
        </div>
      </div>
      {/* Navigation */}
      <nav className={styles.nav}>
        <ul>
          {sidebarItems.map(({ label, path, icon }) => {
            const Icon = icon
            const isActive = location.pathname === path
            return (
              <li key={path} className={`${styles.item} ${isActive ? styles.active : ''}`}>
                <AppLink to={path} className={styles.link}>
                  <span className={styles.icon}>
                    <Icon />
                  </span>
                  <Text className={styles.label} variant={TextVariant.LABEL} labelSize="medium">
                    {label}
                  </Text>
                </AppLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
