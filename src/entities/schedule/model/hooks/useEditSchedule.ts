import { useNotifyMutation } from "@/shared/libs/useNotifyMutation"
import { $updateSchedule } from "@/shared/api/schedule/schedule"
import { EditScheduleDto, ScheduleEvent } from "@/shared/types/schedule"
import { queryClient } from "@/main"
import { SCHEDULE_QUERY_KEY } from "../../const/scheduleQueryKey"

interface UseUpdateScheduleParams {
  onSuccess: (data: ScheduleEvent) => void
  onError?: (error: unknown) => void
  notifyOnError?: boolean
}

export const useUpdateSchedule = ({
  onSuccess,
  onError,
  notifyOnError = true
}: UseUpdateScheduleParams) => {
  return useNotifyMutation<ScheduleEvent, EditScheduleDto>(
    (data) => $updateSchedule(data).then((res) => res.data),
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
