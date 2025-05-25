import React from "react"
import styles from "./ReasonOptions.module.scss"
import { CancelReason } from "../../const/cancelReason"
import { ToggleButton } from "@/shared/ui/ToggleButton/ToggleButton"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Edit } from "@/shared/assets/svg/Edit"

interface ReasonOptionsProps {
  selectedReason: CancelReason | null
  setSelectedReason: (reason: CancelReason | null) => void
  handleCustomReason: () => void
  cancelReasonsList: CancelReason[]
}

export const ReasonOptions: React.FC<ReasonOptionsProps> = ({
  selectedReason,
  setSelectedReason,
  handleCustomReason,
  cancelReasonsList
}) => {
  return (
    <>
      {cancelReasonsList.map((reason) => (
        <ToggleButton
          key={reason}
          selected={selectedReason === reason}
          onClick={() => setSelectedReason(reason)}
          className={styles.cancelReasonBtn}
        >
          {reason}
        </ToggleButton>
      ))}
      <Button iconStart={<Edit />} variant={ButtonVariant.Subtle} onClick={handleCustomReason}>
        Указать свою причину
      </Button>
    </>
  )
}
