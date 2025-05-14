import { useMutation } from "@tanstack/react-query"
import { $duplicateSchedule } from "@/shared/api/schedule/schedule"
import { DuplicateScheduleDto, ScheduleEvent } from "@/shared/types/schedule"
import { queryClient } from "@/main"
import { SCHEDULE_QUERY_KEY } from "../../const/scheduleQueryKey"

interface UseDuplicateScheduleParams {
  onSuccess: (data: ScheduleEvent[]) => void
  onError: (error: unknown) => void
}

export const useDuplicateSchedule = ({ onSuccess, onError }: UseDuplicateScheduleParams) => {
  return useMutation<ScheduleEvent[], unknown, DuplicateScheduleDto>({
    mutationFn: (data: DuplicateScheduleDto) => $duplicateSchedule(data).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [SCHEDULE_QUERY_KEY]
      })
      onSuccess(data)
    },
    onError
  })
}
