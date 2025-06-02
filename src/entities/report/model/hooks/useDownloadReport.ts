import { useMutation } from "@tanstack/react-query"
import { $downloadReportFile } from "@/shared/api/report/report"
import { ReportDownloadFilters } from "@/shared/types/report"

export const useDownloadReport = (center_id: number | null) => {
  return useMutation({
    mutationFn: async (filters: ReportDownloadFilters) => {
      if (!center_id) {
        throw new Error("Не выбран центр")
      }

      const response = await $downloadReportFile(filters)
      const blob = response.data

      let fileName = "report.xlsx"
      const contentDisposition = response.headers["content-disposition"]
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/)
        if (match?.[1]) {
          fileName = match[1]
        }
      }

      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = fileName
      link.click()
      URL.revokeObjectURL(link.href)

      return response
    },
    mutationKey: ["download-report"]
  })
}
