import React, { useMemo, useRef, useState } from "react"
import { Input } from "@/shared/ui/Input/Input"
import { PopoverSelect, SelectItem } from "@/shared/ui/PopoverSelect/PopoverSelect"
import { useLessons } from "../model/useLessons"
import { useAppSelector } from "@/app/config/store"
import { selectCurrentCenter } from "@/entities/center"
import styles from "./SelectLesson.module.scss"
import { ChevronDown } from "@/shared/assets/svg/ChevronDown"
import { FieldError } from "react-hook-form"
import { Lesson, LessonTypeEnum } from "@/shared/types/lesson"
import clsx from "clsx"
import { Menu } from "@/shared/ui/Menu/Menu"
import { Clipboard } from "@/shared/assets/svg/Clipboard"
import { useClickOutside } from "@/shared/libs/useClickOutside"

interface SelectLessonProps {
  onSelect: (lesson: Lesson | (string | number)[]) => void
  selectedLessonId?: number | string | null | (number | string)[]
  disabled?: boolean
  error?: FieldError | undefined
  className?: string
  isMultiply?: boolean
  labelText?: string
  showErrorMessage?: boolean
  showInput?: boolean //если инпут не показыватся то Popover или Menu показыаются всегда и видимостью управлять в компоненте который использует SelectLesson
  showResetBtn?: boolean
  selectName: string
  width?: string | number
  height?: string | number
}

const lessonTypeMap = {
  [LessonTypeEnum.OFFLINE]: "Офлайн",
  [LessonTypeEnum.ONLINE]: "Онлайн",
  [LessonTypeEnum.ONLINE_COURSES]: "Онлайн курсы"
}
export const SelectLesson: React.FC<SelectLessonProps> = ({
  onSelect,
  labelText = "Занятие",
  selectedLessonId = null,
  disabled = false,
  error,
  className,
  isMultiply = false,
  showErrorMessage = false,
  showInput = true,
  showResetBtn = false,
  width = "100%",
  height = "360px"
}) => {
  const { id } = useAppSelector(selectCurrentCenter)
  const { data: lessons = [], isError, isLoading } = useLessons(id)
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
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
            {lesson.languages && lesson.languages?.length > 0 && (
              <>
                <span className={styles.dot}></span>
                <span>{lesson?.languages?.join(", ")}</span>
              </>
            )}
            {lesson.level && (
              <>
                <span className={styles.dot}></span>
                <span>{lesson.level}</span>
              </>
            )}
            <span className={styles.dot}></span>
            <span>{lessonTypeMap[lesson.type]}</span>
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

    const parts = [
      lesson.name,
      `${lesson.min_age_str} - ${lesson.max_age_str}`,
      `${lesson.duration} м`
    ]

    if (lesson.languages && lesson.languages.length > 0) {
      parts.push(lesson.languages.join(", "))
    }

    if (lesson.level) {
      parts.push(lesson.level)
    }

    const lessonTypeMap = {
      [LessonTypeEnum.OFFLINE]: "Offline",
      [LessonTypeEnum.ONLINE]: "Online",
      [LessonTypeEnum.ONLINE_COURSES]: "Online Courses"
    }

    parts.push(lessonTypeMap[lesson.type] ?? lesson.type)

    return parts.join(" ∙ ")
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

  const toggleSelect = () => {
    setIsOpen((prev) => !prev)
  }
  const selectLessonRef = useRef<HTMLDivElement>(null)
  useClickOutside<HTMLDivElement>({
    ref: selectLessonRef,
    close: close
  })
  return (
    <div ref={selectLessonRef} className={clsx(styles.container, className)}>
      {showInput && (
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
          onClick={toggleSelect}
          rightIcon={<ChevronDown className={clsx(styles.chevron, isOpen && styles.isOpen)} />}
        />
      )}

      {isMultiply ? (
        <Menu
          error={isError ? "Ошибка при загрузке списка уроков" : undefined}
          isLoading={isLoading}
          showResetBtn={showResetBtn}
          showSearch
          isOpen={isOpen}
          selectedValues={selectedIdsArray}
          options={options}
          onClose={close}
          selectAllText="Все секции"
          onChange={handleSelectMultiple}
          width={width}
          height={height}
          className={styles.menuApaptive}
        />
      ) : (
        <PopoverSelect
          showSearch
          error={isError ? "Ошибка при загрузке списка уроков" : undefined}
          isLoading={isLoading}
          isOpen={isOpen}
          selectedValue={selectedIdsArray[0] || null}
          options={options}
          onClose={close}
          onSelect={handleSelectSingle}
          width={width}
          height={height}
        />
      )}
    </div>
  )
}
