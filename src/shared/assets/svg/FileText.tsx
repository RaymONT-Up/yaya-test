import { SVGProps } from "react"

export const FileText = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.33366 1.33325H4.00033C3.6467 1.33325 3.30756 1.47373 3.05752 1.72378C2.80747 1.97382 2.66699 2.31296 2.66699 2.66659V13.3333C2.66699 13.6869 2.80747 14.026 3.05752 14.2761C3.30756 14.5261 3.6467 14.6666 4.00033 14.6666H12.0003C12.3539 14.6666 12.6931 14.5261 12.9431 14.2761C13.1932 14.026 13.3337 13.6869 13.3337 13.3333V5.33325M9.33366 1.33325L13.3337 5.33325M9.33366 1.33325L9.33366 5.33325H13.3337M10.667 8.66658H5.33366M10.667 11.3333H5.33366M6.66699 5.99992H5.33366"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
