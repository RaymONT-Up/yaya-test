import { createSlice } from "@reduxjs/toolkit"
import { CurrentSessionState } from "../types/currentSession.types"
import { loginThunk } from "../services/loginThunk"
import { logoutThunk } from "../services/logoutThunk"
import { getRoleThunk } from "../services/getRoleThunk"

const initialState: CurrentSessionState = {
  user_id: null,
  token: null,
  username: null,
  loading: false,
  roleLoading: true,
  error: null,
  roleError: null,
  role: null,
  permissions: null,
  role_display: null
}

const currentSessionSlice = createSlice({
  name: "currentSession",
  initialState,
  reducers: {
    clearSession(state) {
      state.user_id = null
      state.token = null
      state.username = null
      state.role = null
      state.permissions = null
      state.role_display = null
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
      .addCase(getRoleThunk.fulfilled, (state, action) => {
        state.role = action.payload.role
        state.permissions = action.payload.permissions
        state.role_display = action.payload.role_display
        state.roleLoading = false
      })
      .addCase(getRoleThunk.rejected, (state, action) => {
        state.roleError = action.payload || "Ошибка получения роли"
        state.roleLoading = false
      })
      .addCase(getRoleThunk.pending, (state) => {
        state.roleLoading = true
      })
  }
})

export const { clearSession, clearError } = currentSessionSlice.actions
export const currentSessionSliceReducer = currentSessionSlice.reducer
