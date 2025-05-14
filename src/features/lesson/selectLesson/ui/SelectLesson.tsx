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
import { Menu } from "@/shared/ui/Menu/Menu"
import { Clipboard } from "@/shared/assets/svg/Clipboard"

interface SelectLessonProps {
  onSelect: (lesson: Lesson | (string | number)[]) => void
  selectedLessonId?: number | string | null | (number | string)[]
  disabled?: boolean
  error?: FieldError | undefined
  className?: string
  isMultiply?: boolean
  labelText?: string
  showErrorMessage?: boolean
}

export const SelectLesson: React.FC<SelectLessonProps> = ({
  onSelect,
  labelText = "Занятие",
  selectedLessonId = null,
  disabled = false,
  error,
  className,
  isMultiply = false,
  showErrorMessage = false
}) => {
  const { id } = useAppSelector(selectCurrentCenter)
  const { data: lessons = [], isError } = useLessons(id)
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

  const selectedIdsArray = useMemo(() => {
    if (Array.isArray(selectedLessonId)) return selectedLessonId
    return selectedLessonId !== null ? [selectedLessonId] : []
  }, [selectedLessonId])

  const selectedLessons = lessons.filter((l) => selectedIdsArray.includes(l.id))

  const valueParts = useMemo(() => {
    if (isMultiply) {
      return selectedLessons.length ? `Выбрано секций: ${selectedLessons.length}` : ""
    }

    const lesson = selectedLessons[0]
    if (!lesson) return ""

    return `${lesson.name} (${lesson.min_age_str}-${lesson.max_age_str}, ${lesson.duration}м)`
  }, [isMultiply, selectedLessons])

  const handleSelectSingle = (item: SelectItem) => {
    const lesson = lessons.find((l) => l.id === Number(item.value))
    if (lesson) {
      onSelect(lesson)
      close()
    }
  }

  const handleSelectMultiple = (values: (string | number)[]) => {
    onSelect(values)
  }

  // if (isLoading) return <p>Загрузка...</p>
  if (isError) return <p>Ошибка загрузки занятий</p>

  return (
    <div className={clsx(styles.container, className)}>
      <Input
        showErrorMessage={showErrorMessage}
        leftIcon={<Clipboard />}
        error={error}
        disabled={disabled}
        required={!selectedIdsArray.length}
        placeholder="Не выбрано"
        label={labelText}
        value={valueParts}
        readOnly
        onClick={toggle}
        rightIcon={<ChevronDown className={clsx(styles.chevron, isOpen && styles.isOpen)} />}
      />

      {isMultiply ? (
        <Menu
          showSearch
          isOpen={isOpen}
          selectedValues={selectedIdsArray}
          options={options}
          onClose={close}
          onChange={handleSelectMultiple}
          width="100%"
        />
      ) : (
        <PopoverSelect
          showSearch
          isOpen={isOpen}
          selectedValue={selectedIdsArray[0] || null}
          options={options}
          onClose={close}
          onSelect={handleSelectSingle}
          width="100%"
        />
      )}
    </div>
  )
}
