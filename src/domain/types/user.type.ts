import { BaseDTO } from './common.type';

export interface LoginReq {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResp extends BaseDTO {
  email?: string;
  token?: string;
  privilege?: string[];
  privileges?: string[];
  isEnabled?: boolean;
}
