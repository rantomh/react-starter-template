import axios from 'axios';
import { absolute } from '@core/utils/urls.util';
import { createAsyncThunk } from '@reduxjs/toolkit';
import httpClient, { isSuccess } from '@application/infrastructure/httpClient';
import { LoginReq, LoginResp } from '@domain/types/auth.type';
import { Action, AsyncThunkConfig } from '@domain/types/redux.type';

export const login = createAsyncThunk<LoginResp, Action<LoginReq>, AsyncThunkConfig>('auth/login', ({ payload }) => {
  return new Promise<LoginResp>((success, error) => {
    httpClient.mocker
      .request<LoginReq, LoginResp>(
        'post',
        absolute((api) => api.authentication.login),
        payload,
        {},
      )
      .then((response) => {
        if (isSuccess(response)) {
          success(response.data);
          return;
        }
        error(new Error('message.error.auth'));
      })
      .catch((exception: Error) => {
        if (axios.isAxiosError(exception) && !!exception.response?.data?.message) {
          error(new Error(exception.response.data.message));
          return;
        }
        error(new Error('message.error.auth'));
      });
  });
});
