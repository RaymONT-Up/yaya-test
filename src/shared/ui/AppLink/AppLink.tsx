import { Link, LinkProps } from 'react-router-dom'
import clsx from 'clsx'
import styles from './AppLink.module.scss'

interface AppLinkProps extends LinkProps {
  className?: string
}

export const AppLink = ({ to, children, className, ...props }: AppLinkProps) => {
  return (
    <Link to={to} className={clsx(styles.link, className)} {...props}>
      {children}
    </Link>
  )
}
