import { SVGProps } from "react"

export const ChevronRight = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.5 15.5L12.5 10.5L7.5 5.5"
        stroke={props.color ? props.color : "#6B6B6F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
