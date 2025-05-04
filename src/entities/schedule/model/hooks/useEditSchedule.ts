import { useMutation } from '@tanstack/react-query'
import { $updateSchedule } from '@/shared/api/schedule/schedule'
import { EditScheduleDto, ScheduleEvent } from '@/shared/types/schedule'
import { queryClient } from '@/main'
import { SCHEDULE_QUERY_KEY } from '../../const/scheduleQueryKey'

interface UseUpdateScheduleParams {
  onSuccess: (data: ScheduleEvent) => void
  onError: (error: unknown) => void
}

export const useUpdateSchedule = ({ onSuccess, onError }: UseUpdateScheduleParams) => {
  return useMutation<ScheduleEvent, unknown, EditScheduleDto>({
    mutationFn: (data) => $updateSchedule(data).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [SCHEDULE_QUERY_KEY]
      })
      onSuccess(data)
    },
    onError
  })
}
