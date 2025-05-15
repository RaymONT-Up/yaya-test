import s from "./ComponentLoader.module.scss"

interface ComponentLoaderProps {
  size?: number
}

export const ComponentLoader = ({ size = 45 }: ComponentLoaderProps) => {
  return (
    <div
      className={s.container}
      style={
        {
          "--uib-size": `${size}px`
        } as React.CSSProperties
      }
    >
      <div className={s.cube}>
        <div className={s.inner}></div>
      </div>
      <div className={s.cube}>
        <div className={s.inner}></div>
      </div>
      <div className={s.cube}>
        <div className={s.inner}></div>
      </div>
    </div>
  )
}
