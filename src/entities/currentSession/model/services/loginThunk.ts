import { LoginRequest } from "@/shared/types/auth"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { $login } from "@/shared/api/auth/auth"
import { setToken } from "../libs/accessTokenLS"
import { AxiosError } from "axios"
import { authErrorByStatus, AuthErrorMessage } from "@/shared/consts/errorMessages"

export const loginThunk = createAsyncThunk(
  "currentSession/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await $login(credentials)

      if (response.status !== 200) {
        return rejectWithValue(AuthErrorMessage.UNAUTHORIZED)
      }

      const data = response.data

      setToken(data.token)
      return data
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>
      const status = error.response?.status
      const message = (status && authErrorByStatus[status]) || AuthErrorMessage.UNKNOWN

      return rejectWithValue(message)
    }
  }
)
