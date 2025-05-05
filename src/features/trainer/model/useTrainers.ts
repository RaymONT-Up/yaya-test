import { $getTrainers } from '@/shared/api/trainer/trainer'
import { Trainer } from '@/shared/types/trainer'
import { useQuery } from '@tanstack/react-query'

export const useTrainers = (centerId: number | null) => {
  return useQuery<Trainer[]>({
    queryKey: ['trainers', centerId],
    queryFn: async () => {
      if (centerId === null) throw new Error('centerId is null')
      const { data } = await $getTrainers()
      return data
    },
    enabled: centerId !== null
  })
}
