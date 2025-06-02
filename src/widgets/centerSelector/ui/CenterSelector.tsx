import { useEffect, useMemo, useState } from "react"
import {
  fetchCenters,
  selectCenters,
  getCenterId,
  setCenterId,
  selectCenterError,
  centerActions,
  selectCenterLoading
} from "@/entities/center/"
import { PopoverSelect, SelectItem } from "@/shared/ui/PopoverSelect/PopoverSelect"
import styles from "./CenterSelector.module.scss"
import { useAppDispatch, useAppSelector } from "@/app/config/store"

interface CenterSelectorProps {
  isOpen: boolean
  onSelect: () => void
  ref?: React.Ref<HTMLDivElement>
}

export const CenterSelector: React.FC<CenterSelectorProps> = ({ isOpen, onSelect, ref }) => {
  const dispatch = useAppDispatch()
  const centers = useAppSelector(selectCenters)
  const error = useAppSelector(selectCenterError)
  const isLoading = useAppSelector(selectCenterLoading)
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

  return (
    <div ref={ref} className={styles.wrapper}>
      {isOpen && (
        <PopoverSelect
          isLoading={isLoading}
          width={320}
          isOpen={isOpen}
          options={selectOptions}
          selectedValue={selectedId || null}
          onSelect={handleSelect}
          onClose={() => {}}
          error={error ? error : undefined}
        />
      )}
    </div>
  )
}
