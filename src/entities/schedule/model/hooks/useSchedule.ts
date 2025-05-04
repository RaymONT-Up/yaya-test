import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ScheduleResponse } from '@/shared/types/schedule'
import { $getSchedule } from '@/shared/api/schedule/schedule'
import { SCHEDULE_QUERY_KEY } from '../../const/scheduleQueryKey'

interface UseScheduleParams {
  startDate: string
  endDate: string
  centerId: number | null
}

export const useSchedule = ({ startDate, endDate, centerId }: UseScheduleParams) => {
  return useQuery<ScheduleResponse>({
    queryKey: [SCHEDULE_QUERY_KEY, startDate, endDate, centerId],
    queryFn: () => {
      if (centerId === null) return Promise.reject(new Error('centerId is null'))
      return $getSchedule(startDate, endDate).then((res) => res.data)
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: centerId !== null
  })
}
