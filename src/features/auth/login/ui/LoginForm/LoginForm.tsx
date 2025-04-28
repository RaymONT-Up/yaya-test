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
import { Text, TextTheme, TextVariant } from '@/shared/ui/Text/Text'
import { AuthErrorMessage } from '@/shared/consts/errorMessages'
import { AlertCircle } from '@/shared/assets/svg/AlertCircle'

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
      <Text variant={TextVariant.HEADING} headingLevel="h6" className={styles.title}>
        Добро пожаловать!
      </Text>
      <Text bodySize="medium" className={styles.text}>
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
      </form>
      {error && (
        <div className={styles.errorWrapper}>
          {(error === AuthErrorMessage['UNKNOWN'] ||
            error === AuthErrorMessage['SERVER_ERROR']) && (
            <AlertCircle className={styles.errorIcon} />
          )}
          <Text theme={TextTheme.ERROR}>{error}</Text>
        </div>
      )}
    </div>
  )
}
