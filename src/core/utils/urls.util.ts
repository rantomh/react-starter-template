import api, { Api } from '@domain/constants/api';
import { ID } from '@domain/types/common.type';
import env from '@envs';

export const absolute = (selector: (api: Api) => string, ...params: ID[]) => {
  let url = selector(api);
  for (const param of params) {
    url = url.replace(/{[a-zA-Z0-9]+}/, String(param));
  }
  return `${env.backend}${url}`;
};

export const mocker = (selector: (api: Api) => string, ...params: ID[]) => {
  let url = selector(api);
  for (const param of params) {
    url = url.replace(/{[a-zA-Z0-9]+}/, String(param));
  }
  return `${env.mocker}${url}`;
};

export const absoluteFront = (path: string): string => {
  return globalThis.location.origin + path;
};

export const assignTo = (path: string): void => {
  globalThis.location.assign(path);
};

export const replaceTo = (path: string): void => {
  globalThis.location.replace(path);
};

export const logout = () => {
  localStorage.clear();
  assignTo('/');
};

export const logoutRedirect = (currentLocation: string) => {
  localStorage.clear();
  assignTo(`/?showLogin=true&referrer=${encodeURIComponent(currentLocation)}`);
};
