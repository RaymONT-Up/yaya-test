import { FC } from 'react'
import { LoginForm } from '@/features/auth/login'
import { WelcomeLayout } from '@/widgets/layout'
import { WelcomeHeader } from '@/shared/ui/WelcomeHeader/WelcomeHeader'

export const LoginPage: FC = () => {
  return (
    <WelcomeLayout>
      <WelcomeHeader title="Добро пожаловать!" description="Ваш личный кабинет партнера" />
      <LoginForm />
    </WelcomeLayout>
  )
}
