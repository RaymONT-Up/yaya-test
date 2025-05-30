import React, { useEffect, useState } from "react"
import { Modal } from "@/shared/ui/Modal/Modal"
import { Dialog } from "@/shared/ui/Dialog/Dialog"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Trash } from "@/shared/assets/svg/Trash"
import { useForm } from "react-hook-form"
import { CancelVisitDto, IVisit, VisitCancelReasonEnum } from "@/shared/types/visit"
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
import { Textarea } from "@/shared/ui/Textarea/Textarea"
import { ChevronLeft } from "@/shared/assets/svg/ChevronLeft"
import { ReasonOptions } from "./ReasonOptions/ReasonOptions"
import { formatTimeToUtc5 } from "@/shared/libs/formatTimeToUTC5"

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedVisit: IVisit
  handleCancel: (payload: CancelVisitDto) => void
  canCancelVisit: boolean
}

interface FormValues {
  cancel_reason: VisitCancelReasonEnum | null
  cancel_comment?: string
}

export const CancelVisit: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedVisit,
  handleCancel,
  canCancelVisit
}) => {
  const [showDialog, setShowDialog] = useState(false)
  const [selectedReason, setSelectedReason] = useState<VisitCancelReasonEnum | null>(null)
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
      cancel_reason: null,
      cancel_comment: undefined
    }
  })

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
    if (reason === null) {
      return
    }

    const payload: CancelVisitDto = {
      visit_id: selectedVisit.id,
      cancel_reason: reason
    }
    if (reason === VisitCancelReasonEnum.OTHER) {
      payload.cancel_comment = data.cancel_comment
    }
    handleCancel(payload)

    setCustomReasonMode(false)
    setSelectedReason(null)
    setValue("cancel_reason", null)
    reset()
    setShowDialog(false)
    onClose()
  }
  const birthday = selectedVisit.child.birthday
  const age = getAge(birthday)
  const formattedDate = format(new Date(birthday), "dd MMM yyyy", { locale: ru })

  const handleCustomReason = () => {
    setCustomReasonMode(true)
    setSelectedReason(VisitCancelReasonEnum.OTHER)
    setValue("cancel_reason", null)
  }

  useEffect(() => {
    if (
      selectedReason === VisitCancelReasonEnum.USER_REQUESTED ||
      selectedReason === VisitCancelReasonEnum.GROUP_OVERFLOW
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
  const formatDate = (date: Date) =>
    `${date.getDate()} ${date.toLocaleString("ru-RU", { month: "long" })}`
  const durationMinutes = end ? Math.round((end.getTime() - start.getTime()) / 60000) : null
  const isLessonUnavailableReason = (reason: VisitCancelReasonEnum | null): boolean =>
    reason === VisitCancelReasonEnum.TEACHER_SICK ||
    reason === VisitCancelReasonEnum.SCHEDULE_CANCELED
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
          canCancelVisit && (
            <>
              <Button
                iconStart={<Trash />}
                variant={ButtonVariant.Neutral}
                onClick={handleDialogOpen}
              >
                Отменить запись
              </Button>
            </>
          )
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
                {selectedVisit.child.parent?.phone
                  ? `+${selectedVisit.child.parent?.phone}`
                  : "Не указан"}
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
              Время: {formatDate(start)}, {formatTimeToUtc5(start)}
              {end ? `–${formatTimeToUtc5(end)}` : ""}
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
          selectedReason === VisitCancelReasonEnum.TEACHER_SICK ||
          selectedReason === VisitCancelReasonEnum.SCHEDULE_CANCELED
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
              disabled={
                selectedReason === VisitCancelReasonEnum.OTHER
                  ? !watch("cancel_comment")
                  : !selectedReason
              }
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
                Время: {formatDate(start)}, {formatTimeToUtc5(start)}
                {end ? `–${formatTimeToUtc5(end)}` : ""}
              </Text>
            </li>
          </ul>
        )}
        <div className={styles.reasonList}>
          {(selectedReason === VisitCancelReasonEnum.GROUP_OVERFLOW ||
            selectedReason === VisitCancelReasonEnum.USER_REQUESTED) && (
            <ReasonOptions
              selectedReason={selectedReason}
              setSelectedReason={setSelectedReason}
              handleCustomReason={handleCustomReason}
            />
          )}

          {selectedReason === null && !customReasonMode && (
            <ReasonOptions
              selectedReason={selectedReason}
              setSelectedReason={setSelectedReason}
              handleCustomReason={handleCustomReason}
            />
          )}
          {customReasonMode && (
            <Textarea
              showErrorText
              label="Причина отмены"
              placeholder="Родитель увидит причину отмены"
              resizeable
              required={!watch("cancel_comment")}
              {...register("cancel_comment", { required: "Причина не может быть пустой" })}
              className={styles.cancelReason}
              error={
                touchedFields.cancel_reason && !watch("cancel_comment")
                  ? "Причина не может быть пустой"
                  : undefined
              }
            />
          )}

          {isLessonUnavailableReason(selectedReason) && (
            <>
              <Text bodySize="medium" className={styles.requiredCancelText}>
                {selectedReason === VisitCancelReasonEnum.TEACHER_SICK
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
                    {formatTimeToUtc5(start)}
                    {end ? `–${formatTimeToUtc5(end)}` : ""}
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
