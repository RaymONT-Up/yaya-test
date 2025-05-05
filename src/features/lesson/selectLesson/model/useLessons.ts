import { useQuery } from '@tanstack/react-query'
import { $getLessons } from '@/shared/api/lesson/lesson'
import { Lesson } from '@/shared/types/lesson'

export const useLessons = (centerId: number | null) => {
  return useQuery<Lesson[]>({
    queryKey: ['lessons', centerId],
    queryFn: async () => {
      if (centerId === null) {
        throw new Error('centerId is null')
      }
      const { data } = await $getLessons()
      return data
    },
    enabled: centerId !== null
  })
}
