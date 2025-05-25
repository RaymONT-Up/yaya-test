import { useNotifyMutation } from "@/shared/libs/useNotifyMutation"
import { $cancelSchedule } from "@/shared/api/schedule/schedule"
import { CancelScheduleDto, ScheduleEvent } from "@/shared/types/schedule"
import { queryClient } from "@/main"
import { VISITS_QUERY_KEY } from "@/entities/visit"

interface UseCancelScheduleParams {
  onSuccess: (data: ScheduleEvent) => void
  onError?: (error: unknown) => void
  notifyOnError?: boolean
  invalidateVisits?: boolean
}

export const useCancelSchedule = ({
  onSuccess,
  onError,
  notifyOnError = true,
  invalidateVisits = false
}: UseCancelScheduleParams) => {
  return useNotifyMutation<ScheduleEvent, CancelScheduleDto>(
    (data) => $cancelSchedule(data).then((res) => res.data),
    {
      onSuccess: (data) => {
        if (invalidateVisits) {
          queryClient.invalidateQueries({ queryKey: [VISITS_QUERY_KEY] })
        }
        onSuccess(data)
      },
      onError,
      notifyOnError
    }
  )
}
