import React, { useMemo, useRef, useState } from "react"
import { Input } from "@/shared/ui/Input/Input"
import { PopoverSelect, SelectItem } from "@/shared/ui/PopoverSelect/PopoverSelect"
import { useTrainers } from "../model/useTrainers"
import { useAppSelector } from "@/app/config/store"
import { selectCurrentCenter } from "@/entities/center"
import styles from "./SelectTrainer.module.scss"
import { User } from "@/shared/assets/svg/User"
import { ChevronDown } from "@/shared/assets/svg/ChevronDown"
import { useClickOutside } from "@/shared/libs/useClickOutside"

interface SelectTrainerProps {
  onSelect: (trainerId: number) => void
  selectedTrainerId?: number | string | null
}

export const SelectTrainer: React.FC<SelectTrainerProps> = ({
  onSelect,
  selectedTrainerId = null
}) => {
  const { id } = useAppSelector(selectCurrentCenter)
  const { data: trainers = [], isLoading } = useTrainers(id)
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  const options: SelectItem[] = useMemo(
    () =>
      trainers.map((trainer) => ({
        title: trainer.full_name,
        text: "",
        value: trainer.id
      })),
    [trainers]
  )

  const selectedTrainer = trainers.find((t) => t.id === Number(selectedTrainerId))

  const handleSelect = (item: SelectItem) => {
    onSelect(Number(item.value))
    close()
  }

  const toggleSelect = () => {
    setIsOpen((prev) => !prev)
  }
  const selectRef = useRef<HTMLDivElement>(null)
  useClickOutside<HTMLDivElement>({
    ref: selectRef,
    close
  })

  return (
    <div ref={selectRef} className={styles.container}>
      <Input
        placeholder="Не выбран"
        label="Тренер"
        value={selectedTrainer?.full_name ?? ""}
        readOnly
        onClick={toggleSelect}
        leftIcon={<User />}
        rightIcon={<ChevronDown className={styles.chevron + ` ${isOpen ? styles.isOpen : ""}`} />}
      />
      <PopoverSelect
        isLoading={isLoading}
        isOpen={isOpen}
        options={options}
        selectedValue={Number(selectedTrainerId) || null}
        onSelect={handleSelect}
        onClose={() => {}}
      />
    </div>
  )
}
