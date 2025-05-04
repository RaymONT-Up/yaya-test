import { $getLessons } from '@/shared/api/lesson/lesson'
import { Lesson } from '@/shared/types/lesson'
import { useQuery } from '@tanstack/react-query'

export const useLessons = () => {
  return useQuery<Lesson[]>({
    queryKey: ['lessons'],
    queryFn: async () => {
      const { data } = await $getLessons()
      return data
    }
  })
}
