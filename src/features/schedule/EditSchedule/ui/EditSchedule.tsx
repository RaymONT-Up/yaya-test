import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './EditSchedule.module.scss'
import { Input } from '@/shared/ui/Input/Input'
import { EventApi } from '@fullcalendar/core'
import { useUpdateSchedule } from '@/entities/schedule'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { Users } from '@/shared/assets/svg/Users'
import { Text } from '@/shared/ui/Text/Text'
import { formatScheduleTime } from '@/shared/libs/formaDate'
import { User } from '@/shared/assets/svg/User'
import { Calendar } from '@/shared/assets/svg/Calendar'
import { Alert, AlertVariant } from '@/shared/ui/Alert/Alert'
import { Info } from '@/shared/assets/svg/Info'
import { Trash } from '@/shared/assets/svg/Trash'
import { Dialog } from '@/shared/ui/Dialog/Dialog'
import { Textarea } from '@/shared/ui/Textarea/Textarea'

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedEvent: EventApi
  handleCancelScheduleRequest: (id: string, reason: string) => void
}

interface FormValues {
  places: number | null
  trainer_id: number
  cancel_reason?: string
}

export const EditSchedule: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedEvent,
  handleCancelScheduleRequest
}) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const handleCancelClick = () => {
    setShowCancelDialog(true)
  }

  const handleCancelDialogClose = () => {
    setShowCancelDialog(false)
  }

  const handleConfirmedCancel = () => {
    const values = getValues()
    if (values.cancel_reason) {
      handleCancelScheduleRequest(selectedEvent.id, values.cancel_reason)
    }
    setShowCancelDialog(false)
    onClose()
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      places: null,
      trainer_id: undefined,
      cancel_reason: ''
    }
  })

  useEffect(() => {
    if (selectedEvent) {
      reset({
        places: selectedEvent.extendedProps.places ?? null
      })
    }
  }, [selectedEvent, reset])

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

  const onSubmit = (data: FormValues) => {
    const editData = {
      id: selectedEvent.id,
      trainer_id: data.trainer_id,
      places: data.places ? data.places : 1
    }
    updateMutation.mutate(editData)
  }

  return (
    <>
      <Modal
        showHeadline
        headline="Тег для занятия"
        title={selectedEvent.extendedProps?.lesson?.name || 'Редактировать расписание'}
        isOpen={isOpen && !showCancelDialog}
        onClose={onClose}
        actions={
          <>
            <Button
              iconStart={<Trash />}
              variant={ButtonVariant.Neutral}
              type="button"
              onClick={handleCancelClick}
            >
              Отменить расписание
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.readonlyFields}>
            <div className={styles.readonlyField}>
              <Text bodySize="medium" fontWeight={600} className={styles.label}>
                <Calendar width={16} height={16} className={styles.icon} />
                Дата
              </Text>
              {selectedEvent.start &&
                selectedEvent.end &&
                (() => {
                  const { dateTime, duration } = formatScheduleTime(
                    selectedEvent.start,
                    selectedEvent.end
                  )
                  return (
                    <Text bodySize="medium" fontWeight={600} className={styles.value}>
                      {dateTime} <span className={styles.duration}>({duration})</span>
                    </Text>
                  )
                })()}
            </div>

            <div className={styles.readonlyField}>
              <Text bodySize="medium" fontWeight={600} className={styles.label}>
                <User className={styles.icon} />
                Тренер
              </Text>
              <Text bodySize="medium" fontWeight={600} className={styles.value}>
                {selectedEvent.extendedProps.trainer ?? ''}
              </Text>
            </div>

            <div className={styles.readonlyField}>
              <Text bodySize="medium" fontWeight={600} className={styles.label}>
                <User className={styles.icon} />
                Записалось
              </Text>
              <Text bodySize="medium" fontWeight={600} className={styles.value}>
                {selectedEvent.extendedProps.booked_counts ?? 0}
              </Text>
            </div>
          </div>

          <div className={styles.editableField}>
            <Input
              leftIcon={<Users />}
              placeholder="Не указано"
              label="Количество мест"
              required={!watch('places')}
              type="number"
              {...register('places', { required: true, min: 1 })}
              error={errors.places}
              className={styles.placeInput}
            />
          </div>
          <div className={styles.alertBlock}>
            <Alert
              icon={<Info />}
              variant={AlertVariant.Info}
              title="Количество мест должно быть не меньше одного и не меньше числа записанных участников."
              className={styles.alert}
            />
          </div>
        </form>
      </Modal>
      <Dialog
        type="default"
        width="466px"
        bodyText={`Занятие «${selectedEvent.extendedProps?.lesson?.name || ''}» будет удалено из расписания.`}
        title="Отменить занятие?"
        isOpen={showCancelDialog}
        onClose={handleCancelDialogClose}
        actions={
          <>
            <Button variant={ButtonVariant.Neutral} onClick={handleCancelDialogClose}>
              Отмена
            </Button>
            <Button iconStart={<Trash color="#fff" />} onClick={handleConfirmedCancel}>
              Отменить занятие
            </Button>
          </>
        }
      >
        <Textarea
          label="Причина отмены"
          placeholder="Укажите причину"
          resizeable
          required={!watch('cancel_reason')}
          {...register('cancel_reason', { required: 'Укажите причину отмены' })}
          error={errors.cancel_reason}
          className={styles.cancelReason}
        />
      </Dialog>
    </>
  )
}
