import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { sidebarItems } from '../config/sidebarConfig'
import styles from './Sidebar.module.scss'

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.path} className={styles.item}>
              <AppLink to={item.path} className={styles.link}>
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </AppLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
