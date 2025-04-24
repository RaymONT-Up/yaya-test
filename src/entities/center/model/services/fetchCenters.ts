import { $getCenters } from '@/shared/api/center/center'
import { Center } from '@/shared/types/center'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCenters = createAsyncThunk<Center[]>('center/fetchCenters', async () => {
  const response = await $getCenters()
  return response.data
})
