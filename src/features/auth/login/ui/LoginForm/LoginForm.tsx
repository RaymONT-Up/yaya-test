import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './LoginForm.module.scss'
import { LoginFormValues, schema } from '@/shared/schemes/loginSheme'
import { loginThunk } from '@/entities/currentSession'
import { useAppDispatch, useAppSelector } from '@/app/config/store'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@/shared/consts/routerPaths'
import { Input } from '@/shared/ui/Input/Input'
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/Button'
import { Text, TextTheme } from '@/shared/ui/Text/Text'
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
      navigate(RoutePath.SELECT_CENTER)
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          type="text"
          placeholder="Имя пользователя"
          {...register('username')}
          error={errors.username}
        />

        <Input
          type="password"
          placeholder="Пароль"
          {...register('password')}
          error={errors.password}
        />

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
