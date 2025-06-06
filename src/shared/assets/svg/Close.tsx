import { SVGProps } from "react"

export const CloseX = (props: SVGProps<SVGSVGElement>) => {
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
        d="M12 4.5L4 12.5M4 4.5L12 12.5"
        stroke={props.color ? props.color : "#262527"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
