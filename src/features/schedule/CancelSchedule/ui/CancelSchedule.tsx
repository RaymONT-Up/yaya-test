import React from "react"
import { Controller, FieldError, useForm } from "react-hook-form"
import styles from "./CancelSchedule.module.scss"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { SelectLesson } from "@/features/lesson/selectLesson"
import { Dialog } from "@/shared/ui/Dialog/Dialog"
import { Textarea } from "@/shared/ui/Textarea/Textarea"
import { DateRangeSelect } from "@/shared/ui/DateRangeSelect/DateRangeSelect"
import { CancelScheduleSDto } from "@/shared/types/schedule"
import { toDateString } from "@/shared/libs/formaDate"
import { ModalOverlay } from "@/shared/ui/ModalOverlay/ModalOverlay"

interface Props {
  isOpen: boolean
  onClose: () => void
  handleCancelSchedules: (data: CancelScheduleSDto) => void
}

interface FormValues {
  lesson_ids: number[]
  reason: string
  date_range: [Date | null, Date | null]
}

export const CancelSchedule: React.FC<Props> = ({
  isOpen = false,
  onClose,
  handleCancelSchedules
}) => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      lesson_ids: [],
      reason: "",
      date_range: [null, null]
    }
  })

  const onSubmit = (data: FormValues) => {
    const [startDate, endDate] = data.date_range
    if (!startDate || !endDate) return
    const payload = {
      lessons: data.lesson_ids,
      reason: data.reason,
      start_date: toDateString(startDate),
      end_date: toDateString(endDate)
    }
    console.log(payload)
    handleCancelSchedules(payload)
    reset()
    onClose()
  }
  const resetOnClose = () => {
    reset({
      lesson_ids: [],
      reason: "",
      date_range: [null, null]
    })
    onClose()
  }
  return (
    <ModalOverlay isOpen={isOpen} onClose={resetOnClose}>
      <Dialog
        title="Отмена расписания"
        isOpen={isOpen}
        onClose={resetOnClose}
        actions={
          <>
            <Button variant={ButtonVariant.Neutral} type="button" onClick={resetOnClose}>
              Закрыть
            </Button>
            <Button onClick={handleSubmit(onSubmit)} type="submit">
              Отменить расписание
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.gridContainer}>
            <Controller
              name="date_range"
              control={control}
              rules={{
                validate: ([start, end]) => (!!start && !!end) || "Период не может быть пустым"
              }}
              render={({ field }) => (
                <DateRangeSelect
                  position="bottom"
                  value={field.value}
                  onChange={field.onChange}
                  label="Период"
                  required
                  error={errors.date_range as FieldError}
                  minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                />
              )}
            />
            <Controller
              control={control}
              name="lesson_ids"
              rules={{ required: "Секция не может быть пустой" }}
              render={({ field }) => (
                <SelectLesson
                  selectName="lesson_cancel"
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

            <div className={styles.reason}>
              <Textarea
                label="Укажите причину отмены"
                placeholder="Ваша причина..."
                required
                resizeable={false}
                showErrorText
                error={errors.reason}
                {...register("reason", { required: "Причина не может быть пустой" })}
              />
            </div>
          </div>
        </form>
      </Dialog>
    </ModalOverlay>
  )
}
