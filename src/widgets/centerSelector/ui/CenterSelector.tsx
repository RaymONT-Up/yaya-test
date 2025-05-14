import { useEffect, useMemo, useState } from "react"
import {
  fetchCenters,
  selectCenters,
  getCenterId,
  setCenterId,
  selectCenterError,
  centerActions
} from "@/entities/center/"
import { PopoverSelect, SelectItem } from "@/shared/ui/PopoverSelect/PopoverSelect"
import styles from "./CenterSelector.module.scss"
import { useAppDispatch, useAppSelector } from "@/app/config/store"
import { Text, TextTheme } from "@/shared/ui/Text/Text"

interface CenterSelectorProps {
  isOpen: boolean
  onSelect: () => void
}

export const CenterSelector: React.FC<CenterSelectorProps> = ({ isOpen, onSelect }) => {
  const dispatch = useAppDispatch()
  const centers = useAppSelector(selectCenters)
  const error = useAppSelector(selectCenterError)
  // const isLoading = useAppSelector(selectCenterLoading)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    if (centers.length === 0) {
      dispatch(fetchCenters())
    }
    if (centers.length > 0) {
      const savedId = getCenterId()
      const found = centers.find((center) => center.id === savedId)
      if (found) {
        setSelectedId(found.id)
        dispatch(centerActions.setCurrentCenter(found))
      }
    }
  }, [dispatch, centers])

  const selectOptions = useMemo(() => {
    return centers.map((center) => ({
      value: center.id,
      title: center.name,
      text: center.address
    }))
  }, [centers])

  const handleSelect = (option: SelectItem) => {
    const selectedId = Number(option.value)
    setSelectedId(selectedId)
    setCenterId(selectedId)
    const center = centers.find((center) => center.id === selectedId)
    if (center) {
      dispatch(centerActions.setCurrentCenter(center))
    }
    onSelect()
  }
  // if (isLoading) return <Text theme={TextTheme.SUCCESS}>Загрузка...</Text>
  if (error) return <Text theme={TextTheme.ERROR}>{error}</Text>

  return (
    <div className={styles.wrapper}>
      {isOpen && (
        <PopoverSelect
          width={320}
          isOpen={isOpen}
          options={selectOptions}
          selectedValue={selectedId || null}
          onSelect={handleSelect}
          onClose={() => {}}
        />
      )}
    </div>
  )
}
