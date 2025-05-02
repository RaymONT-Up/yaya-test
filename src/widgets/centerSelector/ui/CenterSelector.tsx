import { useEffect, useMemo, useState } from 'react'
import {
  fetchCenters,
  selectCenters,
  selectCenterLoading,
  getCenterId,
  setCenterId,
  selectCenterError
} from '@/entities/center/'
import { PopoverSelect } from '@/shared/ui/PopoverSelect/PopoverSelect'
import styles from './CenterSelector.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/config/store'
import { Text, TextTheme } from '@/shared/ui/Text/Text'
import { DropdownOption } from '@/shared/ui/Dropdown/Dropdown'

interface CenterSelectorProps {
  isOpen: boolean
}

export const CenterSelector: React.FC<CenterSelectorProps> = ({ isOpen }) => {
  const dispatch = useAppDispatch()
  const centers = useAppSelector(selectCenters)
  const error = useAppSelector(selectCenterError)
  const isLoading = useAppSelector(selectCenterLoading)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    if (centers.length === 0) {
      dispatch(fetchCenters())
    }
  }, [dispatch, centers.length])

  useEffect(() => {
    if (centers.length > 0) {
      const savedId = getCenterId()
      const found = centers.find((center) => center.id === savedId)
      setSelectedId(found ? found.id : centers[0].id)
    }
  }, [centers])

  const dropdownOptions = useMemo(() => {
    return centers.map((center) => ({
      label: `${center.name} - ${center.address}`,
      value: center.id
    }))
  }, [centers])

  const handleSelect = (option: DropdownOption) => {
    const selectedId = Number(option.value)
    setSelectedId(selectedId)
    setCenterId(selectedId)
  }

  if (isLoading) return <Text theme={TextTheme.SUCCESS}>Загрузка...</Text>
  if (error) return <Text theme={TextTheme.ERROR}>{error}</Text>

  return (
    <div className={styles.wrapper}>
      {isOpen && (
        <PopoverSelect
          isOpen={isOpen}
          options={dropdownOptions}
          selectedValue={selectedId || null}
          onSelect={handleSelect}
          onClose={() => {}}
        />
      )}
    </div>
  )
}
