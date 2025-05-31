import { Company } from "@/shared/assets/svg/Company"

export enum ErrorCodes {
  UNKNOWN = "UNKNOWN",
  NOT_FOUND = "NOT_FOUND",
  FORBIDDEN = "FORBIDDEN",
  INTERNAL_ERROR = "INTERNAL_ERROR"
}

export const errorConfig = {
  [ErrorCodes.UNKNOWN]: {
    title: "Неизвестная ошибка",
    text: "Произошла неизвестная ошибка. Пожалуйста, попробуйте снова позже.",
    icon: Company
  },
  [ErrorCodes.NOT_FOUND]: {
    title: "Страница не найдена",
    text: "Запрашиваемая страница не существует.",
    icon: Company
  },
  [ErrorCodes.FORBIDDEN]: {
    title: "Доступ запрещен",
    text: "У вас нет доступа к этой странице.",
    icon: Company
  },
  [ErrorCodes.INTERNAL_ERROR]: {
    title: "Ошибка сервера",
    text: "Произошла ошибка на сервере. Попробуйте позже.",
    icon: Company
  }
}

export function mapHttpStatusToErrorCode(status: number): ErrorCodes {
  if (status === 403 || status === 401) {
    return ErrorCodes.FORBIDDEN
  }

  if (status === 404) {
    return ErrorCodes.NOT_FOUND
  }

  if (status >= 500 && status < 600) {
    return ErrorCodes.INTERNAL_ERROR
  }

  return ErrorCodes.UNKNOWN
}
