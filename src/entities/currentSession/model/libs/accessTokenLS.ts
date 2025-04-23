const TOKEN_KEY = 'token'
// Получение токена доступа
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}
// Сохранение токена доступа
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}
