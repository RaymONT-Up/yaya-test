import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './LoginForm.module.scss'
import { LoginFormValues, schema } from '@/shared/schemes/loginSheme'
import { loginThunk } from '@/entities/currentSession'
import { useAppDispatch, useAppSelector } from '@/app/config/store'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@/shared/consts/routerPaths'
import { Input } from '@/shared/ui/Input/Input'
import { Logo } from '@/shared/assets/svg/Logo'
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/Button'
import { Text, TextTheme } from '@/shared/ui/Text/Text'

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
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <h2 className={styles.title}>Добро пожаловать!</h2>
      <Text className={styles.text} theme={TextTheme.DEFAULT}>
        Ваш личный кабинет партнера{' '}
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.field}>
          <Input
            type="text"
            placeholder="Имя пользователя"
            {...register('username')}
            error={errors.username}
          />
        </div>

        <div className={styles.field}>
          <Input
            type="password"
            placeholder="Пароль"
            {...register('password')}
            error={errors.password}
          />
        </div>

        <Button
          type="submit"
          size={ButtonSize.Medium}
          variant={ButtonVariant.Primary}
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
        >
          Войти
        </Button>
        {error && <Text theme={TextTheme.ERROR}>{error}</Text>}
      </form>
    </div>
  )
}
