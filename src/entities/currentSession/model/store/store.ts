import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentSessionState } from '../types/currentSession.types';


const initialState: CurrentSessionState = {
  userId: null,
  token: null,
  username: null,
};

const currentSessionSlice = createSlice({
  name: 'currentSession',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<CurrentSessionState>) {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    clearSession(state) {
      state.userId = null;
      state.token = null;
      state.username = null;
    },
  },
});

export const { setSession, clearSession } = currentSessionSlice.actions;
export const currentSessionSliceReducer = currentSessionSlice.reducer