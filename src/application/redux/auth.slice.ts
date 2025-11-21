import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { login } from '@application/services/auth.sa';
import { LoginResp } from '@domain/types/auth.type';

interface State {
  response?: LoginResp;
  error?: SerializedError;
  success?: boolean;
  loading?: boolean;
}

const initialState: State = {};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.response = undefined;
      state.error = undefined;
      state.success = undefined;
      state.loading = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.response = action.payload;
      state.error = undefined;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.response = undefined;
      state.error = action.error;
      state.success = false;
      state.loading = false;
    });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
