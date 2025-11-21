import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { loadUser } from '@core/helpers/user.helper';
import { logoutRedirect } from '@core/utils/urls.util';
import { GLOBAL_HTTP_TIMEOUT } from '@domain/constants/env';
import { mockInstance } from '@domain/mock';

export const getConfig = (withToken: boolean = false, configInput?: AxiosRequestConfig): AxiosRequestConfig => {
  let headers: Record<string, string> = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
  };
  const _token = loadUser()?.token;
  if (_token && withToken) {
    headers = { ...headers, Authorization: `Bearer ${_token}` };
  }
  if (configInput?.headers) {
    headers = { ...headers, ...(configInput.headers as Record<string, string>) };
  }
  const config = { ...configInput };
  delete config.headers;
  return {
    ...config,
    headers,
  };
};

export const isSuccess = (response: AxiosResponse): boolean => {
  return !!response && !!response.status && response.status >= 200 && response.status < 300;
};

const getClient = (axiosInstance: AxiosInstance, withToken: boolean = false) => ({
  request: <P, R>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: P,
    config?: AxiosRequestConfig,
  ) => {
    return new Promise<AxiosResponse<R>>((success, error) => {
      axiosInstance
        .request<R>({
          method,
          url,
          data,
          ...getConfig(withToken, config),
        })
        .then((response) => success(response))
        .catch((exception) => error(exception));
    });
  },

  requestVoid: <R>(method: 'get' | 'post' | 'put' | 'patch' | 'delete', url: string, config?: AxiosRequestConfig) => {
    return new Promise<AxiosResponse<R>>((success, error) => {
      axiosInstance
        .request<R>({
          method,
          url,
          ...getConfig(withToken, config),
        })
        .then((response) => success(response))
        .catch((exception) => error(exception));
    });
  },

  upload: <P, R>(url: string, data?: P, config?: AxiosRequestConfig) => {
    return new Promise<R>((success, error) => {
      const formData = new FormData();
      for (const key in data) {
        if (data[key]) {
          formData.append(key, data[key] as Blob | string);
        }
      }
      axiosInstance
        .post<R>(url, formData, getConfig(withToken, config))
        .then((response) => {
          if (!isSuccess(response)) {
            error(new Error('HTTP POST finished with error status.'));
            return;
          }
          success(response.data);
        })
        .catch(error);
    });
  },
});

const instance = getClient(axios.create({ timeout: GLOBAL_HTTP_TIMEOUT }));
const mocker = getClient(mockInstance);

const staticInstance = axios.create({ timeout: GLOBAL_HTTP_TIMEOUT });
let currentLocation = '';

export const setCurrentLocation = (pathname: string, search: string) => {
  currentLocation = pathname + search;
};

staticInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if ([401, 403].includes(error.response?.status)) {
      logoutRedirect(currentLocation);
    }
    return Promise.reject(error);
  },
);
const withToken = getClient(staticInstance, true);

export default { instance, withToken, mocker };
