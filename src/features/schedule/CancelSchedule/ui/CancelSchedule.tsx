import React from "react"
import { Controller, useForm } from "react-hook-form"
import styles from "./CancelSchedule.module.scss"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { SelectLesson } from "@/features/lesson/selectLesson"
import { Dialog } from "@/shared/ui/Dialog/Dialog"
import { Textarea } from "@/shared/ui/Textarea/Textarea"

interface Props {
  isOpen: boolean
  onClose: () => void
}

interface FormValues {
  lesson_ids: number[]
  reason: string
  start_date: string
  end_date: string
}

export const CancelSchedule: React.FC<Props> = ({ isOpen = false, onClose }) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      lesson_ids: []
    }
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }
  return (
    <Dialog
      title="Отмена расписания"
      isOpen={isOpen}
      onClose={onClose}
      actions={
        <>
          <Button variant={ButtonVariant.Neutral} type="button" onClick={onClose}>
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
            control={control}
            name="lesson_ids"
            rules={{ required: "Секция не может быть пустой" }}
            render={({ field }) => (
              <SelectLesson
                showErrorMessage
                selectedLessonId={field.value}
                onSelect={field.onChange}
                isMultiply
                className={styles.selectLesson}
                labelText="Секция"
                error={Array.isArray(errors.lesson_ids) ? errors.lesson_ids[0] : errors.lesson_ids}
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
  )
}
