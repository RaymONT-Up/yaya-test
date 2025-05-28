import { useQuery } from "@tanstack/react-query"
import { $getTrainers } from "@/shared/api/trainer/trainer"
import { Trainer } from "@/shared/types/trainer"

export const useTrainersForCenters = (centers: number[]) => {
  return useQuery<Trainer[]>({
    queryKey: ["trainers-for-centers", centers],
    queryFn: async () => {
      if (!centers.length) return []

      const { data } = await $getTrainers(centers)
      return data
    },
    enabled: centers.length > 0
  })
}
