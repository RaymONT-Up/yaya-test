import { createSlice } from "@reduxjs/toolkit"
import { CurrentSessionState } from "../types/currentSession.types"
import { loginThunk } from "../services/loginThunk"
import { logoutThunk } from "../services/logoutThunk"

const initialState: CurrentSessionState = {
  user_id: null,
  token: null,
  username: null,
  loading: false,
  error: null
}

const currentSessionSlice = createSlice({
  name: "currentSession",
  initialState,
  reducers: {
    clearSession(state) {
      state.user_id = null
      state.token = null
      state.username = null
      state.loading = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.user_id = action.payload.user_id
        state.token = action.payload.token
        state.username = action.payload.username
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || "Ошибка входа"
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || "Ошибка входа"
      })
  }
})

export const { clearSession, clearError } = currentSessionSlice.actions
export const currentSessionSliceReducer = currentSessionSlice.reducer
