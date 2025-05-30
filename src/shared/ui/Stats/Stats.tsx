import { useState } from "react"
import styles from "./Stats.module.scss"
import { Check } from "@/shared/assets/svg/Check"
import { Copy } from "@/shared/assets/svg/Copy"
import clsx from "clsx"
import { Tag, TagScheme, TagVariant } from "@/shared/ui/Tag/Tag"
import { Text, TextVariant } from "@/shared/ui/Text/Text"

type StatsProps = {
  icon: React.ReactNode
  title: React.ReactNode
  text: React.ReactNode
  size?: "tall" | "small"
  loading?: boolean
  className?: string
}

export const Stats = ({
  icon,
  title,
  text,
  size = "tall",
  loading = false,
  className
}: StatsProps) => {
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`${text} - ${title}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 4000)
  }

  return (
    <div
      className={clsx(styles.card, styles[size], className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && !copied && !loading && (
        <div className={styles.copyIcon} onClick={handleCopy}>
          <Copy width={16} height={16} />
        </div>
      )}

      {copied && (
        <Tag
          label="Скопировано"
          scheme={TagScheme.Positive}
          variant={TagVariant.Secondary}
          className={styles.tag}
          icon={<Check />}
        />
      )}

      <div className={styles.icon}>{icon}</div>

      {loading ? (
        <>
          <div className={clsx(styles.skeleton, styles[`skeleton-${size}`])} />
          <Text className={styles.text} fontWeight={600}>
            {text}
          </Text>
        </>
      ) : (
        <>
          <Text
            variant={TextVariant.HEADING}
            headingLevel={size === "tall" ? "h4" : "h6"}
            className={styles.title}
          >
            {title}
          </Text>
          <Text className={styles.text} fontWeight={600}>
            {text}
          </Text>
        </>
      )}
    </div>
  )
}
