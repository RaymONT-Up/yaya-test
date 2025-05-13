import React, { useMemo } from "react"
import { Input } from "@/shared/ui/Input/Input"
import { PopoverSelect, SelectItem } from "@/shared/ui/PopoverSelect/PopoverSelect"
import { useLessons } from "../model/useLessons"
import { useAppSelector } from "@/app/config/store"
import { selectCurrentCenter } from "@/entities/center"
import styles from "./SelectLesson.module.scss"
import { ChevronDown } from "@/shared/assets/svg/ChevronDown"
import { useSelectManager } from "@/shared/ui/PopoverSelect/useSelectManager"
import { FieldError } from "react-hook-form"
import { Lesson } from "@/shared/types/lesson"
import clsx from "clsx"

interface SelectLessonProps {
  onSelect: (lesson: Lesson) => void
  selectedLessonId?: number | string | null
  disabled?: boolean
  error?: FieldError | undefined
  className?: string
}

export const SelectLesson: React.FC<SelectLessonProps> = ({
  onSelect,
  selectedLessonId = null,
  disabled = false,
  error,
  className
}) => {
  const { id } = useAppSelector(selectCurrentCenter)
  const { data: lessons = [], isLoading, isError } = useLessons(id)
  const { isOpen, toggle, close } = useSelectManager("lesson")

  const options: SelectItem[] = useMemo(
    () =>
      lessons.map((lesson) => ({
        title: lesson.name,
        text: (
          <>
            <span>
              {lesson.min_age_str} - {lesson.max_age_str}
            </span>
            <span className={styles.dot}></span>
            <span>{lesson.duration} мин</span>
            {lesson.language && (
              <>
                <span className={styles.dot}></span>
                <span>{lesson.language}</span>
              </>
            )}

            {lesson.level && (
              <>
                <span className={styles.dot}></span>
                <span>{lesson.level}</span>
              </>
            )}
          </>
        ),
        value: lesson.id
      })),
    [lessons]
  )

  const selectedLesson = lessons.find((l) => l.id === Number(selectedLessonId))
  const valueParts = useMemo(() => {
    if (!selectedLesson) return ""
    const parts = [
      selectedLesson.name,
      `${selectedLesson.min_age_str} - ${selectedLesson.max_age_str}`,
      `${selectedLesson.duration} м`,
      selectedLesson.language,
      selectedLesson.level
    ].filter(Boolean)
    return parts.join(" ∙ ")
  }, [selectedLesson])
  const handleSelect = (item: SelectItem) => {
    const lesson = lessons.find((l) => l.id === Number(item.value))
    if (lesson) {
      onSelect(lesson)
      close()
    }
  }

  if (isLoading) return <p>Загрузка...</p>
  if (isError) return <p>Ошибка загрузки занятий</p>

  return (
    <div className={clsx(styles.container, className)}>
      <Input
        error={error ? error : undefined}
        disabled={disabled}
        required={!selectedLessonId}
        placeholder="Не выбрано"
        label="Занятие"
        value={valueParts}
        readOnly
        onClick={toggle}
        rightIcon={<ChevronDown className={`${styles.chevron} ${isOpen ? styles.isOpen : ""}`} />}
      />
      <PopoverSelect
        isOpen={isOpen}
        options={options}
        selectedValue={Number(selectedLessonId) || null}
        onSelect={handleSelect}
        onClose={() => {}}
        width={"100%"}
      />
    </div>
  )
}
