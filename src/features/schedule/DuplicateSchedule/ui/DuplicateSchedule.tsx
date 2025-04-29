import { useForm, Controller } from 'react-hook-form'
import clsx from 'clsx'
import styles from './DuplicateSchedule.module.scss'
import { Button } from '@/shared/ui/Button'

interface DuplicateScheduleFormValues {
  mode: 'day' | 'week'
  from: string
  to: string
  sections: string[]
}

interface DuplicateScheduleProps {
  className?: string
  onSubmit: (data: DuplicateScheduleFormValues) => void
}

export const DuplicateSchedule = ({ className, onSubmit }: DuplicateScheduleProps) => {
  const { control, handleSubmit, setValue, watch } = useForm<DuplicateScheduleFormValues>({
    defaultValues: {
      mode: 'day',
      from: '',
      to: '',
      sections: ['all'] // пока все выбраны
    }
  })

  const mode = watch('mode')

  const handleModeChange = (value: 'day' | 'week') => {
    setValue('mode', value)
  }

  const submitHandler = (data: DuplicateScheduleFormValues) => {
    onSubmit(data)
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={clsx(styles.duplicateSchedule, className)}
    >
      <div className={styles.modeSwitcher}>
        <button
          type="button"
          className={clsx(styles.modeButton, { [styles.active]: mode === 'day' })}
          onClick={() => handleModeChange('day')}
        >
          День
        </button>
        <button
          type="button"
          className={clsx(styles.modeButton, { [styles.active]: mode === 'week' })}
          onClick={() => handleModeChange('week')}
        >
          Неделя
        </button>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Промежуток дублирования</label>
        <div className={styles.dateInputs}>
          <Controller
            control={control}
            name="from"
            render={({ field }) => <input type="date" {...field} className={styles.input} />}
          />
          <span className={styles.separator}>—</span>
          <Controller
            control={control}
            name="to"
            render={({ field }) => <input type="date" {...field} className={styles.input} />}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Секции для дублирования</label>
        <div className={styles.sectionsPlaceholder}>Все секции выбраны</div>
      </div>

      <Button type="submit" className={styles.submitButton}>
        Дублировать
      </Button>
    </form>
  )
}
