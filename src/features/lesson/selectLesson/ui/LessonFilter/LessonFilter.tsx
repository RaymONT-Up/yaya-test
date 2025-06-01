import React, { useMemo, useRef, useState } from "react"
import { Menu } from "@/shared/ui/Menu/Menu"
import { useAppSelector } from "@/app/config/store"
import { selectCurrentCenter } from "@/entities/center"
import { SelectItem } from "@/shared/ui/PopoverSelect/PopoverSelect"
import { Filter } from "@/shared/assets/svg/Filter"
import styles from "./LessonFilter.module.scss"
import { useLessons } from "../../model/useLessons"
import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button"
import { Counter, CounterVariant } from "@/shared/ui/Counter/Counter"
import { useClickOutside } from "@/shared/libs/useClickOutside"

interface LessonFilterProps {
  selectedIds: (number | string)[]
  onSelect: (values: (string | number)[]) => void
  selectName: string
  showResetBtn?: boolean
  filterLabel?: string
  counterVariant?: CounterVariant
  showColorMarks?: boolean
}

export const LessonFilter: React.FC<LessonFilterProps> = ({
  selectedIds,
  onSelect,
  showResetBtn = true,
  filterLabel,
  counterVariant = CounterVariant.Default,
  showColorMarks = false
}) => {
  const { id } = useAppSelector(selectCurrentCenter)
  const { data: lessons = [], isLoading, isError } = useLessons(id)
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const toggleSelect = () => {
    setIsOpen((prev) => !prev)
  }
  const selectRef = useRef<HTMLDivElement>(null)
  useClickOutside<HTMLDivElement>({
    ref: selectRef,
    close
  })
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
          </>
        ),
        value: lesson.id,
        color: lesson?.color || undefined
      })),
    [lessons]
  )

  return (
    <div className={styles.filterWrapper} ref={selectRef}>
      <Button
        size={ButtonSize.Small}
        variant={ButtonVariant.Subtle}
        iconStart={<Filter width={16} height={16} />}
        onClick={toggleSelect}
        isIconButton={filterLabel ? false : true}
      >
        {filterLabel}
      </Button>
      {selectedIds.length > 0 && (
        <div className={styles.counterWrapper}>
          {selectedIds.length === lessons.length || selectedIds.length === 0 ? (
            <Counter count={"Все"} variant={counterVariant} size="default" />
          ) : selectedIds.length > 0 && selectedIds.length <= 10 ? (
            <Counter count={selectedIds.length} variant={counterVariant} size="circle" />
          ) : selectedIds.length > 10 ? (
            <Counter count={selectedIds.length} variant={counterVariant} size="default" />
          ) : null}
        </div>
      )}
      <Menu
        showColorMarks={showColorMarks}
        isOpen={isOpen}
        isLoading={isLoading}
        error={isError ? "Ошибка при загрузке списка занятий" : undefined}
        options={options}
        selectedValues={selectedIds}
        onChange={onSelect}
        width="460px"
        onClose={() => {}}
        showSearch
        showResetBtn={showResetBtn}
        selectAllText="Все секции"
      />
    </div>
  )
}
