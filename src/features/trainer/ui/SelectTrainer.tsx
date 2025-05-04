import React from 'react'
import { Text, TextVariant } from '@/shared/ui/Text/Text'
import styles from './SelectTrainer.module.scss'
import { useTrainers } from '../model/useTrainers'

interface SelectTrainerProps {
  onSelect: (trainerId: number) => void
  selectedTrainerId?: string | number | null
}

export const SelectTrainer: React.FC<SelectTrainerProps> = ({
  onSelect,
  selectedTrainerId = null
}) => {
  const { data: trainers, isLoading, isError } = useTrainers()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(Number(event.target.value))
  }

  if (isLoading) return <p>Загрузка...</p>
  if (isError) return <p>Ошибка загрузки тренеров</p>

  return (
    <div className={styles.container}>
      <Text variant={TextVariant.HEADING} headingLevel="h7">
        Выберите тренера
      </Text>
      <div className={styles.trainerList}>
        <select onChange={handleChange} className={styles.select} value={selectedTrainerId ?? ''}>
          <option value="">-- Выберите тренера --</option>
          {trainers?.map((trainer) => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.full_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
