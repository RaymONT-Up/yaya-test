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
}

const initialState: ReportFiltersState = {
  lessons: [],
  trainers: [],
  centers: [],
  date_from: "",
  date_to: "",
  page: 1,
  page_size: 10,
  count: 100
}

const reportFiltersSlice = createSlice({
  name: "reportFilters",
  initialState,
  reducers: {
    setLessons(state, action: PayloadAction<number[]>) {
      state.lessons = action.payload
    },
    setTrainers(state, action: PayloadAction<number[]>) {
      state.trainers = action.payload
    },
    setCenters(state, action: PayloadAction<number[]>) {
      state.centers = action.payload
    },
    setDateFrom(state, action: PayloadAction<string>) {
      state.date_from = action.payload
    },
    setDateTo(state, action: PayloadAction<string>) {
      state.date_to = action.payload
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
    resetFilters() {
      return initialState
    }
  }
})

export const reportFiltersActions = reportFiltersSlice.actions

export const reportFiltersReducer = reportFiltersSlice.reducer
