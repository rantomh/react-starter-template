import CryptoJS from 'crypto-js';

const SECRET_KEY = 'zZk<z@aB~/WJ;D(.Xk,5';

export const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decrypt = (encryptedData: string): string => {
  return CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(CryptoJS.enc.Utf8);
};

export const generateUUID = (): string => {
  const randomHash = CryptoJS.SHA256(CryptoJS.lib.WordArray.random(16)).toString();
  return `${randomHash.slice(0, 8)}-${randomHash.slice(8, 12)}-${randomHash.slice(12, 16)}-${randomHash.slice(16, 20)}-${randomHash.slice(20, 32)}`;
};

export const generateHash = (data: string): string => {
  return CryptoJS.HmacSHA256(data, SECRET_KEY).toString(CryptoJS.enc.Hex);
};
