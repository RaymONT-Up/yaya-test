import { centerReducer } from "@/entities/center"
import { currentSessionSliceReducer } from "@/entities/currentSession"
import { reportFiltersReducer } from "@/entities/report"
import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
  reducer: {
    currentSessionSliceReducer,
    centerReducer,
    reportFiltersReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
