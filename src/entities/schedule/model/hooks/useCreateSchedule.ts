import { $createSchedule } from "@/shared/api/schedule/schedule"
import { CreateScheduleDto, ScheduleEvent } from "@/shared/types/schedule"
import { queryClient } from "@/main"
import { SCHEDULE_QUERY_KEY } from "../../const/scheduleQueryKey"
import { useNotifyMutation } from "@/shared/libs/useNotifyMutation"

interface UseCreateScheduleParams {
  onSuccess: (data: ScheduleEvent) => void
  onError?: (error: unknown) => void
  notifyOnError?: boolean
}

export const useCreateSchedule = ({
  onSuccess,
  onError,
  notifyOnError = true
}: UseCreateScheduleParams) => {
  return useNotifyMutation<ScheduleEvent, CreateScheduleDto>(
    (data) => $createSchedule(data).then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [SCHEDULE_QUERY_KEY] })
        onSuccess(data)
      },
      onError,
      notifyOnError
    }
  )
}
