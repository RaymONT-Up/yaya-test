import { ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: ReactNode
  containerId?: string
}

export const Portal = ({ children, containerId = 'root' }: PortalProps) => {
  const [mounted, setMounted] = useState(false)
  const elRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    elRef.current = document.getElementById(containerId)
    setMounted(true)
  }, [containerId])

  return mounted && elRef.current ? createPortal(children, elRef.current) : null
}
