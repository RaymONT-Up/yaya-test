import { FC } from "react"
import { LoginForm } from "@/features/auth/login"
import { WelcomeLayout } from "@/widgets/layout"
import { WelcomeHeader } from "@/shared/ui/WelcomeHeader/WelcomeHeader"
import { InfoBlock } from "@/shared/ui/InfoBlock/InfoBlock"
import { useSearchParams } from "react-router-dom"
import { Clock } from "@/shared/assets/svg/Clock"
import s from "./LoginPage.module.scss"

const LoginPage: FC = () => {
  const [searchParams] = useSearchParams()
  const sessionExpired = searchParams.get("session_expired") === "true"

  return (
    <WelcomeLayout>
      <title>Yaya for Partners | Войти</title>

      {sessionExpired ? (
        <div className={s.sessionExpired}>
          <InfoBlock text="Пожалуйста, войдите заново." title="Сессия истекла" icon={<Clock />} />
        </div>
      ) : (
        <WelcomeHeader title="Добро пожаловать!" description="Ваш личный кабинет партнера" />
      )}
      <LoginForm />
    </WelcomeLayout>
  )
}
export default LoginPage
