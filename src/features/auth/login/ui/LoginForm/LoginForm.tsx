import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './LoginForm.module.scss'
import { LoginFormValues, schema } from '@/shared/schemes/loginSheme'
import { loginThunk } from '@/entities/currentSession'
import { useAppDispatch, useAppSelector } from '@/app/config/store'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@/shared/consts/routerPaths'
import { Input } from '@/shared/ui/Input/Input'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const error = useAppSelector((state) => state.currentSessionSliceReducer.error)

  const onSubmit = async (data: LoginFormValues) => {
    const result = await dispatch(loginThunk(data))

    if (loginThunk.fulfilled.match(result)) {
      navigate(RoutePath.MAIN)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <Input
          type="text"
          label="Имя пользователя"
          placeholder="Имя пользователя"
          {...register('username')}
          error={errors.username}
        />
      </div>

      <div className={styles.field}>
        <Input
          type="password"
          label="Пароль"
          placeholder="Пароль"
          {...register('password')}
          error={errors.password}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" disabled={!isValid || isSubmitting} className={styles.button}>
        Войти
      </button>
    </form>
  )
}
