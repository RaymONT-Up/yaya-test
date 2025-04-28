import { Text, TextVariant } from '@/shared/ui/Text/Text'
import styles from './Header.module.scss'
import { CenterSelector } from '@/widgets/centerSelector'
import { LogoutButton } from '@/features/auth/logout'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Text variant={TextVariant.HEADING} headingLevel="h6">
          App Header
        </Text>
        <div className={styles.actions}>
          <CenterSelector />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
