import { ReactNode } from "react"
import clsx from "clsx"
import styles from "./Icon.module.scss"

type Props = {
  icon: ReactNode
  backgroundColor?: string
  className?: string
}

export const Icon = ({ icon, backgroundColor, className }: Props) => {
  return (
    <div className={clsx(styles.iconWrapper, className)} style={{ backgroundColor }}>
      {icon}
    </div>
  )
}
