import { EventContentArg } from "@fullcalendar/core/index.js"
import styles from "./EventContent.module.scss"
import { Text } from "@/shared/ui/Text/Text"
import { Users } from "@/shared/assets/svg/Users"
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

  const start = event.start
  const end = event.end
  const durationInMinutes = start && end ? (end.getTime() - start.getTime()) / 60000 : 0

  const shortView = durationInMinutes < 30

  return (
    <Tooltip
      text={[
        lesson?.name,
        `${timeText}`,
        `${lesson?.min_age_str} - ${lesson?.max_age_str}`,
        lesson?.center?.name,
        lesson?.format,
        `${booked_counts}/${places}`
      ]
        .filter(Boolean)
        .join(" ∙ ")}
      maxWidth={257}
    >
      <div className={styles.customEvent}>
        {shortView ? (
          <Text bodySize="tiny" fontWeight={600} className={styles.eventShortTitle}>
            {lesson?.name}{" "}
            <span className={styles.eventPlaces}>
              {booked_counts}/{places}
            </span>{" "}
            <Users className={styles.eventIcon} color="#5163AE" />
          </Text>
        ) : (
          <>
            <Text bodySize="tiny" fontWeight={600} className={styles.eventTitle}>
              {lesson?.name} <span className={styles.eventTime}>{timeText}</span>
            </Text>
            <div className={styles.eventInfo}>
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
            <div className={styles.eventPlaceCount}>
              <Text bodySize="tiny" fontWeight={600} className={styles.eventPlaces}>
                {booked_counts}/{places}
              </Text>{" "}
              <Users className={styles.eventIcon} color="#5163AE" />
            </div>
          </>
        )}
      </div>
    </Tooltip>
  )
}
