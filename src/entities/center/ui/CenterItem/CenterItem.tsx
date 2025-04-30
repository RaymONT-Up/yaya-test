import { FC } from 'react'
import styles from './CenterItem.module.scss'
import { ChevronRight } from '@/shared/assets/svg/ChevronRight'
import { Text, TextVariant } from '@/shared/ui/Text/Text'

interface CenterItemProps {
  id: number
  imageSrc: string
  name: string
  address: string
}

export const CenterItem: FC<CenterItemProps> = ({ imageSrc, name, address }) => {
  return (
    <div className={styles.centerItem}>
      <img src={imageSrc} alt={name} className={styles.image} />
      <div className={styles.info}>
        <Text className={styles.name} variant={TextVariant.HEADING} headingLevel="h7">
          {name}
        </Text>
        <Text className={styles.address} bodySize="medium">
          {address}
        </Text>
      </div>
      <ChevronRight />
    </div>
  )
}
