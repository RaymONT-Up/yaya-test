import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './LoginForm.module.scss'
import { LoginFormValues, schema } from '@/shared/schemes/loginSheme'
import { loginThunk } from '@/entities/currentSession'
import { useAppDispatch, useAppSelector } from '@/app/config/store'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@/shared/consts/routerPaths'

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
        <input
          type="text"
          {...register('username')}
          placeholder="Имя пользователя"
          className={styles.input}
        />
        {errors.username && <p className={styles.error}>{errors.username.message}</p>}
      </div>

      <div className={styles.field}>
        <input
          type="password"
          {...register('password')}
          placeholder="Пароль"
          className={styles.input}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </div>
      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" disabled={!isValid || isSubmitting} className={styles.button}>
        Войти
      </button>
    </form>
  )
}
