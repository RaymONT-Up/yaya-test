import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './CreateSchedule.module.scss'
import { Input } from '@/shared/ui/Input/Input'
import { SelectLesson } from '@/features/lesson/selectLesson'
import { useCreateSchedule } from '@/entities/schedule'
import { CreateScheduleDto } from '@/shared/types/schedule'
import { SelectTrainer } from '@/features/trainer'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { Users } from '@/shared/assets/svg/Users'
import { TimeSelect } from '@/shared/ui/TimeSelect/TimeSelect'
import { parseTimeToMinutes } from '@/shared/libs/formaDate'
import { DaySelect } from '@/shared/ui/DaySelect/DaySelect'
import { Lesson } from '@/shared/types/lesson'

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

export const CreateSchedule: React.FC<Props> = ({
  isOpen = false,
  start,
  end,
  onClose,
  isEditing = false
}) => {
  const [duration, setDuration] = useState<number>(0)
  const [minTime, setMinTime] = useState<string>('')
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
      start: start ?? '',
      end: end ?? '',
      places: null,
      trainer_id: undefined
    }
  })
  const { isPending, mutate } = useCreateSchedule({
    onSuccess: (data) => {
      console.log('Расписание успешно добавлено:', data)
      reset({
        day: new Date().toISOString().slice(0, 10),
        lesson_id: null,
        start: '',
        end: '',
        places: null,
        trainer_id: undefined
      })
      setDuration(0)
      onClose()
    },
    onError: (err) => {
      console.error('Ошибка при добавлении расписания:', err)
    }
  })

  useEffect(() => {
    if (start && end) {
      const startDate = new Date(start)
      const endDate = new Date(end)

      setValue('day', startDate.toISOString().slice(0, 10))
      setValue('start', startDate.toTimeString().slice(0, 5))
      setValue('end', endDate.toTimeString().slice(0, 5))
    } else {
      setValue('day', '')
      setValue('start', '')
      setValue('end', '')
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

  const handleLessonSelect = (selectedLesson: Lesson) => {
    setDuration(selectedLesson.duration ?? 0)
    setValue('lesson_id', selectedLesson.id ?? null)
  }
  const handleTrainerSelect = (selectedTrainer: number) => {
    setValue('trainer_id', selectedTrainer)
  }
  const handleStartSelect = (start: string) => {
    setValue('start', start)
  }
  const handleEndSelect = (end: string) => {
    setValue('end', end)
  }
  const handleDaySelect = (day: Date | null) => {
    if (day) {
      const localDate = new Date(day.getTime() - day.getTimezoneOffset() * 60000)
      setValue('day', localDate.toISOString().slice(0, 10))
    } else {
      setValue('day', '')
    }
  }

  const startTime = watch('start')
  const endTime = watch('end')
  const day = watch('day')

  useEffect(() => {
    if (startTime && endTime) {
      const startMin = parseTimeToMinutes(startTime)
      const endMin = parseTimeToMinutes(endTime)
      setDuration(endMin > startMin ? endMin - startMin : 0)
    } else {
      setDuration(0)
    }
  }, [startTime, endTime])
  useEffect(() => {
    console.log('day', day)
    const today = new Date().toISOString().slice(0, 10)
    if (day === today) {
      const currentTime = new Date()
      const minutes = currentTime.getMinutes()
      const roundedMinutes = Math.ceil(minutes / 15) * 15
      currentTime.setMinutes(roundedMinutes, 0, 0)
      setMinTime(currentTime.toTimeString().slice(0, 5))
    } else {
      setMinTime('06:00')
    }
  }, [day])
  return (
    <Modal
      title="Новое расписание"
      isOpen={isOpen}
      onClose={onClose}
      showMessage
      message="Все поля должны быть заполнены."
      actions={
        <>
          <Button variant={ButtonVariant.Neutral} type="button" onClick={onClose}>
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
            {...register('lesson_id', { required: 'Выберите занятие' })}
            onSelect={handleLessonSelect}
            selectedLessonId={watch('lesson_id')}
            disabled={isEditing}
            error={errors.lesson_id}
          />
          {/* теги */}
          <>Теги</>

          {/* Тренер */}
          <SelectTrainer onSelect={handleTrainerSelect} selectedTrainerId={watch('trainer_id')} />
          {/* Количество мест */}

          <Input
            leftIcon={<Users />}
            placeholder="Не указано"
            label="Количество мест"
            required={!watch('places')}
            type="number"
            {...register('places', { required: true, min: 1 })}
            error={errors.places}
          />
          <div className={styles.gridRow}>
            {/* Дата занятия */}
            <DaySelect
              required
              label="Дата занятия"
              value={watch('day')}
              onChange={handleDaySelect}
              minDate={new Date(new Date().setHours(0, 0, 0, 0))}
            />
            {/* Начало*/}
            <TimeSelect
              label="Начало"
              required
              minTime={minTime}
              value={watch('start')}
              mode="start"
              {...register('start', { required: 'Выберите начало занятия' })}
              onChange={handleStartSelect}
              error={errors.start}
            />

            {/* Конец */}
            <TimeSelect
              label="Конец"
              required
              value={watch('end')}
              minTime={minTime}
              startTime={watch('start')}
              defaultDuration={duration}
              mode="end"
              {...register('end', { required: 'Выберите конец занятия' })}
              onChange={handleEndSelect}
              error={errors.end}
            />
            {/* Длит. (мин) */}

            <Input label="Длит. (мин)" placeholder="00" type="number" value={duration} readOnly />
          </div>
        </div>
      </form>
    </Modal>
  )
}
