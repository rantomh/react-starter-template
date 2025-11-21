import { store } from '@core/configs/store.config';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface ApiError {
  status?: number;
  code?: string;
  message?: string;
}

export interface AsyncThunkConfig {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: ApiError;
}

export interface Action<T = undefined> {
  signal?: AbortSignal;
  payload?: T;
}
