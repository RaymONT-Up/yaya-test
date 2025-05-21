import React, { useState } from "react"
import { Modal } from "@/shared/ui/Modal/Modal"
import { Dialog } from "@/shared/ui/Dialog/Dialog"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Textarea } from "@/shared/ui/Textarea/Textarea"
import { Trash } from "@/shared/assets/svg/Trash"
import { useForm } from "react-hook-form"
import { CancelVisitDto, IVisit } from "@/shared/types/visit"
import styles from "./CancelVisit.module.scss"
import { Text } from "@/shared/ui/Text/Text"
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

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedVisit: IVisit
  handleCancel: (payload: CancelVisitDto) => void
}

interface FormValues {
  cancel_reason: string
}

export const CancelVisit: React.FC<Props> = ({ isOpen, onClose, selectedVisit, handleCancel }) => {
  const [showDialog, setShowDialog] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
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
  }

  const onSubmit = (data: FormValues) => {
    const payload = {
      visit_id: selectedVisit.id,
      cancel_reason: data.cancel_reason
    }
    handleCancel(payload)
    reset()
    setShowDialog(false)
    onClose()
  }
  const birthday = selectedVisit.child.birthday
  const age = getAge(birthday)
  const formattedDate = format(new Date(birthday), "dd MMM yyyy", { locale: ru })
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
              16 Фев, 6:15–7:15{" "}
              <Text fontWeight={400} className={styles.duration}>
                (60мин)
              </Text>
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
        title="Отменить запись?"
        type="default"
        width="466px"
        actions={
          <>
            <Button variant={ButtonVariant.Neutral} onClick={handleDialogClose}>
              Отмена
            </Button>
            <Button
              variant={ButtonVariant.RED}
              iconStart={<Trash color="#fff" />}
              onClick={handleSubmit(onSubmit)}
              disabled={!reason}
            >
              Отменить запись
            </Button>
          </>
        }
      >
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
              Время: 16 февраля, 6:15–7:15
            </Text>
          </li>
        </ul>
        <Textarea
          label="Причина отмены"
          placeholder="Укажите причину"
          resizeable
          {...register("cancel_reason", { required: "Причина не может быть пустой" })}
          error={
            touchedFields.cancel_reason && !reason ? "Причина не может быть пустой" : undefined
          }
          required={!reason}
          showErrorText
          className={styles.cancelReason}
        />
      </Dialog>
    </>
  )
}
