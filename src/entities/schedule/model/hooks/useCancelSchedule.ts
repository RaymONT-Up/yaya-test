import { useNotifyMutation } from "@/shared/libs/useNotifyMutation"
import { $cancelSchedule } from "@/shared/api/schedule/schedule"
import { CancelScheduleDto, ScheduleEvent } from "@/shared/types/schedule"

interface UseCancelScheduleParams {
  onSuccess: (data: ScheduleEvent) => void
  onError?: (error: unknown) => void
  notifyOnError?: boolean
}

export const useCancelSchedule = ({
  onSuccess,
  onError,
  notifyOnError = true
}: UseCancelScheduleParams) => {
  return useNotifyMutation<ScheduleEvent, CancelScheduleDto>(
    (data) => $cancelSchedule(data).then((res) => res.data),
    {
      onSuccess,
      onError,
      notifyOnError
    }
  )
}
