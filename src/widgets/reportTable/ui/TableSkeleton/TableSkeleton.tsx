import s from "./TableSkeleton.module.scss"

export const TableSkeleton = ({ rows = 10 }: { rows?: number }) => {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx}>
          <td>
            <div className={s.emptyCell} />
          </td>
          <td>
            <div className={s.skeleton} />
          </td>
          {Array.from({ length: 5 }).map((_, i) => (
            <td key={i}>
              <div className={s.emptyCell} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
