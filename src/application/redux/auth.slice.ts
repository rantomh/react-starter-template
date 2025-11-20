import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { login } from '@application/services/auth.sa';
import { LoginResp } from '@domain/types/user.type';
import { toastify } from '@utils/toast.util';

interface State {
  user?: LoginResp;
  isSuccess?: boolean;
  isLoading?: boolean;
  error?: SerializedError;
}

const initialState: State = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = undefined;
      state.error = undefined;
      state.isSuccess = undefined;
      state.isLoading = undefined;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = undefined;
      state.isLoading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user = undefined;
      state.error = action.error;
      state.isLoading = false;
      toastify.error(action?.error?.message as string);
    });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
