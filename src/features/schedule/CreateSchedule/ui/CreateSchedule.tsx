import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './CreateSchedule.module.scss'
import { Input } from '@/shared/ui/Input/Input'
import { EventApi } from '@fullcalendar/core'
import { SelectLesson } from '@/features/lesson/selectLesson'
import { useCreateSchedule, useUpdateSchedule } from '@/entities/schedule'
import { CreateScheduleDto } from '@/shared/types/schedule'
import { SelectTrainer } from '@/features/trainer'
import { useTrainers } from '@/features/trainer/model/useTrainers'
import { useAppSelector } from '@/app/config/store'
import { selectCurrentCenter } from '@/entities/center'
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
  selectedEvent?: EventApi | null
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
  isEditing = false,
  selectedEvent
}) => {
  const [duration, setDuration] = useState<number>(0)
  const { id } = useAppSelector(selectCurrentCenter)

  const { data: trainers } = useTrainers(id)
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
  useEffect(() => {
    if (isEditing && selectedEvent && trainers) {
      const foundTrainer = trainers.find(
        (t) => `${t.full_name} | ${t.job}` === selectedEvent.extendedProps.trainer
      )

      reset({
        day: new Date(selectedEvent.start ?? '').toISOString().slice(0, 10),
        lesson_id: selectedEvent.extendedProps.lesson_id ?? null,
        start: selectedEvent.start?.toISOString().slice(0, 16) ?? '',
        end: selectedEvent.end?.toISOString().slice(0, 16) ?? '',
        places: selectedEvent.extendedProps.places ?? null,
        trainer_id: foundTrainer?.id ?? undefined
      })
    }
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
  }, [isEditing, selectedEvent, trainers, reset, setValue, start, end])
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

      if (isEditing && selectedEvent) {
        const editData = {
          id: selectedEvent.id,
          trainer_id: data.trainer_id,
          places: data.places ? data.places : 1
        }
        updateMutation.mutate(editData)
      } else {
        createMutation.mutate(scheduleData)
      }
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
  const createMutation = useCreateSchedule({
    onSuccess: (data) => {
      console.log('Расписание успешно добавлено:', data)
      onClose()
    },
    onError: (err) => {
      console.error('Ошибка при добавлении расписания:', err)
    }
  })

  const updateMutation = useUpdateSchedule({
    onSuccess: (data) => {
      console.log('Расписание успешно обновлено:', data)
      reset()
      onClose()
    },
    onError: (err) => {
      console.error('Ошибка при обновлении расписания:', err)
    }
  })
  const isPending = isEditing ? updateMutation.isPending : createMutation.isPending

  const startTime = watch('start')
  const endTime = watch('end')

  useEffect(() => {
    if (startTime && endTime) {
      const startMin = parseTimeToMinutes(startTime)
      const endMin = parseTimeToMinutes(endTime)

      if (endMin > startMin) {
        setDuration(endMin - startMin)
      } else {
        setDuration(0)
      }
    } else {
      setDuration(0)
    }
  }, [startTime, endTime, setDuration])
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
            {isEditing ? 'Сохранить' : 'Создать расписание'}
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

            <Input
              label="Длит. (мин)"
              placeholder="00"
              type="number"
              value={duration}
              readOnly
              // error={errors.duration}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}
