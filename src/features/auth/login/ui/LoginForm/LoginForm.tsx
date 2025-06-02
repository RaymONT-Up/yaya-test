import { FieldError, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "./LoginForm.module.scss"
import { LoginFormValues, schema } from "@/shared/schemes/loginSheme"
import { clearError, loginThunk } from "@/entities/currentSession"
import { useAppDispatch, useAppSelector } from "@/app/config/store"
import { useNavigate } from "react-router-dom"
import { RoutePath } from "@/shared/consts/routerPaths"
import { Input } from "@/shared/ui/Input/Input"
import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button"
import { Text, TextTheme } from "@/shared/ui/Text/Text"
import { AuthErrorMessage } from "@/shared/consts/errorMessages"
import { AlertCircle } from "@/shared/assets/svg/AlertCircle"

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const error = useAppSelector((state) => state.currentSessionSliceReducer.error)

  const onChangeWithClearError = () => {
    if (error) {
      dispatch(clearError())
    }
  }
  const onSubmit = async (data: LoginFormValues) => {
    const result = await dispatch(loginThunk(data))

    if (loginThunk.fulfilled.match(result)) {
      navigate(RoutePath.SELECT_CENTER)
    }
  }
  const isBadRequest = error === AuthErrorMessage.BAD_REQUEST

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          showErrorMessage
          type="text"
          placeholder="Имя пользователя"
          {...register("username")}
          onChange={(e) => {
            onChangeWithClearError()
            register("username").onChange(e)
          }}
          error={errors.username}
        />

        <Input
          showErrorMessage
          type="password"
          placeholder="Пароль"
          {...register("password")}
          onChange={(e) => {
            onChangeWithClearError()
            register("password").onChange(e)
          }}
          error={
            isBadRequest
              ? ({ message: AuthErrorMessage.BAD_REQUEST } as FieldError)
              : errors.password
          }
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
      {error && !isBadRequest && (
        <div className={styles.errorWrapper}>
          {(error === AuthErrorMessage["UNKNOWN"] ||
            error === AuthErrorMessage["SERVER_ERROR"]) && (
            <AlertCircle className={styles.errorIcon} />
          )}
          <Text theme={TextTheme.ERROR}>{error}</Text>
        </div>
      )}
    </div>
  )
}
