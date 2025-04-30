import { FC, ReactNode } from 'react'
import styles from './InfoBlock.module.scss'
import { Text, TextVariant } from '@/shared/ui/Text/Text'

interface InfoBlockProps {
  icon: ReactNode
  title: string
  text: string
}

export const InfoBlock: FC<InfoBlockProps> = ({ icon, title, text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <Text variant={TextVariant.HEADING} headingLevel="h6" className={styles.title}>
        {title}
      </Text>
      <Text variant={TextVariant.BODY} bodySize="medium" className={styles.text}>
        {text}
      </Text>
    </div>
  )
}
