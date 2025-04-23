import { LoginRequest } from '@/shared/types/auth'
import { setSession } from '../store/store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { $login } from '@/shared/api/auth/auth'
import { setToken } from '../libs/accessTokenLS'
import { AxiosError } from 'axios'
export const loginThunk = createAsyncThunk(
  'currentSession/login',
  async (credentials: LoginRequest, { dispatch, rejectWithValue }) => {
    try {
      const response = await $login(credentials)

      if (response.status !== 200) {
        return rejectWithValue('Неверные учетные данные')
      }

      const data = response.data

      setToken(data.token)
      dispatch(
        setSession({
          user_id: data.user_id,
          token: data.token,
          username: data.username,
          loading: false,
          error: null
        })
      )

      return data
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>
      const message = error.response?.data?.message || 'Неизвестная ошибка'
      return rejectWithValue(message)
    }
  }
)
