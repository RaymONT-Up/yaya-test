import { useMutation } from '@tanstack/react-query'
import { $createSchedule } from '@/shared/api/schedule/schedule'
import { CreateScheduleDto, ScheduleEvent } from '@/shared/types/schedule'
import { queryClient } from '@/main'
import { SCHEDULE_QUERY_KEY } from '../../const/scheduleQueryKey'

interface UseCreateScheduleParams {
  onSuccess: (data: ScheduleEvent) => void
  onError: (error: unknown) => void
}

export const useCreateSchedule = ({ onSuccess, onError }: UseCreateScheduleParams) => {
  return useMutation<ScheduleEvent, unknown, CreateScheduleDto>({
    mutationFn: (data: CreateScheduleDto) => $createSchedule(data).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [SCHEDULE_QUERY_KEY]
      })
      onSuccess(data)
    },
    onError
  })
}
