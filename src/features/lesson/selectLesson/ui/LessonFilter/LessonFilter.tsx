import React, { useMemo } from "react"
import { Menu } from "@/shared/ui/Menu/Menu"
import { useAppSelector } from "@/app/config/store"
import { selectCurrentCenter } from "@/entities/center"
import { useSelectManager } from "@/shared/ui/PopoverSelect/useSelectManager"
import { SelectItem } from "@/shared/ui/PopoverSelect/PopoverSelect"
import { Filter } from "@/shared/assets/svg/Filter"
import styles from "./LessonFilter.module.scss"
import { useLessons } from "../../model/useLessons"
import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button"
import { Counter, CounterVariant } from "@/shared/ui/Counter/Counter"

interface LessonFilterProps {
  selectedIds: (number | string)[]
  onSelect: (values: (string | number)[]) => void
  selectName: string
  showResetBtn?: boolean
  filterLabel?: string
  counterVariant?: CounterVariant
}

export const LessonFilter: React.FC<LessonFilterProps> = ({
  selectedIds,
  onSelect,
  selectName,
  showResetBtn = true,
  filterLabel,
  counterVariant = CounterVariant.Default
}) => {
  const { id } = useAppSelector(selectCurrentCenter)
  const { data: lessons = [], isLoading, isError } = useLessons(id)
  const { isOpen, toggle } = useSelectManager(selectName)

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
        value: lesson.id
      })),
    [lessons]
  )

  return (
    <div className={styles.filterWrapper}>
      <Button
        size={ButtonSize.Small}
        variant={ButtonVariant.Subtle}
        iconStart={<Filter width={16} height={16} />}
        onClick={toggle}
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
