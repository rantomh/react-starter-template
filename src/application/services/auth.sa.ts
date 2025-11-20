import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import httpClient, { isResponseSuccess } from '@application/infrastructure/httpClient';
import { Action, AsyncThunkConfig } from '@domain/types/redux.type';
import { LoginReq, LoginResp } from '@domain/types/user.type';
import { absolute } from '@utils/urls.util';

export const login = createAsyncThunk<LoginResp, Action<LoginReq>, AsyncThunkConfig>('user/login', ({ payload }) => {
  return new Promise<LoginResp>((success, error) => {
    httpClient.mocker
      .request<LoginReq, LoginResp>(
        'post',
        absolute((api) => api.authentication.login),
        payload,
        {},
      )
      .then((response) => {
        if (isResponseSuccess(response)) {
          success(response.data);
          return;
        }
        error(new Error('An error occurred while sending login request.'));
      })
      .catch((exception: Error) => {
        if (axios.isAxiosError(exception) && exception.response?.data?.message) {
          error(new Error(exception.response?.data?.message));
          return;
        }
        error(exception);
      });
  });
});
