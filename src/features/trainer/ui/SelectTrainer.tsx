import React, { useMemo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { PopoverSelect, SelectItem } from '@/shared/ui/PopoverSelect/PopoverSelect'
import { useTrainers } from '../model/useTrainers'
import { useAppSelector } from '@/app/config/store'
import { selectCurrentCenter } from '@/entities/center'
import styles from './SelectTrainer.module.scss'
import { User } from '@/shared/assets/svg/User'
import { ChevronDown } from '@/shared/assets/svg/ChevronDown'
import { useSelectManager } from '@/shared/ui/PopoverSelect/useSelectManager'

interface SelectTrainerProps {
  onSelect: (trainerId: number) => void
  selectedTrainerId?: number | string | null
}

export const SelectTrainer: React.FC<SelectTrainerProps> = ({
  onSelect,
  selectedTrainerId = null
}) => {
  const { id } = useAppSelector(selectCurrentCenter)
  const { data: trainers = [], isLoading, isError } = useTrainers(id)
  const { isOpen, toggle, close } = useSelectManager('trainer')

  const options: SelectItem[] = useMemo(
    () =>
      trainers.map((trainer) => ({
        title: trainer.full_name,
        text: '',
        value: trainer.id
      })),
    [trainers]
  )

  const selectedTrainer = trainers.find((t) => t.id === Number(selectedTrainerId))

  const handleSelect = (item: SelectItem) => {
    onSelect(Number(item.value))
    close()
  }

  if (isLoading) return <p>Загрузка...</p>
  if (isError) return <p>Ошибка загрузки тренеров</p>

  return (
    <div className={styles.container}>
      <Input
        placeholder="Не выбран"
        label="Тренер"
        value={selectedTrainer?.full_name ?? ''}
        readOnly
        onClick={toggle}
        leftIcon={<User />}
        rightIcon={<ChevronDown className={styles.chevron + ` ${isOpen ? styles.isOpen : ''}`} />}
      />
      <PopoverSelect
        isOpen={isOpen}
        options={options}
        selectedValue={Number(selectedTrainerId) || null}
        onSelect={handleSelect}
        onClose={() => {}}
      />
    </div>
  )
}
