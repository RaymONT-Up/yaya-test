import React from 'react'
import { Text, TextVariant } from '@/shared/ui/Text/Text'
import styles from './SelectLesson.module.scss'
import { useLessons } from '../model/useLessons'

interface SelectLessonProps {
  onSelect: (lessonId: number) => void
  selectedLessonId?: number | null
  disabled?: boolean
}

export const SelectLesson: React.FC<SelectLessonProps> = ({
  onSelect,
  selectedLessonId = null,
  disabled = false
}) => {
  const { data: lessons, isLoading, isError } = useLessons()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(Number(event.target.value))
  }

  if (isLoading) return <p>Загрузка...</p>
  if (isError) return <p>Ошибка загрузки занятий</p>

  return (
    <div className={styles.container}>
      <Text variant={TextVariant.HEADING} headingLevel="h7">
        Выберите занятие
      </Text>
      <div className={styles.lessonList}>
        <select
          onChange={handleChange}
          className={styles.select}
          value={selectedLessonId ?? ''}
          disabled={disabled}
        >
          <option value="">-- Выберите занятие --</option>
          {lessons?.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
