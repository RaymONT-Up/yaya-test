import { format } from "date-fns"
import DatePicker from "react-datepicker"
import { ChevronLeft } from "@/shared/assets/svg/ChevronLeft"
import { ChevronRight } from "@/shared/assets/svg/ChevronRight"
import clsx from "clsx"
import styles from "./CustomDatePicker.module.scss"
import "./datePicker.scss"
import { ru } from "date-fns/locale"

import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button"

type Props = React.ComponentProps<typeof DatePicker> & {
  className?: string
}

export const CustomDatePicker = ({ className, ...props }: Props) => {
  return (
    <DatePicker
      {...props}
      renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
        <div className={styles.header}>
          <span className={styles.month}>{format(date, "MMMM yyyy")}</span>
          <div className={styles.changeDate}>
            <Button
              isIconButton
              size={ButtonSize.Small}
              variant={ButtonVariant.Subtle}
              onClick={decreaseMonth}
              iconEnd={<ChevronLeft color="#262527" width={16} height={16} />}
            />
            <Button
              isIconButton
              size={ButtonSize.Small}
              variant={ButtonVariant.Subtle}
              onClick={increaseMonth}
              iconEnd={<ChevronRight color="#262527" width={16} height={16} />}
            />
          </div>
        </div>
      )}
      inline
      calendarClassName={clsx(styles.calendar, className)}
      locale={ru}
    />
  )
}
