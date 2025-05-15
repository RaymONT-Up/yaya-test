import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import styles from "./EditSchedule.module.scss"
import { Input } from "@/shared/ui/Input/Input"
import { EventApi } from "@fullcalendar/core"
import { useUpdateSchedule } from "@/entities/schedule"
import { Modal } from "@/shared/ui/Modal/Modal"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Users } from "@/shared/assets/svg/Users"
import { Text, TextVariant } from "@/shared/ui/Text/Text"
import { formatScheduleTimeRaw } from "@/shared/libs/formaDate"
import { User } from "@/shared/assets/svg/User"
import { Calendar } from "@/shared/assets/svg/Calendar"
import { Alert, AlertVariant } from "@/shared/ui/Alert/Alert"
import { Info } from "@/shared/assets/svg/Info"
import { Trash } from "@/shared/assets/svg/Trash"
import { Dialog } from "@/shared/ui/Dialog/Dialog"
import { Textarea } from "@/shared/ui/Textarea/Textarea"

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedEvent: EventApi
  handleCancelScheduleRequest: (id: string, reason: string) => void
}

interface FormValues {
  places: number | null
  trainer_id: number
  cancel_reason?: string | null
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
    formState: { touchedFields }
  } = useForm<FormValues>({
    defaultValues: {
      places: null,
      trainer_id: undefined,
      cancel_reason: null
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
      console.log("Расписание успешно обновлено:", data)
      reset()
      onClose()
    },
    onError: (err) => {
      console.error("Ошибка при обновлении расписания:", err)
      reset()
      onClose()
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
  const places = watch("places")

  const isPlacesValid = places && Number(places) >= selectedEvent.extendedProps.booked_counts
  return (
    <>
      <Modal
        showHeadline
        headline="Тег для занятия"
        title={selectedEvent.extendedProps?.lesson?.name || "Редактировать расписание"}
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
            <Button
              variant={ButtonVariant.Primary}
              type="submit"
              loading={updateMutation.isPending}
              onClick={() => onSubmit(getValues())}
              disabled={!isPlacesValid}
            >
              Сохранить
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
                  const { dateTime, duration } = formatScheduleTimeRaw(
                    selectedEvent.startStr,
                    selectedEvent.endStr
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
                {selectedEvent.extendedProps.trainer ?? ""}
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
            <div className={styles.readonlyField}>
              <Text bodySize="medium" fontWeight={600} className={styles.label}>
                <Users className={styles.icon} />
                Количество мест
              </Text>
              <Input
                required={!watch("places")}
                type="number"
                {...register("places", {
                  required: true,
                  min: 1,
                  validate: (value) =>
                    (value && value >= selectedEvent.extendedProps.booked_counts) ||
                    `Не может быть меньше записанных участников (${selectedEvent.extendedProps.booked_counts})`
                })}
                error={!isPlacesValid ? "Error" : undefined}
                className={styles.placeInput}
              />
            </div>
          </div>

          {watch("places") !== null &&
            watch("places")! < selectedEvent.extendedProps.booked_counts && (
              <div className={styles.errorBlock}>
                <Info className={styles.errorIcon} />
                <Text variant={TextVariant.HEADING} headingLevel="h8" className={styles.errorText}>
                  Количество мест меньше числа записанных участников.
                </Text>
              </div>
            )}
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
        bodyText={
          selectedEvent.extendedProps?.booked_counts > 0
            ? `На занятие «${selectedEvent.extendedProps?.lesson?.name}» записано ${selectedEvent.extendedProps?.booked_counts} человек. Если вы отмените его, оно исчезнет из расписания всех участников.`
            : `Занятие «${selectedEvent.extendedProps?.lesson?.name}» будет удалено из расписания.`
        }
        title="Отменить занятие?"
        isOpen={showCancelDialog}
        onClose={handleCancelDialogClose}
        actions={
          <>
            <Button variant={ButtonVariant.Neutral} onClick={handleCancelDialogClose}>
              Отмена
            </Button>
            <Button
              variant={ButtonVariant.RED}
              iconStart={<Trash color="#fff" />}
              onClick={handleConfirmedCancel}
              disabled={!watch("cancel_reason")}
            >
              Отменить занятие
            </Button>
          </>
        }
      >
        <Textarea
          label="Причина отмены"
          placeholder="Укажите причину"
          required={!watch("cancel_reason")}
          resizeable
          {...register("cancel_reason", { required: "Причина не может быть пустой" })}
          error={
            touchedFields.cancel_reason && !watch("cancel_reason")
              ? "Причина не может быть пустой"
              : undefined
          }
          showErrorText
          className={styles.cancelReason}
        />
      </Dialog>
    </>
  )
}
