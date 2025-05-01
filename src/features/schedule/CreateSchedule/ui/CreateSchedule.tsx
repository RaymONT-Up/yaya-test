import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './CreateSchedule.module.scss'
import { Input } from '@/shared/ui/Input/Input'
import { Text, TextVariant } from '@/shared/ui/Text/Text'
import { Button, ButtonVariant } from '@/shared/ui/Button'

interface Props {
  start?: string
  end?: string
  onClose: () => void
}

interface FormValues {
  name: string
  start: string
  end: string
}

export const CreateSchedule: React.FC<Props> = ({ start, end, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      start,
      end
    }
  })

  const onSubmit = (data: FormValues) => {
    console.log('Создание занятия:', data)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Text variant={TextVariant.HEADING} headingLevel="h7">
        Создать расписание
      </Text>

      <Input
        label="Название занятия:"
        type="text"
        {...register('name', { required: 'Это поле обязательно' })}
        error={errors.name}
      />

      <Input
        label="Начало:"
        type="datetime-local"
        {...register('start', { required: 'Это поле обязательно' })}
        error={errors.start}
      />

      <Input
        label="Конец:"
        type="datetime-local"
        {...register('end', { required: 'Это поле обязательно' })}
        error={errors.end}
      />

      <div className={styles.buttons}>
        <Button type="submit">Создать</Button>
        <Button variant={ButtonVariant.Neutral} type="button" onClick={onClose}>
          Отмена
        </Button>
      </div>
    </form>
  )
}
