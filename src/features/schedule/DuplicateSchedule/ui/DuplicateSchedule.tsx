import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import styles from "./DuplicateSchedule.module.scss"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { DaySelect } from "@/shared/ui/DaySelect/DaySelect"
import { SelectLesson } from "@/features/lesson/selectLesson"
import { Dialog } from "@/shared/ui/Dialog/Dialog"
import { Tabs } from "@/shared/ui/Tab/Tab"
import { SelectDays } from "@/shared/ui/SelectDays/SelectDays"
import { ArrowRight } from "@/shared/assets/svg/ArrowRight"
import { useDuplicateSchedule } from "@/entities/schedule"
import { DuplicateScheduleType } from "@/shared/types/schedule"
import { toDateString } from "@/shared/libs/formaDate"
import { WeekSelect } from "@/shared/ui/WeekSelect/WeekSelect"
import { useNotifications } from "@/shared/ui/Notification"
import { NotificationVariant } from "@/shared/ui/Notification/ui/Notification/Notification"
import { Check } from "@/shared/assets/svg/Check"
import { MultiWeekSelect } from "@/shared/ui/MultiWeekSelect/MultiWeekSelect"
import { ModalOverlay } from "@/shared/ui/ModalOverlay/ModalOverlay"

interface Props {
  isOpen: boolean
  onClose: () => void
}

interface FormValues {
  lesson_ids: number[]
  source_date: Date
  target_dates: Date[]
}

export const DuplicateSchedule: React.FC<Props> = ({ isOpen = false, onClose }) => {
  const { addNotification } = useNotifications()

  const [mode, setMode] = useState(DuplicateScheduleType.DAY)
  const onChangeMode = (newMode: DuplicateScheduleType) => {
    setMode(newMode)
    reset({
      lesson_ids: [],
      source_date: null as unknown as Date,
      target_dates: []
    })
  }
  const resetOnClose = () => {
    reset({
      lesson_ids: [],
      source_date: undefined,
      target_dates: []
    })
    onClose()
  }
  const { mutate: duplicateSchedule, isPending } = useDuplicateSchedule({
    onSuccess: () => {
      addNotification({
        title: "Занятия дублированы",
        variant: NotificationVariant.Success,
        icon: <Check />,
        className: styles.cancelNotification
      })
      onClose()
      reset()
    },
    onError: (error) => {
      console.error("Ошибка при дублировании:", error)
      onClose()
      reset()
    }
  })
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      lesson_ids: [],
      source_date: undefined,
      target_dates: []
    }
  })

  const onSubmit = (data: FormValues) => {
    const payload = {
      duplicate_type: mode,
      lesson_ids: data.lesson_ids,
      source_date: toDateString(data.source_date),
      target_dates: Array.isArray(data.target_dates)
        ? data.target_dates.map(toDateString)
        : [toDateString(data.target_dates)]
    }

    duplicateSchedule(payload)
  }
  return (
    <ModalOverlay isOpen={isOpen} onClose={resetOnClose}>
      <Dialog
        title="Дублирование расписания"
        isOpen={isOpen}
        onClose={resetOnClose}
        actions={
          <>
            <Button
              variant={ButtonVariant.Neutral}
              type="button"
              onClick={resetOnClose}
              loading={isPending}
            >
              Закрыть
            </Button>
            <Button onClick={handleSubmit(onSubmit)} type="submit" loading={isPending}>
              Дублировать расписание
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.modeSelect}>
            <Tabs
              items={[
                {
                  title: "День",
                  isActive: mode === "day",
                  onClick: () => onChangeMode(DuplicateScheduleType.DAY)
                },
                {
                  title: "Неделя",
                  isActive: mode === "week",
                  onClick: () => onChangeMode(DuplicateScheduleType.WEEK)
                }
              ]}
              className={styles.tabs}
            />
          </div>
          <div className={styles.gridContainer}>
            <div className={styles.gridRow}>
              <div className={styles.col}>
                <Controller
                  control={control}
                  name="source_date"
                  rules={{
                    required:
                      mode === DuplicateScheduleType.DAY
                        ? "Дата не может быть пустой"
                        : "Неделя не может быть пустой"
                  }}
                  render={({ field }) =>
                    mode === DuplicateScheduleType.DAY ? (
                      <DaySelect
                        showErrorMessage
                        error={errors.source_date}
                        required
                        position="bottom"
                        label="Дублировать этот день"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    ) : (
                      <WeekSelect
                        error={errors.source_date}
                        required
                        position="bottom"
                        label="Дублировать эту неделю"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )
                  }
                />
              </div>

              <div className={styles.arrow}>
                <ArrowRight />
              </div>

              <div className={styles.col}>
                <Controller
                  control={control}
                  name="target_dates"
                  rules={{
                    required:
                      mode === DuplicateScheduleType.DAY
                        ? "Дата не может быть пустой"
                        : "Недели не могут быть пустыми"
                  }}
                  render={({ field }) =>
                    mode === DuplicateScheduleType.DAY ? (
                      <SelectDays
                        error={
                          Array.isArray(errors.target_dates)
                            ? errors.target_dates[0]
                            : errors.target_dates
                        }
                        required
                        position="bottom"
                        label="На день/дни"
                        value={field.value}
                        onChange={field.onChange}
                        minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    ) : (
                      <MultiWeekSelect
                        error={
                          Array.isArray(errors.target_dates)
                            ? errors.target_dates[0]
                            : errors.target_dates
                        }
                        required
                        position="bottom"
                        label="На эту неделю/недели"
                        value={field.value}
                        onChange={field.onChange}
                        minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    )
                  }
                />
              </div>
            </div>
            <Controller
              control={control}
              name="lesson_ids"
              rules={{ required: "Секция не может быть пустой" }}
              render={({ field }) => (
                <SelectLesson
                  selectName="lesson_duplicate"
                  showErrorMessage
                  selectedLessonId={field.value}
                  onSelect={field.onChange}
                  isMultiply
                  className={styles.selectLesson}
                  labelText="Секция"
                  error={
                    Array.isArray(errors.lesson_ids) ? errors.lesson_ids[0] : errors.lesson_ids
                  }
                />
              )}
            />
          </div>
        </form>
      </Dialog>
    </ModalOverlay>
  )
}
