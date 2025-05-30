import React from "react"
import styles from "./ReasonOptions.module.scss"
import { ToggleButton } from "@/shared/ui/ToggleButton/ToggleButton"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Edit } from "@/shared/assets/svg/Edit"
import { cancelReasonsList, VisitCancelReasonEnum } from "@/shared/types/visit"

interface ReasonOptionsProps {
  selectedReason: VisitCancelReasonEnum | null
  setSelectedReason: (reason: VisitCancelReasonEnum | null) => void
  handleCustomReason: () => void
}

export const ReasonOptions: React.FC<ReasonOptionsProps> = ({
  selectedReason,
  setSelectedReason,
  handleCustomReason
}) => {
  return (
    <>
      {cancelReasonsList.map((reason) => (
        <ToggleButton
          key={reason.value}
          selected={selectedReason === reason.value}
          onClick={() => setSelectedReason(reason.value)}
          className={styles.cancelReasonBtn}
        >
          {reason.label}
        </ToggleButton>
      ))}
      <Button iconStart={<Edit />} variant={ButtonVariant.Subtle} onClick={handleCustomReason}>
        Указать свою причину
      </Button>
    </>
  )
}
