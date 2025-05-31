import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button"
import styles from "./ReportToolbar.module.scss"
import { Calendar } from "@/shared/assets/svg/Calendar"
import { ChevronDown } from "@/shared/assets/svg/ChevronDown"
import clsx from "clsx"
import { Input } from "@/shared/ui/Input/Input"
import { useAppDispatch, useAppSelector } from "@/app/config/store"
import { useCallback, useEffect, useMemo, useState } from "react"
import { reportFiltersActions, useDownloadReport, useReportFilters } from "@/entities/report"
import { endOfMonth, format, startOfMonth, parse } from "date-fns"
import { ru } from "date-fns/locale"
import { selectCenters, selectCurrentCenter } from "@/entities/center"
import { Menu, SelectItem } from "@/shared/ui/Menu/Menu"
import { useDebounce } from "@/shared/libs/useDebounce"
import { Download } from "@/shared/assets/svg/Download"
import { useLessonsForCenters } from "@/features/lesson/selectLesson"
import { useTrainersForCenters } from "@/features/trainer"
import { Tooltip } from "@/shared/ui/Tooltip/Tooltip"
import { Text } from "@/shared/ui/Text/Text"
import { CustomDatePicker } from "@/shared/ui/CustomDatePicker/CustomDatePicker"

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
  const { name, id } = useAppSelector(selectCurrentCenter)
  const { date_from, date_to, centers } = useAppSelector(useReportFilters)
  const centerList = useAppSelector(selectCenters)
  const { data: lessons } = useLessonsForCenters(centers)
  const { data: trainers } = useTrainersForCenters(centers)

  const [selectedCenters, setSelectedCenters] = useState<(string | number)[]>([])
  const [selectedLessons, setSelectedLessons] = useState<(string | number)[]>([])
  const [selectedTrainers, setSelectedTrainers] = useState<(string | number)[]>([])

  const debouncedCenters = useDebounce(selectedCenters, 1000)
  const debouncedLessons = useDebounce(selectedLessons, 1000)
  const debouncedTrainers = useDebounce(selectedTrainers, 1000)

  const [isCenterOpen, setIsCenterOpen] = useState(false)
  const [isSectionOpen, setIsSectionOpen] = useState(false)
  const [isTrainerOpen, setIsTrainerOpen] = useState(false)

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null])

  const { mutate: downloadFile } = useDownloadReport(id)
  const handleReportDownload = async () => {
    downloadFile({
      date_from,
      date_to,
      lessons: selectedLessons.map((l) => (typeof l === "string" ? parseInt(l, 10) : l)),
      trainers: selectedTrainers.map((t) => (typeof t === "string" ? parseInt(t, 10) : t))
    })
  }
  const toggleDatePicker = () => setShowDatePicker((prev) => !prev)

  const handleRangeSelect = (dates: [Date | null, Date | null]) => {
    setRange(dates)

    const [start, end] = dates
    if (start && end) {
      dispatch(reportFiltersActions.setDateFrom(format(start, "dd.MM.yyyy")))
      dispatch(reportFiltersActions.setDateTo(format(end, "dd.MM.yyyy")))
      setShowDatePicker(false)
    }
  }

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
        title: center.name,
        text: <Text className={styles.centerFilterText}> {center.address}</Text>,
        value: center.id
      })),
    [centerList]
  )

  const getCenterAddressById = useCallback(
    (id: number) => {
      const center = centerList.find((c) => c.id === id)
      return center ? center.address : ""
    },
    [centerList]
  )
  const lessonOptions: SelectItem[] = useMemo(
    () =>
      (lessons ?? []).map((lesson) => ({
        title: lesson.name,
        text: (
          <>
            <span>
              {lesson.min_age_str} - {lesson.max_age_str}
            </span>
            <span className={styles.dot}></span>
            <span>{lesson.duration} мин</span>
            {lesson.languages && lesson.languages?.length > 0 && (
              <>
                <span className={styles.dot}></span>
                <span>{lesson?.languages?.join(", ")}</span>
              </>
            )}
            {lesson.level && (
              <>
                <span className={styles.dot}></span>
                <span>{lesson.level}</span>
              </>
            )}
          </>
        ),
        value: lesson.id,
        titleComponent: (
          <div>
            {lesson.name} -{" "}
            <Text className={styles.centerName}>{getCenterAddressById(lesson.center_id)}</Text>{" "}
          </div>
        )
      })),
    [lessons, getCenterAddressById]
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

  const centerInputValue = getInputValue(selectedCenters, centerList, name, "Центров", true)
  const lessonInputValue = getInputValue(selectedLessons, lessons, "Все секции", "Секций")
  const trainerInputValue = getInputValue(
    selectedTrainers,
    trainers,
    "Все тренера",
    "Тренеров",
    true
  )
  const handleResetFilters = () => {
    setSelectedCenters([])
    setSelectedTrainers([])
    setSelectedLessons([])
    setRange([null, null])
    dispatch(reportFiltersActions.resetFilters())
  }

  // Изначально выбираются все центры, если они есть
  useEffect(() => {
    if (centerList.length) {
      setSelectedCenters(centerList.map((center) => center.id))
    }
  }, [centerList])
  // Изначально выбирается текущая неделя
  useEffect(() => {
    const now = new Date()
    const from = startOfMonth(now)
    const to = endOfMonth(now)

    dispatch(reportFiltersActions.setDateFrom(format(from, "dd.MM.yyyy")))
    dispatch(reportFiltersActions.setDateTo(format(to, "dd.MM.yyyy")))
  }, [dispatch])

  // Диспатчим выбранные значения в стор при изменении с дебаунсом
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
            onClick={toggleDatePicker}
          >
            {formattedDate}
          </Button>
          {showDatePicker && (
            <div className={styles.pickerWrapper}>
              <CustomDatePicker
                selectsRange
                startDate={range[0]}
                endDate={range[1]}
                onChange={handleRangeSelect}
                inline
              />
            </div>
          )}
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
            isOpen={isCenterOpen}
            options={centerOptions}
            selectedValues={selectedCenters || []}
            onClose={closeCenter}
            onChange={handleSelectCenters}
            selectAllText="Все центры"
            width="460px"
            className={styles.centersPopover}
            optionWrapperClassName={styles.centersOptionWrapper}
            showResetBtn
            showSearch={true}
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
            showResetBtn
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
            showSelectAll={true}
            isOpen={isTrainerOpen}
            options={trainerOptions}
            selectedValues={selectedTrainers || []}
            onClose={closeTrainer}
            onChange={handleSelectTrainers}
            selectAllText="Все тренеры"
            className={styles.trainersPopover}
            optionWrapperClassName={styles.trainersOptionWrapper}
            showResetBtn={true}
            showSearch={true}
            error={undefined}
            isLoading={false}
            width="460px"
          />
        </div>

        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Neutral}
          onClick={handleResetFilters}
        >
          Сбросить
        </Button>

        {/* Файл с сервера буду получать */}
        <div className={styles.downloadButtonWrapper}>
          <Tooltip
            className={styles.downloadTooltip}
            maxWidth={330}
            text={<div>Сформируем Excel отчет с данными в соответствии с выбранными фильтрами</div>}
            position="left"
          >
            <Button
              size={ButtonSize.Small}
              variant={ButtonVariant.Primary}
              className={styles.downloadButton}
              iconStart={<Download width={16} height={16} />}
              onClick={handleReportDownload}
            >
              Скачать отчёт
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
