import { $getTrainers } from '@/shared/api/trainer/trainer'
import { Trainer } from '@/shared/types/trainer'
import { useQuery } from '@tanstack/react-query'

export const useTrainers = () => {
  return useQuery<Trainer[]>({
    queryKey: ['trainers'],
    queryFn: async () => {
      const { data } = await $getTrainers()
      return data
    }
  })
}
