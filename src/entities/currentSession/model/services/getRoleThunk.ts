import { $getRole } from "@/shared/api/role/role"
import { RoleResponse } from "@/shared/types/role"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getRoleThunk = createAsyncThunk<RoleResponse, void, { rejectValue: string }>(
  "currentSession/getRole",
  async (_, { rejectWithValue }) => {
    try {
      const res = await $getRole()
      return res.data
    } catch {
      return rejectWithValue("Не удалось получить роль")
    }
  }
)
