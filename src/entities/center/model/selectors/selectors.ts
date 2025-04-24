import { RootState } from '@/app/config/store'

export const selectCenters = (state: RootState) => state.centerReducer.center_list
export const selectCenterLoading = (state: RootState) => state.centerReducer.isLoading
export const selectCenterError = (state: RootState) => state.centerReducer.error
