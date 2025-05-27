import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button"
import styles from "./ReportToolbar.module.scss"
import { Calendar } from "@/shared/assets/svg/Calendar"
import { ChevronDown } from "@/shared/assets/svg/ChevronDown"
import clsx from "clsx"
import { Input } from "@/shared/ui/Input/Input"
import { useAppDispatch, useAppSelector } from "@/app/config/store"
import { useEffect, useMemo, useState } from "react"
import { reportFiltersActions, useReportFilters } from "@/entities/report"
import { endOfMonth, format, startOfMonth, parse } from "date-fns"
import { ru } from "date-fns/locale"
import { useLessons } from "@/features/lesson/selectLesson/model/useLessons"
import { selectCenters, selectCurrentCenter } from "@/entities/center"
import { useTrainers } from "@/features/trainer/model/useTrainers"
import { SelectItem } from "@/shared/ui/PopoverSelect/PopoverSelect"
import { Menu } from "@/shared/ui/Menu/Menu"
import { useDebounce } from "@/shared/libs/useDebounce"

function getInputValue<T extends { id: number; name?: string; full_name?: string }>(
  selectedIds: (string | number)[],
  items: T[] | undefined,
  defaultText: string,
  label: string,
  useFullName = false
): string {
  if (selectedIds.length === 0) return defaultText
  if (selectedIds.length === 1) {
    const id = typeof selectedIds[0] === "string" ? parseInt(selectedIds[0], 10) : selectedIds[0]
    const item = items?.find((i) => i.id === id)
    if (!item) return defaultText
    return useFullName ? item.full_name || defaultText : item.name || defaultText
  }
  return `${label} выбрано: ${selectedIds.length}`
}

