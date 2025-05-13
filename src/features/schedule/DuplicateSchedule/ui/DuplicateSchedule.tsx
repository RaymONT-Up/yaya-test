import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import styles from "./DuplicateSchedule.module.scss"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { DaySelect } from "@/shared/ui/DaySelect/DaySelect"
import { SelectLesson } from "@/features/lesson/selectLesson"
import { Lesson } from "@/shared/types/lesson"
import { Dialog } from "@/shared/ui/Dialog/Dialog"
import { Tabs } from "@/shared/ui/Tab/Tab"
import { SelectDays } from "@/shared/ui/SelectDays/SelectDays"

interface Props {
  isOpen: boolean
  onClose: () => void
}

interface FormValues {
  lesson_ids: number[]
  source_date: Date
  target_dates: Date[]
}

export const DuplicateSchedule: React.FC<Props> = ({ isOpen = false, onClose }) => {
  const [mode, setMode] = useState<"day" | "week">("day")

  const { register, handleSubmit, setValue, watch, control } = useForm<FormValues>({
    defaultValues: {
      lesson_ids: [],
      source_date: undefined,
      target_dates: []
    }
  })

  const onSubmit = () => {
    console.log("Режим:", mode)
  }

  const handleLessonSelect = (selectedLessons: Lesson | (string | number)[]) => {
    if (Array.isArray(selectedLessons)) {
      setValue("lesson_ids", selectedLessons.map(Number))
    }
  }

  return (
    <Dialog
      title="Дублирование расписания"
      isOpen={isOpen}
      onClose={onClose}
      actions={
        <>
          <Button variant={ButtonVariant.Neutral} type="button" onClick={onClose}>
            Закрыть
          </Button>
          <Button onClick={handleSubmit(onSubmit)} type="submit" loading={false}>
            Дублировать расписание
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.modeSelect}>
          <Tabs
            items={[
              { title: "День", isActive: mode === "day", onClick: () => setMode("day") },
              { title: "Неделя", isActive: mode === "week", onClick: () => setMode("week") }
            ]}
            className={styles.tabs}
          />
        </div>

        <div className={styles.gridContainer}>
          <SelectLesson
            {...register("lesson_ids", { required: "Выберите занятие" })}
            selectedLessonId={watch("lesson_ids")}
            onSelect={handleLessonSelect}
            isMultiply
            className={styles.selectLesson}
            labelText="Секция"
          />
          <div className={styles.gridRow}>
            <Controller
              control={control}
              name="source_date"
              rules={{ required: "Выберите дату источника" }}
              render={({ field }) => (
                <DaySelect
                  required
                  label="Дублировать этот день"
                  value={field.value}
                  onChange={field.onChange}
                  minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                />
              )}
            />

            <Controller
              control={control}
              name="target_dates"
              rules={{ required: "Выберите целевые даты" }}
              render={({ field }) => (
                <SelectDays
                  required
                  label="На день/дни"
                  value={field.value}
                  onChange={field.onChange}
                  minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                />
              )}
            />
          </div>
        </div>
      </form>
    </Dialog>
  )
}
