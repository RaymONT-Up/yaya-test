import s from './Loader.module.scss'
interface LoaderProps {
  size?: number
}
export const Loader = ({ size = 40 }: LoaderProps) => {
  return (
    <div
      className={s.container}
      style={
        {
          '--uib-size': `${size}px`
        } as React.CSSProperties
      }
    >
      <div className={s.dot}></div>
      <div className={s.dot}></div>
      <div className={s.dot}></div>
      <div className={s.dot}></div>
      <div className={s.dot}></div>
      <div className={s.dot}></div>
    </div>
  )
}
