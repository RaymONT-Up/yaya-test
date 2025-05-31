import { useEffect } from "react"
import styles from "./ErrorPage.module.scss"
import { InfoBlock } from "@/shared/ui/InfoBlock/InfoBlock"
import { Logo } from "@/shared/assets/svg/Logo"
import { ErrorCodes, errorConfig, mapHttpStatusToErrorCode } from "@/shared/consts/errorConfig"
import { useNavigate, useSearchParams } from "react-router-dom"
import { RoutePath } from "@/shared/consts/routerPaths"
import { useAppDispatch, useAppSelector } from "@/app/config/store"
import { clearSession, removeToken } from "@/entities/currentSession"

const ErrorPage = () => {
  const [searchParams] = useSearchParams()
  const errorCode = Number(searchParams.get("status_code"))
  const {
    title,
    text,
    icon: Icon
  } = errorConfig[mapHttpStatusToErrorCode(errorCode)] || errorConfig[ErrorCodes.UNKNOWN]
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { roleError } = useAppSelector((state) => state.currentSessionSliceReducer)

  useEffect(() => {
    const isReload = performance.navigation.type === 1
    // !TODO продумать логику как при ошибке 403 не редиректить на логин сразу а только при перезагрузке страницы
    if (roleError) {
      return
    }
    if (isReload) {
      removeToken()
      dispatch(clearSession())
      navigate(RoutePath.LOGIN)
    }
  }, [navigate, dispatch])
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.content}>
        <InfoBlock title={title} text={text} icon={<Icon />} />
      </div>
    </div>
  )
}

export default ErrorPage
