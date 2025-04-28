import { SVGProps } from 'react'

export const AlertCircle = (props: SVGProps<SVGSVGElement>) => {
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
        d="M9.99999 7.16669V10.5M9.99999 13.8334H10.0083M18.3333 10.5C18.3333 15.1024 14.6024 18.8334 9.99999 18.8334C5.39762 18.8334 1.66666 15.1024 1.66666 10.5C1.66666 5.89765 5.39762 2.16669 9.99999 2.16669C14.6024 2.16669 18.3333 5.89765 18.3333 10.5Z"
        stroke="#E22828"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
