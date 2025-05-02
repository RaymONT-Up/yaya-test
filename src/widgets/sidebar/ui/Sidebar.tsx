import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { sidebarItems } from '../config/sidebarConfig'
import styles from './Sidebar.module.scss'
import { Text, TextVariant } from '@/shared/ui/Text/Text'
import { useLocation } from 'react-router-dom'
import centerImg from '@/shared/assets/png/Login-img.png'
import { ChevronDown } from '@/shared/assets/svg/ChevronDown'
import { useState } from 'react'
import { CenterSelector } from '@/widgets/centerSelector'
export const Sidebar = () => {
  const location = useLocation()
  const [isSelectCenterOpen, setIsSelectCenterOpen] = useState(false)
  return (
    <aside className={styles.sidebar}>
      <div className={styles.selectCenter}>
        <div
          className={styles.centerSelector}
          onClick={() => setIsSelectCenterOpen((prev) => !prev)}
        >
          <div className={styles.centerImage}>
            <img src={centerImg} alt="Центр" className={styles.image} />
          </div>
          <div className={styles.centerInfo}>
            <Text variant={TextVariant.HEADING} headingLevel="h8" className={styles.centerName}>
              Центр музыкального образования
            </Text>
            <Text bodySize="small" className={styles.centerAddress}>
              Улица Динмухамед Конаев, 12/2, 407 офис, Есиль район, Астана, Z05H9B1
            </Text>
          </div>
          <ChevronDown
            width={20}
            height={20}
            color={'#6B6B6F'}
            className={`${styles.chevron} ${isSelectCenterOpen ? styles.open : ''}`}
          />
        </div>
        <div className={styles.centerSelectorComponent}>
          <CenterSelector isOpen={isSelectCenterOpen} />
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
