import { SVGProps } from "react"

export const UserCheck = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_7135_1509)">
        <path
          d="M10.667 14V12.6667C10.667 11.9594 10.386 11.2811 9.88594 10.781C9.38585 10.281 8.70757 10 8.00033 10H3.33366C2.62641 10 1.94814 10.281 1.44804 10.781C0.947944 11.2811 0.666992 11.9594 0.666992 12.6667V14M11.3337 7.33333L12.667 8.66667L15.3337 6M8.33366 4.66667C8.33366 6.13943 7.13975 7.33333 5.66699 7.33333C4.19423 7.33333 3.00033 6.13943 3.00033 4.66667C3.00033 3.19391 4.19423 2 5.66699 2C7.13975 2 8.33366 3.19391 8.33366 4.66667Z"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_7135_1509">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
