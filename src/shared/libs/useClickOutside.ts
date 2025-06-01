import { useEffect, RefObject } from "react"

type UseClickOutsideProps<T extends HTMLElement> = {
  ref: RefObject<T | null>
  close: () => void
}

export const useClickOutside = <T extends HTMLElement>({ ref, close }: UseClickOutsideProps<T>) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, close])
}
