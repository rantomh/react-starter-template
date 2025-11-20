import { useCallback } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@domain/types/redux.type';

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

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useDispatcher = <TParams, TPayload>(
  dispatch: AppDispatch,
  action: AsyncThunk<TPayload, TParams, AsyncThunkConfig>,
) =>
  useCallback(
    (params: TParams): Promise<{ success: boolean; data?: TPayload; error?: SerializedError }> =>
      dispatch(action(params)).then(),
    [action, dispatch],
  );

export const useRedux = <TState, TParams, TPayload>(
  selector: (state: RootState) => TState,
  action: AsyncThunk<TPayload, TParams, AsyncThunkConfig>,
): [TState, (params: TParams) => Promise<{ success: boolean; data?: TPayload; error?: SerializedError }>] => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selector);
  return [state, useDispatcher(dispatch, action)];
};

export const useAction = <TParams, TPayload>(
  action: AsyncThunk<TPayload, TParams, AsyncThunkConfig>,
): ((params: TParams) => Promise<{ success: boolean; data?: TPayload; error?: SerializedError }>) => {
  const dispatch = useAppDispatch();
  return useDispatcher(dispatch, action);
};
