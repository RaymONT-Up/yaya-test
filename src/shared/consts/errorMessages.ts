export enum AuthErrorMessage {
  BAD_REQUEST = 'Некорректный запрос: проверьте введённые данные',
  UNAUTHORIZED = 'Неправильный логин или пароль',
  FORBIDDEN = 'Ваш аккаунт заблокирован, обратитесь в поддержку',
  SERVER_ERROR = 'Сервер временно недоступен, попробуйте позже',
  UNKNOWN = 'Неизвестная ошибка'
}
export const authErrorByStatus: Record<number, AuthErrorMessage> = {
  400: AuthErrorMessage.BAD_REQUEST,
  401: AuthErrorMessage.UNAUTHORIZED,
  403: AuthErrorMessage.FORBIDDEN,
  500: AuthErrorMessage.SERVER_ERROR,
  502: AuthErrorMessage.SERVER_ERROR,
  503: AuthErrorMessage.SERVER_ERROR,
  504: AuthErrorMessage.SERVER_ERROR
}
