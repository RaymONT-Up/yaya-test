import React, { useEffect, useState } from "react"
import { Modal } from "@/shared/ui/Modal/Modal"
import { Dialog } from "@/shared/ui/Dialog/Dialog"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Trash } from "@/shared/assets/svg/Trash"
import { useForm } from "react-hook-form"
import { CancelVisitDto, IVisit } from "@/shared/types/visit"
import styles from "./CancelVisit.module.scss"
import { Text, TextVariant } from "@/shared/ui/Text/Text"
import { Calendar } from "@/shared/assets/svg/Calendar"
import { Users } from "@/shared/assets/svg/Users"
import { Clock } from "@/shared/assets/svg/Clock"
import { Phone } from "@/shared/assets/svg/Phone"
import { Briefcase } from "@/shared/assets/svg/BriefCase"
import { Home } from "@/shared/assets/svg/Home"
import { Zap } from "@/shared/assets/svg/Zap"
import { Globe } from "@/shared/assets/svg/Globe"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { getAge } from "@/shared/libs/getChildAge"
import { getLessonTypeLabel } from "@/shared/libs/getLessonTypeLabel"
import { formatAgeRange } from "@/shared/libs/getAgeRangeLabel"
import { CancelReason, cancelReasonsList } from "../const/cancelReason"
import { Textarea } from "@/shared/ui/Textarea/Textarea"
import { ChevronLeft } from "@/shared/assets/svg/ChevronLeft"
import { ReasonOptions } from "./ReasonOptions/ReasonOptions"

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedVisit: IVisit
  handleCancel: (payload: CancelVisitDto) => void
  handleScheduleCancel: (schedule_id: number, payload: CancelVisitDto) => void
}

interface FormValues {
  cancel_reason: string
}

