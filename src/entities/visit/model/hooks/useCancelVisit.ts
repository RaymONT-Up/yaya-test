import { CancelVisitDto, IVisit } from "@/shared/types/visit"
import { queryClient } from "@/main"
import { useNotifyMutation } from "@/shared/libs/useNotifyMutation"
import { $cancelVisit } from "@/shared/api/visit/visit"
import { VISITS_QUERY_KEY } from "../../const/visitsQueryKey"

interface UseCancelVisitParams {
  onSuccess: (data: IVisit) => void
  onError?: (error: unknown) => void
  notifyOnError?: boolean
}
export const useCancelVisit = ({
  onSuccess,
  onError,
  notifyOnError = true
}: UseCancelVisitParams) => {
  return useNotifyMutation<IVisit, CancelVisitDto>(
    (data) => $cancelVisit(data).then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [VISITS_QUERY_KEY] })
        onSuccess(data)
      },
      onError,
      notifyOnError
    }
  )
}
