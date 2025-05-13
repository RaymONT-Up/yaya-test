import { EventContentArg } from "@fullcalendar/core/index.js"
import styles from "./EventContent.module.scss"
import { Text } from "@/shared/ui/Text/Text"
import { Tooltip } from "@/shared/ui/Tooltip/Tooltip"

export const EventContent = (arg: EventContentArg) => {
  const { event, isMirror, timeText } = arg
  if (isMirror) {
    return (
      <div className={styles.customEvent}>
        <Text bodySize="tiny" fontWeight={500} className={styles.eventTime}>
          {timeText}
        </Text>
      </div>
    )
  }
  const { lesson, places, booked_counts } = event.extendedProps
  const tooltipParts = [
    lesson?.name,
    timeText,
    `${lesson?.min_age_str} - ${lesson?.max_age_str}`,
    `${booked_counts}/${places}`,
    lesson?.language,
    lesson?.format
  ].filter(Boolean)

  const tooltipText = tooltipParts.join(" ∙ ")
  return (
    <Tooltip text={tooltipText} position="top">
      <div className={styles.customEvent}>
        <Text bodySize="tiny" fontWeight={600} className={styles.eventTitle}>
          {lesson?.name} <span className={styles.eventTime}>{timeText}</span>
        </Text>
        <div className={styles.eventInfo}>
          <div className={styles.dotSeparator} />

          <Text bodySize="tiny" fontWeight={500} className={styles.eventAge}>
            {lesson?.min_age_str} - {lesson?.max_age_str}
          </Text>
          <div className={styles.dotSeparator} />

          <Text bodySize="tiny" fontWeight={500} className={styles.eventPlaces}>
            {booked_counts}/{places}
          </Text>
          <div className={styles.dotSeparator} />
        </div>

        <Text bodySize="tiny" fontWeight={500} className={styles.eventTag}>
          Intermediate
        </Text>
      </div>
    </Tooltip>
  )
}
