import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { sidebarItems } from '../config/sidebarConfig'
import styles from './Sidebar.module.scss'
import { Text, TextVariant } from '@/shared/ui/Text/Text'
import { useLocation } from 'react-router-dom'
import centerImg from '@/shared/assets/png/centerImage.png'
import { ChevronDown } from '@/shared/assets/svg/ChevronDown'
import { useState } from 'react'
import { CenterSelector } from '@/widgets/centerSelector'
import { useAppSelector } from '@/app/config/store'
import { selectCurrentCenter } from '@/entities/center'
export const Sidebar = () => {
  const currentCenter = useAppSelector(selectCurrentCenter)
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
              {currentCenter?.name || 'Выберите центр'}
            </Text>
            <Text bodySize="small" className={styles.centerAddress}>
              {currentCenter?.address}
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
          <CenterSelector
            isOpen={isSelectCenterOpen}
            onSelect={() => setIsSelectCenterOpen(false)}
          />
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
