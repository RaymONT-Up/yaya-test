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

  const handleLessonSelect = (selectedLesson: number) => {
    setValue('lesson_id', selectedLesson ?? null)
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
    setValue('day', day ? day.toISOString().slice(0, 10) : '')
  }

  const startTime = watch('start')
  const endTime = watch('end')

  useEffect(() => {
    if (startTime && endTime) {
      const startMin = parseTimeToMinutes(startTime)
      const endMin = parseTimeToMinutes(endTime)
      setDuration(endMin > startMin ? endMin - startMin : 0)
    } else {
      setDuration(0)
    }
  }, [startTime, endTime])
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
            onSelect={handleLessonSelect}
            selectedLessonId={watch('lesson_id')}
            disabled={isEditing}
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
            />
            {/* Начало*/}
            <TimeSelect
              label="Начало"
              required
              value={watch('start')}
              mode="start"
              onChange={handleStartSelect}
            />

            {/* Конец */}
            <TimeSelect
              label="Конец"
              required
              value={watch('end')}
              startTime={watch('start')}
              mode="end"
              onChange={handleEndSelect}
            />
            {/* Длит. (мин) */}

            <Input label="Длит. (мин)" placeholder="00" type="number" value={duration} readOnly />
          </div>
        </div>
      </form>
    </Modal>
  )
}
