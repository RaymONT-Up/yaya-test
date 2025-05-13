import React from "react"
import styles from "./Tab.module.scss"
import { Text } from "@/shared/ui/Text/Text"
import clsx from "clsx"

type TabItem = {
  title: string
  onClick: () => void
  isActive: boolean
}

interface TabsProps {
  items: TabItem[]
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({ items, className }) => {
  return (
    <div className={clsx(styles.tabContainer, className)}>
      {items.map((tab, index) => {
        const showSeparator =
          items.length > 2 &&
          index < items.length - 1 &&
          !tab.isActive &&
          !items[index + 1].isActive

        return (
          <React.Fragment key={index}>
            <div className={clsx(styles.tab, tab.isActive && styles.active)} onClick={tab.onClick}>
              <Text labelSize="medium" className={styles.label}>
                {tab.title}
              </Text>
            </div>
            {showSeparator && <div className={styles.separator} />}
          </React.Fragment>
        )
      })}
    </div>
  )
}
