import api, { Api } from '@domain/constants/api';
import { ID } from '@domain/types/common.type';
import env from '@envs';

export const absolute = (selector: (api: Api) => string, ...params: ID[]) => {
  let url = selector(api);
  params.forEach((param) => {
    url = url.replace(/{[^}]+}/, String(param));
  });
  return `${env.backend}${url}`;
};

export const mocker = (selector: (api: Api) => string, ...params: ID[]) => {
  let url = selector(api);
  params.forEach((param) => {
    url = url.replace(/{[^}]+}/, String(param));
  });
  return `${env.mocker}${url}`;
};

export const absoluteFront = (path: string): string => {
  return window.location.origin + path;
};

export const assignTo = (path: string): void => {
  window.location.assign(path);
};

export const replace = (path: string): void => {
  window.location.replace(path);
};

export const logout = () => {
  localStorage.clear();
  assignTo('/');
};

export const logoutRedirect = (currentLocation: string) => {
  localStorage.clear();
  assignTo(`/?showLogin=true&referrer=${encodeURIComponent(currentLocation)}`);
};
