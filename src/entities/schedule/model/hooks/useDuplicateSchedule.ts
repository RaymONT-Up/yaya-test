import { useNotifyMutation } from "@/shared/libs/useNotifyMutation"
import { $duplicateSchedule } from "@/shared/api/schedule/schedule"
import { DuplicateScheduleDto, ScheduleEvent } from "@/shared/types/schedule"
import { queryClient } from "@/main"
import { SCHEDULE_QUERY_KEY } from "../../const/scheduleQueryKey"

interface UseDuplicateScheduleParams {
  onSuccess: (data: ScheduleEvent[]) => void
  onError?: (error: unknown) => void
  notifyOnError?: boolean
}

export const useDuplicateSchedule = ({
  onSuccess,
  onError,
  notifyOnError = true
}: UseDuplicateScheduleParams) => {
  return useNotifyMutation<ScheduleEvent[], DuplicateScheduleDto>(
    (data) => $duplicateSchedule(data).then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [SCHEDULE_QUERY_KEY]
        })
        onSuccess(data)
      },
      onError,
      notifyOnError
    }
  )
}
