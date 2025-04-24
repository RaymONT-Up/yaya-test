export enum CenterErrorMessage {
  BAD_REQUEST = 'Некорректный запрос к списку центров',
  UNAUTHORIZED = 'Вы не авторизованы для получения списка центров',
  FORBIDDEN = 'Доступ к списку центров запрещён',
  SERVER_ERROR = 'Сервер недоступен, попробуйте позже',
  UNKNOWN = 'Неизвестная ошибка при загрузке центров',
  NETWORK_ERROR = 'Проблема с соединением. Проверьте интернет-соединение'
}

export const centerErrorByStatus: Record<number, CenterErrorMessage> = {
  400: CenterErrorMessage.BAD_REQUEST,
  401: CenterErrorMessage.UNAUTHORIZED,
  403: CenterErrorMessage.FORBIDDEN,
  500: CenterErrorMessage.SERVER_ERROR,
  502: CenterErrorMessage.SERVER_ERROR,
  503: CenterErrorMessage.SERVER_ERROR,
  504: CenterErrorMessage.SERVER_ERROR
}
