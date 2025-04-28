import { Text, TextVariant } from '@/shared/ui/Text/Text'
import styles from './Header.module.scss'
import { CenterSelector } from '@/widgets/centerSelector'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Text variant={TextVariant.HEADING} headingLevel="h6">
          App Header
        </Text>
        <CenterSelector />
      </div>
    </header>
  )
}
