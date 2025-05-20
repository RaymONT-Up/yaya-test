import { useNotifications } from "@/shared/ui/Notification"
import { NotificationVariant } from "@/shared/ui/Notification/ui/Notification/Notification"
import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface ErrorResponse {
  message: string
}

interface NotifyMutationOptions<TData, TVariables, TContext>
  extends UseMutationOptions<TData, AxiosError<ErrorResponse>, TVariables, TContext> {
  notifyOnError?: boolean
}

export const useNotifyMutation = <TData = unknown, TVariables = void, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: NotifyMutationOptions<TData, TVariables, TContext>
): UseMutationResult<TData, AxiosError<ErrorResponse>, TVariables, TContext> => {
  const { addNotification } = useNotifications()
  const shouldNotify = options?.notifyOnError !== false

  return useMutation<TData, AxiosError<ErrorResponse>, TVariables, TContext>({
    ...options,
    mutationFn,
    onError: (error, variables, context) => {
      if (shouldNotify) {
        const message = error.response?.data.message || "Произошла ошибка запроса"
        addNotification({
          variant: NotificationVariant.Danger,
          text: message
        })
      }

      options?.onError?.(error, variables, context)
    }
  })
}
