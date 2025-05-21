import { SVGProps } from "react"

export const Home = (props: SVGProps<SVGSVGElement>) => {
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
        d="M6 15.1666V8.49992H10V15.1666M2 6.49992L8 1.83325L14 6.49992V13.8333C14 14.1869 13.8595 14.526 13.6095 14.7761C13.3594 15.0261 13.0203 15.1666 12.6667 15.1666H3.33333C2.97971 15.1666 2.64057 15.0261 2.39052 14.7761C2.14048 14.526 2 14.1869 2 13.8333V6.49992Z"
        stroke="#6B6B6F"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
