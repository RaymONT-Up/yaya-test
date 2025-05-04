import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styles from './CreateSchedule.module.scss'
import { Input } from '@/shared/ui/Input/Input'
import { Text, TextVariant } from '@/shared/ui/Text/Text'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { EventApi } from '@fullcalendar/core'
import { SelectLesson } from '@/features/lesson/selectLesson'
import { useCreateSchedule, useUpdateSchedule } from '@/entities/schedule'
import { CreateScheduleDto } from '@/shared/types/schedule'
import { SelectTrainer } from '@/features/trainer'
import { useTrainers } from '@/features/trainer/model/useTrainers'

interface Props {
  start?: string
  end?: string
  onClose: () => void
  isEditing?: boolean
  selectedEvent?: EventApi | null
}

interface FormValues {
  lesson_id: number | null
  start: string
  end: string
  places: number
  trainer_id: number
}

export const CreateSchedule: React.FC<Props> = ({
  start,
  end,
  onClose,
  isEditing = false,
  selectedEvent
}) => {
  const { data: trainers } = useTrainers()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      lesson_id: null,
      start: start ?? '',
      end: end ?? '',
      places: 1,
      trainer_id: undefined
    }
  })
  useEffect(() => {
    if (isEditing && selectedEvent && trainers) {
      const foundTrainer = trainers.find(
        (t) => `${t.full_name} | ${t.job}` === selectedEvent.extendedProps.trainer
      )

      reset({
        lesson_id: selectedEvent.extendedProps.lesson_id ?? null,
        start: selectedEvent.start?.toISOString().slice(0, 16) ?? '',
        end: selectedEvent.end?.toISOString().slice(0, 16) ?? '',
        places: selectedEvent.extendedProps.places ?? 1,
        trainer_id: foundTrainer?.id ?? undefined
      })
    }
  }, [isEditing, selectedEvent, trainers, reset])
  const onSubmit = (data: FormValues) => {
    if (data.lesson_id !== null) {
      const scheduleData: CreateScheduleDto = {
        day: new Date(data.start).toISOString().slice(0, 10),
        lesson_id: data.lesson_id,
        from_time: new Date(data.start).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        to_time: new Date(data.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        places: data.places,
        trainer_id: data.trainer_id
      }

      if (isEditing && selectedEvent) {
        const editData = {
          id: selectedEvent.id,
          trainer_id: data.trainer_id,
          places: data.places
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
      onClose()
    },
    onError: (err) => {
      console.error('Ошибка при обновлении расписания:', err)
    }
  })
  const isPending = isEditing ? updateMutation.isPending : createMutation.isPending
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Text variant={TextVariant.HEADING} headingLevel="h7">
        {isEditing ? 'Редактировать расписание' : 'Создать расписание'}
      </Text>

      <SelectLesson
        onSelect={handleLessonSelect}
        selectedLessonId={watch('lesson_id')}
        disabled={isEditing}
      />

      <Input
        label="Начало:"
        type="datetime-local"
        {...register('start', { required: 'Это поле обязательно' })}
        error={errors.start}
        disabled={isEditing}
      />

      <Input
        label="Конец:"
        type="datetime-local"
        {...register('end', { required: 'Это поле обязательно' })}
        error={errors.end}
        disabled={isEditing}
      />

      <Input
        label="Количество мест:"
        type="number"
        {...register('places', { required: true, min: 1 })}
        error={errors.places}
      />

      <SelectTrainer onSelect={handleTrainerSelect} selectedTrainerId={watch('trainer_id')} />

      <div className={styles.buttons}>
        <Button type="submit" loading={isPending}>
          {isEditing ? 'Сохранить' : 'Создать'}
        </Button>
        <Button variant={ButtonVariant.Neutral} type="button" onClick={onClose}>
          Отмена
        </Button>
      </div>
    </form>
  )
}