export const ReportToolbar = () => {
  const dispatch = useAppDispatch()
  const { id } = useAppSelector(selectCurrentCenter)
  const { date_from, date_to } = useAppSelector(useReportFilters)
  const centerList = useAppSelector(selectCenters)
  const { data: lessons } = useLessons(id)
  const { data: trainers } = useTrainers(id)

  const [selectedCenters, setSelectedCenters] = useState<(string | number)[]>([])
  const [selectedLessons, setSelectedLessons] = useState<(string | number)[]>([])
  const [selectedTrainers, setSelectedTrainers] = useState<(string | number)[]>([])

  const debouncedCenters = useDebounce(selectedCenters, 1000)
  const debouncedLessons = useDebounce(selectedLessons, 1000)
  const debouncedTrainers = useDebounce(selectedTrainers, 1000)

  const [isCenterOpen, setIsCenterOpen] = useState(false)
  const [isSectionOpen, setIsSectionOpen] = useState(false)
  const [isTrainerOpen, setIsTrainerOpen] = useState(false)

  const toggleCenter = () => {
    setIsCenterOpen((prev) => !prev)
    // setIsSectionOpen(false)
    // setIsTrainerOpen(false)
  }
  const toggleSection = () => {
    setIsSectionOpen((prev) => !prev)
    // setIsCenterOpen(false)
    // setIsTrainerOpen(false)
  }
  const toggleTrainer = () => {
    setIsTrainerOpen((prev) => !prev)
    // setIsCenterOpen(false)
    // setIsSectionOpen(false)
  }
  const centerOptions: SelectItem[] = useMemo(
    () =>
      centerList.map((center) => ({
        title: center.address,
        text: "",
        value: center.id
      })),
    [centerList]
  )

  const lessonOptions: SelectItem[] = useMemo(
    () =>
      (lessons ?? []).map((lesson) => ({
        title: lesson.name,
        text: "",
        value: lesson.id
      })),
    [lessons]
  )

  const trainerOptions: SelectItem[] = useMemo(
    () =>
      (trainers ?? []).map((trainer) => ({
        title: trainer.full_name,
        text: "",
        value: trainer.id
      })),
    [trainers]
  )

  const closeCenter = () => setIsCenterOpen(false)
  const closeSection = () => setIsSectionOpen(false)
  const closeTrainer = () => setIsTrainerOpen(false)

  const handleSelectCenters = (values: (string | number)[]) => {
    setSelectedCenters(values)
  }
  const handleSelectLessons = (values: (string | number)[]) => {
    setSelectedLessons(values)
  }
  const handleSelectTrainers = (values: (string | number)[]) => {
    setSelectedTrainers(values)
  }

  const fromDate = date_from ? parse(date_from, "dd.MM.yyyy", new Date()) : null
  const toDate = date_to ? parse(date_to, "dd.MM.yyyy", new Date()) : null

  const formattedDate =
    fromDate && toDate
      ? `${format(fromDate, "dd", { locale: ru })} - ${format(toDate, "dd MMMM, yyyy", { locale: ru })}`
      : "Выберите даты"

  const centerInputValue = getInputValue(
    selectedCenters,
    centerList,
    "Центр музыкального образования",
    "Центров",
    true
  )
  const lessonInputValue = getInputValue(selectedLessons, lessons, "Все секции", "Секций")
  const trainerInputValue = getInputValue(
    selectedTrainers,
    trainers,
    "Выберите тренеров",
    "Тренеров",
    true
  )
  const handleResetFilters = () => {
    setSelectedCenters([])
    setSelectedTrainers([])
    setSelectedLessons([])
    dispatch(reportFiltersActions.resetFilters())
  }

  useEffect(() => {
    const now = new Date()
    const from = startOfMonth(now)
    const to = endOfMonth(now)

    dispatch(reportFiltersActions.setDateFrom(format(from, "dd.MM.yyyy")))
    dispatch(reportFiltersActions.setDateTo(format(to, "dd.MM.yyyy")))
  }, [dispatch])

  useEffect(() => {
    const numericValues = debouncedCenters.map((v) => (typeof v === "string" ? parseInt(v, 10) : v))
    dispatch(reportFiltersActions.setCenters(numericValues))
  }, [debouncedCenters, dispatch])

  useEffect(() => {
    const numericValues = debouncedLessons.map((v) => (typeof v === "string" ? parseInt(v, 10) : v))
    dispatch(reportFiltersActions.setLessons(numericValues))
  }, [debouncedLessons, dispatch])

  useEffect(() => {
    const numericValues = debouncedTrainers.map((v) =>
      typeof v === "string" ? parseInt(v, 10) : v
    )
    dispatch(reportFiltersActions.setTrainers(numericValues))
  }, [debouncedTrainers, dispatch])
  return (
    <div className={styles.reportToolbar}>
      <div className={styles.filters}>
        <div className={styles.datePicker}>
          <Button
            variant={ButtonVariant.Subtle}
            size={ButtonSize.Small}
            iconStart={<Calendar width={16} height={16} />}
          >
            {formattedDate}
          </Button>
        </div>
        <div className={styles.inputWrapper} style={{ position: "relative" }}>
          <Input
            readOnly
            placeholder="Центр музыкального образования"
            value={centerInputValue}
            rightIcon={
              <ChevronDown className={clsx(styles.chevron, { [styles.isOpen]: isCenterOpen })} />
            }
            className={styles.input}
            onClick={toggleCenter}
          />
          <Menu
            showSelectAll={false}
            isOpen={isCenterOpen}
            options={centerOptions}
            selectedValues={selectedCenters || []}
            onClose={closeCenter}
            onChange={handleSelectCenters}
            selectAllText="Все центры"
            width="100%"
            className={styles.centersPopover}
            optionWrapperClassName={styles.centersOptionWrapper}
            showResetBtn={false}
            showSearch={false}
            error={undefined}
            isLoading={false}
          />
        </div>

        <div className={styles.inputWrapper} style={{ position: "relative" }}>
          <Input
            value={lessonInputValue}
            readOnly
            placeholder="Все секции"
            rightIcon={
              <ChevronDown className={clsx(styles.chevron, { [styles.isOpen]: isSectionOpen })} />
            }
            className={styles.input}
            onClick={toggleSection}
          />
          <Menu
            isOpen={isSectionOpen}
            options={lessonOptions}
            selectedValues={selectedLessons || []}
            onClose={closeSection}
            onChange={handleSelectLessons}
            selectAllText="Все секции"
            width="460px"
            className={styles.lessonsPopover}
            optionWrapperClassName={styles.lessonsOptionWrapper}
            showResetBtn={false}
            showSearch={true}
            error={undefined}
            isLoading={false}
          />
        </div>

        <div className={styles.inputWrapper} style={{ position: "relative" }}>
          <Input
            value={trainerInputValue}
            readOnly
            placeholder="Выберите тренеров"
            rightIcon={
              <ChevronDown className={clsx(styles.chevron, { [styles.isOpen]: isTrainerOpen })} />
            }
            className={styles.input}
            onClick={toggleTrainer}
          />
          <Menu
            showSelectAll={false}
            isOpen={isTrainerOpen}
            options={trainerOptions}
            selectedValues={selectedTrainers || []}
            onClose={closeTrainer}
            onChange={handleSelectTrainers}
            selectAllText="Все тренеры"
            className={styles.trainersPopover}
            optionWrapperClassName={styles.trainersOptionWrapper}
            showResetBtn={false}
            showSearch={false}
            error={undefined}
            isLoading={false}
            width="100%"
          />
        </div>

        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Neutral}
          onClick={handleResetFilters}
        >
          Сбросить
        </Button>
      </div>
    </div>
  )
}
