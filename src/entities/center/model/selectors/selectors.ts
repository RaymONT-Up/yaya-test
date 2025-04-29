import { RootState } from '@/app/config/store'
import { Center } from '@/shared/types/center'

export const selectCenters = (state: RootState): Center[] => state.centerReducer.center_list
export const selectCenterLoading = (state: RootState) => state.centerReducer.isLoading
export const selectCenterError = (state: RootState) => state.centerReducer.error
