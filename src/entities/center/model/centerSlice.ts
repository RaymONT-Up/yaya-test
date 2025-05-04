import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchCenters } from './services/fetchCenters'
import { Center } from '@/shared/types/center'
import { isAxiosError } from 'axios'
import { centerErrorByStatus, CenterErrorMessage } from './consts/centerError'

interface CenterState {
  currentCenter: Center
  center_list: Center[]
  isLoading: boolean
  error: string | null
}

const initialState: CenterState = {
  currentCenter: {} as Center,
  center_list: [],
  isLoading: false,
  error: null
}

const centerSlice = createSlice({
  name: 'center',
  initialState,
  reducers: {
    setCurrentCenter: (state, action: PayloadAction<Center>) => {
      state.currentCenter = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCenters.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCenters.fulfilled, (state, action: PayloadAction<Center[]>) => {
        state.center_list = action.payload
        state.isLoading = false
      })
      .addCase(fetchCenters.rejected, (state, action) => {
        state.isLoading = false

        if (isAxiosError(action.error) && action.error.response) {
          const status = action.error.response.status
          state.error = centerErrorByStatus[status] || CenterErrorMessage.UNKNOWN
        } else if (action.error.message === 'Network Error') {
          state.error = CenterErrorMessage.NETWORK_ERROR
        } else {
          state.error = CenterErrorMessage.UNKNOWN
        }
      })
  }
})

export const { reducer: centerReducer, actions: centerActions } = centerSlice