export const CancelVisit: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedVisit,
  handleCancel,
  handleScheduleCancel
}) => {
  const [showDialog, setShowDialog] = useState(false)
  const [selectedReason, setSelectedReason] = useState<CancelReason | null>(null)
  const [customReasonMode, setCustomReasonMode] = useState(false)

  const {
    handleSubmit,
    watch,
    reset,
    register,
    setValue,
    formState: { touchedFields }
  } = useForm<FormValues>({
    defaultValues: {
      cancel_reason: ""
    }
  })

  const reason = watch("cancel_reason")

  const handleDialogOpen = () => {
    setShowDialog(true)
  }

  const handleDialogClose = () => {
    setShowDialog(false)
    setSelectedReason(null)
    setCustomReasonMode(false)
  }

  const onSubmit = (data: FormValues) => {
    const reason = data.cancel_reason
    const payload = {
      visit_id: selectedVisit.id,
      cancel_reason: reason
    }
    if (isLessonUnavailableReason(selectedReason)) {
      if (selectedVisit.schedule?.id) handleScheduleCancel(selectedVisit?.schedule?.id, payload)
      // !TODO убрать это просто для теста сценария отмены занятия через посещение
      else handleScheduleCancel(813570, payload)
    } else {
      handleCancel(payload)
    }

    setCustomReasonMode(false)
    setSelectedReason(null)
    setValue("cancel_reason", "")
    reset()
    setShowDialog(false)
    onClose()
  }
  const birthday = selectedVisit.child.birthday
  const age = getAge(birthday)
  const formattedDate = format(new Date(birthday), "dd MMM yyyy", { locale: ru })

  const handleCustomReason = () => {
    setCustomReasonMode(true)
    setSelectedReason(null)
    setValue("cancel_reason", "")
  }

  useEffect(() => {
    if (
      selectedReason === CancelReason.USER_REQUESTED ||
      selectedReason === CancelReason.GROUP_FULL
    ) {
      setValue("cancel_reason", selectedReason)
    }

    if (selectedReason && !customReasonMode) {
      setValue("cancel_reason", selectedReason)
    }
  }, [selectedReason, customReasonMode, setValue])
  const start = new Date(selectedVisit.schedule?.start_timestamp ?? selectedVisit.book_timestamp)
  const end = selectedVisit.schedule?.end_timestamp
    ? new Date(selectedVisit.schedule.end_timestamp)
    : null
  const formatTime = (date: Date) => date.toISOString().slice(11, 16)
  const formatDate = (date: Date) =>
    `${date.getDate()} ${date.toLocaleString("ru-RU", { month: "long" })}`
  const durationMinutes = end ? Math.round((end.getTime() - start.getTime()) / 60000) : null
  const isLessonUnavailableReason = (reason: CancelReason | null): boolean =>
    reason === CancelReason.TEACHER_SICK || reason === CancelReason.LESSON_CANCELED
  return (
    <>
      <Modal
        width="600px"
        isOpen={isOpen && !showDialog}
        onClose={onClose}
        showHeadline
        headline="Запись"
        title={`${selectedVisit.child.first_name} ${selectedVisit.child.last_name}`}
        actions={
          <>
            <Button
              iconStart={<Trash />}
              variant={ButtonVariant.Neutral}
              onClick={handleDialogOpen}
            >
              Отменить запись
            </Button>
          </>
        }
      >
        <div className={styles.readonlyFields}>
          <div className={styles.childInfo}>
            <div className={styles.readonlyField}>
              <Text bodySize="medium" fontWeight={600} className={styles.label}>
                <Calendar width={16} height={16} className={styles.icon} />
                Дата рождения
              </Text>
              <Text bodySize="medium" fontWeight={600} className={styles.value}>
                {formattedDate}{" "}
                <span className={styles.childAge}>
                  ({age} {age === 1 ? "год" : age < 5 ? "года" : "лет"})
                </span>
              </Text>
            </div>
            <div className={styles.readonlyField}>
              <Text bodySize="medium" fontWeight={600} className={styles.label}>
                <Phone width={16} height={16} className={styles.icon} />
                Телефон родителя
              </Text>
              <Text bodySize="medium" fontWeight={600} className={styles.value}>
                +7 777 777 77 77
              </Text>
            </div>
          </div>
          <div className={styles.readonlyField}>
            <Text bodySize="medium" fontWeight={600} className={styles.label}>
              <Briefcase width={16} height={16} className={styles.icon} />
              Занятие
            </Text>
            <Text bodySize="medium" fontWeight={600} className={styles.value}>
              {selectedVisit.lesson.name}
            </Text>
          </div>
          <div className={styles.readonlyField}>
            <Text bodySize="medium" fontWeight={600} className={styles.label}>
              <Home width={16} height={16} className={styles.icon} />
              Формат
            </Text>
            <Text bodySize="medium" fontWeight={600} className={styles.value}>
              {getLessonTypeLabel(selectedVisit.lesson.type)}
            </Text>
          </div>
          <div className={styles.readonlyField}>
            <Text bodySize="medium" fontWeight={600} className={styles.label}>
              <Clock width={16} height={16} className={styles.icon} />
              Расписание
            </Text>
            <Text bodySize="medium" fontWeight={600} className={styles.value}>
              <Text bodySize="medium" className={styles.userInfoText}>
                Время: {formatDate(start)}, {formatTime(start)}
                {end ? `–${formatTime(end)}` : ""}
              </Text>
              {durationMinutes && (
                <Text fontWeight={400} className={styles.duration}>
                  ({durationMinutes} мин)
                </Text>
              )}
            </Text>
          </div>
          <div className={styles.readonlyField}>
            <Text bodySize="medium" fontWeight={600} className={styles.label}>
              <Users width={16} height={16} className={styles.icon} />
              Возрастная группа
            </Text>
            <Text bodySize="medium" fontWeight={600} className={styles.value}>
              {formatAgeRange(selectedVisit.lesson.min_age_str, selectedVisit.lesson.max_age_str)}
            </Text>
          </div>
          <div className={styles.readonlyField}>
            <Text bodySize="medium" fontWeight={600} className={styles.label}>
              <Zap width={16} height={16} className={styles.icon} />
              Уровень
            </Text>
            <Text bodySize="medium" fontWeight={600} className={styles.value}>
              {selectedVisit.lesson.level}
            </Text>
          </div>
          <div className={styles.readonlyField}>
            <Text bodySize="medium" fontWeight={600} className={styles.label}>
              <Globe width={16} height={16} className={styles.icon} />
              Язык
            </Text>
            <Text bodySize="medium" fontWeight={600} className={styles.value}>
              {selectedVisit.lesson.languages && selectedVisit.lesson.languages.join(",")}
            </Text>
          </div>
        </div>
      </Modal>

      <Dialog
        isOpen={showDialog}
        onClose={handleDialogClose}
        title={
          selectedReason === CancelReason.TEACHER_SICK ||
          selectedReason === CancelReason.LESSON_CANCELED
            ? "Занятие не должно быть доступно для записи"
            : "Укажите причину отмены записи"
        }
        type="default"
        width="466px"
        actions={
          <>
            <Button
              variant={ButtonVariant.Neutral}
              onClick={() => {
                if (isLessonUnavailableReason(selectedReason) || customReasonMode) {
                  setSelectedReason(null)
                  setCustomReasonMode(false)
                } else {
                  handleDialogClose()
                }
              }}
              iconStart={
                isLessonUnavailableReason(selectedReason) || customReasonMode ? (
                  <ChevronLeft />
                ) : undefined
              }
            >
              {isLessonUnavailableReason(selectedReason) || customReasonMode ? "Назад" : "Отмена"}
            </Button>
            <Button
              variant={ButtonVariant.RED}
              iconStart={<Trash color="#fff" />}
              onClick={handleSubmit(onSubmit)}
              disabled={!reason}
            >
              Отменить {isLessonUnavailableReason(selectedReason) ? "занятие" : "запись"}
            </Button>
          </>
        }
      >
        {!isLessonUnavailableReason(selectedReason) && (
          <ul className={styles.userInfoList}>
            <li className={styles.userInfoItem}>
              <Text bodySize="medium" className={styles.userInfoText}>
                Студент: {selectedVisit.child.first_name} {selectedVisit.child.last_name}
              </Text>
            </li>
            <li className={styles.userInfoItem}>
              <Text bodySize="medium" className={styles.userInfoText}>
                Занятие: {selectedVisit.lesson.name}
              </Text>
            </li>
            <li className={styles.userInfoItem}>
              <Text bodySize="medium" className={styles.userInfoText}>
                Время: {formatDate(start)}, {formatTime(start)}
                {end ? `–${formatTime(end)}` : ""}
              </Text>
            </li>
          </ul>
        )}
        <div className={styles.reasonList}>
          {(selectedReason === CancelReason.GROUP_FULL ||
            selectedReason === CancelReason.USER_REQUESTED) && (
            <ReasonOptions
              selectedReason={selectedReason}
              setSelectedReason={setSelectedReason}
              handleCustomReason={handleCustomReason}
              cancelReasonsList={cancelReasonsList}
            />
          )}

          {selectedReason === null && !customReasonMode && (
            <ReasonOptions
              selectedReason={selectedReason}
              setSelectedReason={setSelectedReason}
              handleCustomReason={handleCustomReason}
              cancelReasonsList={cancelReasonsList}
            />
          )}
          {customReasonMode && (
            <Textarea
              showErrorText
              label="Причина отмены"
              placeholder="Родитель увидит причину отмены"
              resizeable
              required={!reason}
              {...register("cancel_reason", { required: "Причина не может быть пустой" })}
              className={styles.cancelReason}
              error={
                touchedFields.cancel_reason && !reason ? "Причина не может быть пустой" : undefined
              }
            />
          )}

          {isLessonUnavailableReason(selectedReason) && (
            <>
              <Text bodySize="medium" className={styles.requiredCancelText}>
                {selectedReason === CancelReason.TEACHER_SICK
                  ? `На это занятие уже записано 10 человек. При отмене оно будет удалено из расписания для всех.`
                  : "Если занятие было отменено, то его также необходимо отменить в системе."}
              </Text>
              {/* Schedule card */}
              <div className={styles.scheduleCard}>
                <Text
                  variant={TextVariant.HEADING}
                  headingLevel="h8"
                  className={styles.scheduleCardTitle}
                >
                  {selectedVisit.lesson.name}
                </Text>
                <div className={styles.scheduleCardDetails}>
                  <Text bodySize="small" fontWeight={600} className={styles.scheduleCardTime}>
                    {formatTime(start)}
                    {end ? `–${formatTime(end)}` : ""}
                  </Text>
                  <div className={styles.dot} />
                  <Text bodySize="small" className={styles.secondaryText}>
                    {formatAgeRange(
                      selectedVisit.lesson.min_age_str,
                      selectedVisit.lesson.max_age_str
                    )}
                  </Text>
                  <div className={styles.dot} />
                  <Text bodySize="small" className={styles.secondaryText}>
                    Англ
                  </Text>
                  <div className={styles.dot} />
                  <Text bodySize="small" className={styles.secondaryText}>
                    Intermediate
                  </Text>
                  <div className={styles.dot} />
                  <Text bodySize="small" className={styles.secondaryText}>
                    Онлайн
                  </Text>
                </div>
              </div>
            </>
          )}
        </div>
      </Dialog>
    </>
  )
}
