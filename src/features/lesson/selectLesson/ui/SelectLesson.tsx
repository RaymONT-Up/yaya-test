import React, { useMemo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { PopoverSelect, SelectItem } from '@/shared/ui/PopoverSelect/PopoverSelect'
import { useLessons } from '../model/useLessons'
import { useAppSelector } from '@/app/config/store'
import { selectCurrentCenter } from '@/entities/center'
import styles from './SelectLesson.module.scss'
import { ChevronDown } from '@/shared/assets/svg/ChevronDown'
import { useSelectManager } from '@/shared/ui/PopoverSelect/useSelectManager'

interface SelectLessonProps {
  onSelect: (lessonId: number) => void
  selectedLessonId?: number | string | null
  disabled?: boolean
}

export const SelectLesson: React.FC<SelectLessonProps> = ({
  onSelect,
  selectedLessonId = null,
  disabled = false
}) => {
  const { id } = useAppSelector(selectCurrentCenter)
  const { data: lessons = [], isLoading, isError } = useLessons(id)
  const { isOpen, toggle, close } = useSelectManager('lesson')

  const options: SelectItem[] = useMemo(
    () =>
      lessons.map((lesson) => ({
        title: lesson.name,
        text: '',
        value: lesson.id
      })),
    [lessons]
  )

  const selectedLesson = lessons.find((l) => l.id === Number(selectedLessonId))

  const handleSelect = (item: SelectItem) => {
    onSelect(Number(item.value))
    close()
  }

  if (isLoading) return <p>Загрузка...</p>
  if (isError) return <p>Ошибка загрузки занятий</p>

  return (
    <div className={styles.container}>
      <Input
        disabled={disabled}
        required
        placeholder="Не выбрано"
        label="Занятие"
        value={selectedLesson?.name ?? ''}
        readOnly
        onClick={toggle}
        rightIcon={<ChevronDown className={`${styles.chevron} ${isOpen ? styles.isOpen : ''}`} />}
      />
      <PopoverSelect
        isOpen={isOpen}
        options={options}
        selectedValue={Number(selectedLessonId) || null}
        onSelect={handleSelect}
        onClose={() => {}}
      />
    </div>
  )
}
