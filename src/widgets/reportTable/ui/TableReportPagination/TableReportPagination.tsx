import { Text } from "@/shared/ui/Text/Text"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ChevronLeft } from "@/shared/assets/svg/ChevronLeft"
import { ChevronRight } from "@/shared/assets/svg/ChevronRight"
import { ChevronDown } from "@/shared/assets/svg/ChevronDown"
import styles from "./TableReportPagination.module.scss"
import clsx from "clsx"
import { Input } from "@/shared/ui/Input/Input"
import { useAppDispatch, useAppSelector } from "@/app/config/store"
import { useReportFilters } from "@/entities/report"
import { reportFiltersActions } from "@/entities/report"
import { PopoverSelect } from "@/shared/ui/PopoverSelect/PopoverSelect"
import { useState } from "react"

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100].map((num) => ({
  title: num.toString(),
  value: num,
  text: undefined
}))

export const TableReportPagination = () => {
  const dispatch = useAppDispatch()
  const { page, page_count, count, page_size } = useAppSelector(useReportFilters)
  const [isOpen, setIsOpen] = useState(false)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= page_count) {
      dispatch(reportFiltersActions.setPage(newPage))
    }
  }
  const handlePageSizeChange = (newSize: number) => {
    dispatch(reportFiltersActions.setPageSize(newSize))
    dispatch(reportFiltersActions.setPage(1))
  }
  const renderPages = () => {
    const pages = []
    const maxVisible = 4
    const showEllipsis = page_count > maxVisible + 1

    for (let i = 1; i <= Math.min(maxVisible, page_count); i++) {
      pages.push(
        <Button
          key={i}
          variant={page === i ? ButtonVariant.Primary : ButtonVariant.Neutral}
          className={styles.paginationBtn}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      )
    }

    if (showEllipsis) {
      pages.push(
        <div key="ellipsis" className={styles.ellipsis}>
          <Text className={styles.ellipsisText}>...</Text>
        </div>
      )
      pages.push(
        <Button
          key={page_count}
          variant={page === page_count ? ButtonVariant.Primary : ButtonVariant.Neutral}
          className={styles.paginationBtn}
          onClick={() => handlePageChange(page_count)}
        >
          {page_count}
        </Button>
      )
    }

    return pages
  }

  if (!count) return null
  return (
    <div className={styles.pagination}>
      <div className={styles.left}>
        <div className={styles.pageSize}>
          <Input
            readOnly
            value={page_size}
            rightIcon={
              <ChevronDown className={clsx(styles.chevron, { [styles.isOpen]: isOpen })} />
            }
            className={styles.input}
            onClick={() => setIsOpen((prev) => !prev)}
          />
          <PopoverSelect
            className={styles.pageSizePopover}
            optionWrapperClassName={styles.pageSizeOptions}
            isOpen={isOpen}
            onClose={() => setIsOpen((prev) => !prev)}
            options={PAGE_SIZE_OPTIONS}
            selectedValue={page_size}
            onSelect={(option) => handlePageSizeChange(Number(option.value))}
          />
        </div>

        <Text className={styles.paginationText}>
          Показано {page_size < count ? page_size : count} из {count}
        </Text>
      </div>
      <div className={styles.right}>
        <Button
          isIconButton
          variant={ButtonVariant.Subtle}
          iconEnd={<ChevronLeft color="#262527" width={16} height={16} />}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={styles.iconBtn}
        />
        {renderPages()}
        <Button
          isIconButton
          variant={ButtonVariant.Subtle}
          iconEnd={<ChevronRight color="#262527" width={16} height={16} />}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === page_count}
          className={styles.iconBtn}
        />
      </div>
    </div>
  )
}
