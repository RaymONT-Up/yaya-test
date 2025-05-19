import { useNotifyMutation } from "@/shared/libs/useNotifyMutation"
import { $cancelSchedules } from "@/shared/api/schedule/schedule"
import { CancelScheduleSDto } from "@/shared/types/schedule"

interface UseMassCancelSchedulesParams {
  onSuccess: () => void
  onError?: (error: unknown) => void
  notifyOnError?: boolean
}

export const useMassCancelSchedules = ({
  onSuccess,
  onError,
  notifyOnError = true
}: UseMassCancelSchedulesParams) => {
  return useNotifyMutation<void, CancelScheduleSDto>(
    (data) => $cancelSchedules(data).then((res) => res.data),
    {
      onSuccess: () => onSuccess(),
      onError,
      notifyOnError
    }
  )
}
