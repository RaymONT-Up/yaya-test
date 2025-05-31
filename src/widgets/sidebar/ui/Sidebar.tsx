import { AppLink } from "@/shared/ui/AppLink/AppLink"
import { sidebarItems } from "../config/sidebarConfig"
import styles from "./Sidebar.module.scss"
import { Text, TextVariant } from "@/shared/ui/Text/Text"
import { useLocation } from "react-router-dom"
import { RootState, useAppSelector } from "@/app/config/store"
export const Sidebar = () => {
  const location = useLocation()
  const permissions = useAppSelector(
    (state: RootState) => state.currentSessionSliceReducer.permissions
  )

  const visibleItems = sidebarItems.filter((item) => {
    if (!permissions) {
      return false
    }
    return permissions[item.permission] === true
  })

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          {visibleItems.map(({ label, path, icon }) => {
            const Icon = icon
            const isActive = location.pathname === path
            return (
              <li key={path} className={`${styles.item} ${isActive ? styles.active : ""}`}>
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
