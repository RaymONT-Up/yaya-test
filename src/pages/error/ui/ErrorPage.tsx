import { FC } from 'react'
import styles from './ErrorPage.module.scss'
import { InfoBlock } from '@/shared/ui/InfoBlock/InfoBlock'
import { Logo } from '@/shared/assets/svg/Logo'
import { ErrorCodes, errorConfig } from '@/shared/consts/errorConfig'

interface ErrorPageProps {
  errorCode: ErrorCodes
}

const ErrorPage: FC<ErrorPageProps> = ({ errorCode }) => {
  const { title, text, icon: Icon } = errorConfig[errorCode] || errorConfig[ErrorCodes.UNKNOWN]

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.content}>
        <InfoBlock title={title} text={text} icon={<Icon />} />
      </div>
    </div>
  )
}

export default ErrorPage
