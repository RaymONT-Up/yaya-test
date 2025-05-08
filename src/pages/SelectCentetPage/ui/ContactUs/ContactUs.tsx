import { InfoBlock } from '@/shared/ui/InfoBlock/InfoBlock'
import s from './ContactUs.module.scss'
import { Company } from '@/shared/assets/svg/Company'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { Copy } from '@/shared/assets/svg/Copy'
import { useRef, useState } from 'react'
import { CheckCircle } from '@/shared/assets/svg/CheckCircle'
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip'

export const ContactUs = () => {
  const [copied, setCopied] = useState(false)
  const phone = '+7 747 520 5370'
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(phone)
    setCopied(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setCopied(false)
      timeoutRef.current = null
    }, 3000)
  }
  return (
    <div className={s.contactContainer}>
      <InfoBlock
        text="Пожалуйста, свяжитесь с администратором для получения доступа."
        title="У вас нет центров"
        icon={<Company />}
      />
      <div className={s.contactBtn}>
        <Tooltip position="top" text="Копировать в буфер обмена">
          <Button
            variant={ButtonVariant.Subtle}
            iconStart={copied ? <CheckCircle /> : <Copy />}
            onClick={handleCopy}
          >
            {copied ? 'Скопирован' : phone}
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}
