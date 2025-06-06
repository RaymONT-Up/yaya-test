import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import styles from "./CreateSchedule.module.scss"
import { Input } from "@/shared/ui/Input/Input"
import { SelectLesson } from "@/features/lesson/selectLesson"
import { useCreateSchedule } from "@/entities/schedule"
import { CreateScheduleDto } from "@/shared/types/schedule"
import { SelectTrainer } from "@/features/trainer"
import { Modal } from "@/shared/ui/Modal/Modal"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Users } from "@/shared/assets/svg/Users"
import { TimeSelect } from "@/shared/ui/TimeSelect/TimeSelect"
import { parseTimeToMinutes } from "@/shared/libs/formaDate"
import { DaySelect } from "@/shared/ui/DaySelect/DaySelect"
import { Lesson } from "@/shared/types/lesson"
import { ModalOverlay } from "@/shared/ui/ModalOverlay/ModalOverlay"

interface Props {
  start?: string
  end?: string
  isOpen: boolean
  onClose: () => void
  isEditing?: boolean
}

interface FormValues {
  day: string
  lesson_id: number | null
  start: string
  end: string
  places: number | null
  trainer_id: number
}

const pad = (n: number) => String(n).padStart(2, "0")
const formatTime = (totalMinutes: number) => {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return `${pad(h)}:${pad(m)}`
}

