import { useEffect, useState } from "react"

let globalActiveId: string | null = null
let listeners: ((id: string | null) => void)[] = []

export const useSelectManager = (id: string) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handle = (active: string | null) => {
      setIsOpen(active === id)
    }
    listeners.push(handle)
    return () => {
      listeners = listeners.filter((l) => l !== handle)
    }
  }, [id])

  const notify = (active: string | null) => {
    globalActiveId = active
    listeners.forEach((cb) => cb(active))
  }

  const open = () => notify(id)
  const close = () => notify(null)
  const toggle = () => {
    if (globalActiveId === id) {
      notify(null)
    } else {
      notify(id)
    }
  }

  return { isOpen, open, close, toggle }
}
