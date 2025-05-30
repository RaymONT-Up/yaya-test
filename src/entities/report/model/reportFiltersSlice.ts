import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ReportFiltersState {
  lessons: number[]
  trainers: number[]
  centers: number[]
  date_from: string
  date_to: string
  page: number
  page_size: number
  count: number
  page_count: number
}

const initialState: ReportFiltersState = {
  lessons: [],
  trainers: [],
  centers: [],
  date_from: "",
  date_to: "",
  page: 1,
  page_size: 10,
  count: 0,
  page_count: 1
}

const reportFiltersSlice = createSlice({
  name: "reportFilters",
  initialState,
  reducers: {
    setLessons(state, action: PayloadAction<number[]>) {
      state.lessons = action.payload
      state.page = 1
    },
    setTrainers(state, action: PayloadAction<number[]>) {
      state.trainers = action.payload
      state.page = 1
    },
    setCenters(state, action: PayloadAction<number[]>) {
      state.centers = action.payload
      state.page = 1
    },
    setDateFrom(state, action: PayloadAction<string>) {
      state.date_from = action.payload
      state.page = 1
    },
    setDateTo(state, action: PayloadAction<string>) {
      state.date_to = action.payload
      state.page = 1
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.page_size = action.payload
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.count = action.payload
    },
    setPagesCount(state, action: PayloadAction<number>) {
      state.page_count = action.payload
    },
    resetFilters() {
      return initialState
    }
  }
})

export const reportFiltersActions = reportFiltersSlice.actions

export const reportFiltersReducer = reportFiltersSlice.reducer
