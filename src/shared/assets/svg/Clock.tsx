import { SVGProps } from "react"

export const Clock = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 10.4999V20.4999L26.6667 23.8333M36.6667 20.4999C36.6667 29.7047 29.2048 37.1666 20 37.1666C10.7953 37.1666 3.33334 29.7047 3.33334 20.4999C3.33334 11.2952 10.7953 3.83325 20 3.83325C29.2048 3.83325 36.6667 11.2952 36.6667 20.4999Z"
        stroke={props.color ? props.color : "#3F68FF"}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