export const CreateSchedule: React.FC<Props> = ({
  isOpen = false,
  start,
  end,
  onClose,
  isEditing = false
}) => {
  const [duration, setDuration] = useState<number>(0)
  const [durationUi, setDurationUi] = useState<number>(0)
  const [minTime, setMinTime] = useState<string>("")

  const resetOnClose = () => {
    reset({
      day: "",
      lesson_id: null,
      start: "",
      end: "",
      places: null,
      trainer_id: undefined
    })
    setDuration(0)
    setDurationUi(0)
    onClose()
  }
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      day: new Date().toISOString().slice(0, 10),
      lesson_id: null,
      start: start ?? "",
      end: end ?? "",
      places: null,
      trainer_id: undefined
    },
    mode: "onChange"
  })
  const { isPending, mutate } = useCreateSchedule({
    onSuccess: (data) => {
      console.log("Расписание успешно добавлено:", data)
      reset({
        day: new Date().toISOString().slice(0, 10),
        lesson_id: null,
        start: "",
        end: "",
        places: null,
        trainer_id: undefined
      })
      setDuration(0)
      setDurationUi(0)
      onClose()
    },
    onError: () => {
      onClose()
    }
  })

  useEffect(() => {
    if (start && end) {
      const startDate = new Date(start)
      const endDate = new Date(end)

      setValue("day", startDate.toISOString().slice(0, 10))
      setValue("start", startDate.toTimeString().slice(0, 5))
      setValue("end", endDate.toTimeString().slice(0, 5))
    } else {
      setValue("day", "")
      setValue("start", "")
      setValue("end", "")
    }
  }, [start, end, setValue])

  const onSubmit = (data: FormValues) => {
    if (data.lesson_id !== null) {
      const scheduleData: CreateScheduleDto = {
        day: data.day,
        lesson_id: data.lesson_id,
        from_time: data.start,
        to_time: data.end,
        places: data.places ? data.places : 1,
        trainer_id: data.trainer_id
      }
      mutate(scheduleData)
    }
  }

  const handleLessonSelect = (selectedLesson: Lesson | (string | number)[]) => {
    if (Array.isArray(selectedLesson)) return

    setDuration(selectedLesson.duration ?? 0)
    setValue("lesson_id", selectedLesson.id ?? null, { shouldValidate: true })
  }
  const handleTrainerSelect = (selectedTrainer: number) => {
    setValue("trainer_id", selectedTrainer)
  }
  const handleStartSelect = (start: string) => {
    setValue("start", start, { shouldValidate: true })
  }
  const handleEndSelect = (end: string) => {
    setValue("end", end, { shouldValidate: true })
  }
  const handleDaySelect = (day: Date | null) => {
    if (day) {
      const localDate = new Date(day.getTime() - day.getTimezoneOffset() * 60000)
      setValue("day", localDate.toISOString().slice(0, 10), { shouldValidate: true })
    } else {
      setValue("day", "", { shouldValidate: true })
    }
  }

  const startTime = watch("start")
  const endTime = watch("end")
  const day = watch("day")

  useEffect(() => {
    if (startTime && endTime) {
      const startMin = parseTimeToMinutes(startTime)
      const endMin = parseTimeToMinutes(endTime)
      setDurationUi(endMin > startMin ? endMin - startMin : 0)
    } else {
      setDurationUi(0)
    }
  }, [startTime, endTime])

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    if (day === today) {
      const currentTime = new Date()
      const minutes = currentTime.getMinutes()
      const roundedMinutes = Math.ceil(minutes / 15) * 15
      currentTime.setMinutes(roundedMinutes, 0, 0)
      setMinTime(currentTime.toTimeString().slice(0, 5))
    } else {
      setMinTime("06:00")
    }
  }, [day])
  useEffect(() => {
    const currentEnd = watch("end")

    if (startTime && duration > 0) {
      const hasManualEnd = Boolean(currentEnd)

      if (!hasManualEnd) {
        const startMin = parseTimeToMinutes(startTime)
        const newEndMin = startMin + duration
        const newEndStr = formatTime(newEndMin)

        setValue("end", newEndStr)
      }
    }
  }, [startTime, duration, setValue, watch])
  // useEffect(() => {
  //   if (startTime && durationUi) {
  //     const startMin = parseTimeToMinutes(startTime)
  //     const newEndMin = startMin + durationUi
  //     const newEndStr = formatTime(newEndMin)
  //     setValue("end", newEndStr, { shouldValidate: true })
  //   }
  // }, [startTime, durationUi])
  return (
    <ModalOverlay isOpen={isOpen} onClose={resetOnClose}>
      <Modal
        title="Новое расписание"
        isOpen={isOpen}
        onClose={resetOnClose}
        showMessage
        message="Все поля должны быть заполнены."
        actions={
          <>
            <Button variant={ButtonVariant.Neutral} type="button" onClick={resetOnClose}>
              Отмена
            </Button>
            <Button onClick={handleSubmit(onSubmit)} type="submit" loading={isPending}>
              Создать расписание
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.gridContainer}>
            <SelectLesson
              selectName="lesson_create"
              {...register("lesson_id", { required: "Выберите занятие" })}
              onSelect={handleLessonSelect}
              selectedLessonId={watch("lesson_id")}
              disabled={isEditing}
              error={errors.lesson_id}
              className={styles.selectLesson}
            />

            {/* Тренер */}
            <SelectTrainer onSelect={handleTrainerSelect} selectedTrainerId={watch("trainer_id")} />
            {/* Количество мест */}

            <Input
              leftIcon={<Users />}
              placeholder="Не указано"
              label="Количество мест"
              required={!watch("places")}
              type="number"
              {...register("places", { required: true, min: 1 })}
              error={errors.places}
            />
            <div className={styles.gridRow}>
              {/* Дата занятия */}
              <DaySelect
                required
                label="Дата занятия"
                value={watch("day")}
                {...register("day", { required: "Выберите день занятия" })}
                onChange={handleDaySelect}
                minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                error={errors.day}
              />
              {/* Начало*/}
              <TimeSelect
                label="Начало"
                required
                minTime={minTime}
                value={watch("start")}
                mode="start"
                {...register("start", { required: "Выберите начало занятия" })}
                onChange={handleStartSelect}
                error={errors.start}
              />

              {/* Конец */}
              <TimeSelect
                label="Конец"
                required
                value={watch("end")}
                minTime={minTime}
                startTime={watch("start")}
                mode="end"
                {...register("end", { required: "Выберите конец занятия" })}
                onChange={handleEndSelect}
                error={errors.end}
              />
              {/* Длит. (мин) */}

              <Input
                label="Длит. (мин)"
                placeholder="00"
                type="number"
                value={durationUi === 0 ? "" : durationUi}
                onChange={(e) => {
                  const input = e.target.value
                  const val = Math.max(0, parseInt(input || "0", 10))
                  if (startTime) {
                    const startMin = parseTimeToMinutes(startTime)
                    const newEndMin = startMin + val
                    if (newEndMin <= 1320) {
                      setDurationUi(val)
                      const newEndStr = formatTime(newEndMin)
                      setValue("end", newEndStr, { shouldValidate: true })
                    }
                  }
                }}
              />
            </div>
          </div>
        </form>
      </Modal>
    </ModalOverlay>
  )
}
