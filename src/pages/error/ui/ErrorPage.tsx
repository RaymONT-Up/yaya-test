import { useEffect } from "react"
import styles from "./ErrorPage.module.scss"
import { InfoBlock } from "@/shared/ui/InfoBlock/InfoBlock"
import { Logo } from "@/shared/assets/svg/Logo"
import { ErrorCodes, errorConfig, mapHttpStatusToErrorCode } from "@/shared/consts/errorConfig"
import { useNavigate, useSearchParams } from "react-router-dom"
import { RoutePath } from "@/shared/consts/routerPaths"
import { useAppDispatch } from "@/app/config/store"
import { clearSession, removeToken } from "@/entities/currentSession"
import { Button } from "@/shared/ui/Button"
import { ArrowLeft } from "@/shared/assets/svg/ArrowLeft"

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
  const handleAuthClick = () => {
    removeToken()
    dispatch(clearSession())
    navigate(RoutePath.LOGIN)
  }
  useEffect(() => {
    const isReload = performance.navigation.type === 1

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
        {errorCode === 403 && (
          <Button onClick={handleAuthClick} iconStart={<ArrowLeft />}>
            Назад
          </Button>
        )}
      </div>
    </div>
  )
}

export default ErrorPage
