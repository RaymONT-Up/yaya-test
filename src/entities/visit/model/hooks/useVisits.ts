import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { $getVisits } from "@/shared/api/visit/visit"
import { VISITS_QUERY_KEY } from "../../const/visitsQueryKey"
import { IVisit } from "@/shared/types/visit"

interface UseVisitsParams {
  date: string
  lesson_ids?: number[]
  centerId: number | null
}

export const useVisits = ({ date, lesson_ids, centerId }: UseVisitsParams) => {
  return useQuery<IVisit[]>({
    queryKey: [VISITS_QUERY_KEY, date, centerId, lesson_ids],
    queryFn: () => {
      if (centerId === null) return Promise.reject(new Error("centerId is null"))
      return $getVisits(date, lesson_ids).then((res) => res.data)
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: !!date && centerId !== null
  })
}
