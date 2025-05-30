import { $getLessons } from "@/shared/api/lesson/lesson"
import { useQuery } from "@tanstack/react-query"
import { Lesson } from "@/shared/types/lesson"

export const useLessonsForCenters = (centers: number[]) => {
  return useQuery<Lesson[]>({
    queryKey: ["lessons-for-centers", centers],
    queryFn: async () => {
      if (!centers.length) return []
      const { data } = await $getLessons(centers)
      return data
    },
    enabled: centers.length > 0
  })
}
