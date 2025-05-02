import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './CreateSchedule.module.scss'
import { Input } from '@/shared/ui/Input/Input'
import { Text, TextVariant } from '@/shared/ui/Text/Text'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { EventApi } from '@fullcalendar/core'
import { SelectLesson } from '@/features/lesson/selectLesson'
import { useCreateSchedule } from '@/entities/schedule'
import { CreateScheduleDto } from '@/shared/types/schedule'

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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      lesson_id: isEditing ? (selectedEvent?.extendedProps.lesson_id ?? null) : null,
      start: isEditing ? (selectedEvent?.start?.toISOString().slice(0, 16) ?? '') : (start ?? ''),
      end: isEditing ? (selectedEvent?.end?.toISOString().slice(0, 16) ?? '') : (end ?? ''),
      places: 1,
      trainer_id: 1
    }
  })

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
        console.log('Обновление расписания:', {
          id: selectedEvent.id,
          ...scheduleData
        })
      } else {
        mutate(scheduleData)
      }
    }
  }

  const handleLessonSelect = (selectedLesson: number) => {
    setValue('lesson_id', selectedLesson ?? null)
  }
  const { mutate, isPending } = useCreateSchedule({
    onSuccess: (data) => {
      console.log('Расписание успешно добавлено:', data)
      onClose()
    },
    onError: (err) => {
      console.error('Ошибка при добавлении расписания:', err)
    }
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Text variant={TextVariant.HEADING} headingLevel="h7">
        {isEditing ? 'Редактировать расписание' : 'Создать расписание'}
      </Text>

      <SelectLesson onSelect={handleLessonSelect} />

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

      {/* Выбор тренера добавить */}

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
