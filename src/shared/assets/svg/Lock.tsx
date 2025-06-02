import { SVGProps } from "react"

export const Lock = (props: SVGProps<SVGSVGElement>) => {
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
        d="M11.6667 18.8333V12.1666C11.6667 9.95645 12.5446 7.83683 14.1074 6.27403C15.6702 4.71123 17.7899 3.83325 20 3.83325C22.2101 3.83325 24.3298 4.71123 25.8926 6.27403C27.4554 7.83683 28.3333 9.95645 28.3333 12.1666V18.8333M8.33333 18.8333H31.6667C33.5076 18.8333 35 20.3256 35 22.1666V33.8333C35 35.6742 33.5076 37.1666 31.6667 37.1666H8.33333C6.49238 37.1666 5 35.6742 5 33.8333V22.1666C5 20.3256 6.49238 18.8333 8.33333 18.8333Z"
        stroke="#3F68FF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
