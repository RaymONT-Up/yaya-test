import { z } from 'zod'

export const schema = z.object({
  username: z.string().min(1, 'Поле обязательно для заполнения'),
  // валидацию на email пока убрал, так как вход по username
  // .email('Введите корректный email')
  password: z
    .string()
    .min(1, 'Поле обязательно для заполнения')

    .min(6, 'Пароль должен быть не менее 6 символов')
    .regex(
      /^[a-zA-Z0-9!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]*$/,
      'Пароль содержит недопустимые символы'
    )
})

export type LoginFormValues = z.infer<typeof schema>
