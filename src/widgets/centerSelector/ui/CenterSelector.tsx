import { useEffect, useMemo, useState } from 'react'
import {
  fetchCenters,
  selectCenters,
  selectCenterLoading,
  getCenterId,
  setCenterId,
  selectCenterError
} from '@/entities/center/'
import { Dropdown, DropdownOption } from '@/shared/ui/Dropdown/Dropdown'
import styles from './CenterSelector.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/config/store'
import { Text, TextTheme } from '@/shared/ui/Text/Text'

export const CenterSelector = () => {
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

  const dropdownOptions: DropdownOption[] = useMemo(() => {
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
      {dropdownOptions.length > 0 && (
        <Dropdown
          options={dropdownOptions}
          defaultValue={selectedId || undefined}
          onSelect={handleSelect}
        />
      )}
    </div>
  )
}
