import { SVGProps } from "react"

export const ArrowRight = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.16699 9.99984H15.8337M15.8337 9.99984L10.0003 4.1665M15.8337 9.99984L10.0003 15.8332"
        stroke="#6B6B6F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
