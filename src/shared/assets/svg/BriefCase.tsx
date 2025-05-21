import { SVGProps } from "react"

export const Briefcase = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.6667 14.5V3.83333C10.6667 3.47971 10.5262 3.14057 10.2762 2.89052C10.0261 2.64048 9.687 2.5 9.33337 2.5H6.66671C6.31309 2.5 5.97395 2.64048 5.7239 2.89052C5.47385 3.14057 5.33337 3.47971 5.33337 3.83333V14.5M2.66671 5.16667H13.3334C14.0698 5.16667 14.6667 5.76362 14.6667 6.5V13.1667C14.6667 13.903 14.0698 14.5 13.3334 14.5H2.66671C1.93033 14.5 1.33337 13.903 1.33337 13.1667V6.5C1.33337 5.76362 1.93033 5.16667 2.66671 5.16667Z"
        stroke="#6B6B6F"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
