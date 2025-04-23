import { z } from 'zod'

export const schema = z.object({
  username: z.string().min(1, 'Имя пользователя обязательно'),
  password: z.string().min(1, 'Пароль обязателен')
})
export type LoginFormValues = z.infer<typeof schema>
