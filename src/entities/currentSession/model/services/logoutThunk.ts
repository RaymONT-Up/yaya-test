import { createAsyncThunk } from "@reduxjs/toolkit"
import { $logout } from "@/shared/api/auth/auth"
import { clearSession } from "../store/store"
import { removeToken } from "../libs/accessTokenLS"
import { AxiosError } from "axios"
import { NavigateFunction } from "react-router-dom"
import { RoutePath } from "@/shared/consts/routerPaths"
import { centerActions, removeCenterId } from "@/entities/center"

export const logoutThunk = createAsyncThunk<
  void,
  { navigate: NavigateFunction },
  { rejectValue: string }
>("currentSession/logout", async ({ navigate }, { dispatch, rejectWithValue }) => {
  try {
    await $logout()
    removeToken()
    removeCenterId()
    dispatch(clearSession())
    dispatch(centerActions.resetCenters())
    navigate(RoutePath.LOGIN)
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>
    const message = error.response?.data?.message || "Не удалось выйти из аккаунта"
    const status = error.response?.status

    if (status === 401 || !error.response) {
      removeToken()
      dispatch(clearSession())
      navigate(RoutePath.LOGIN)
    }
    return rejectWithValue(message)
  }
})
