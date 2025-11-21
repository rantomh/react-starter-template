import { decrypt, encrypt } from '@core/utils/security.util';

export const isStorageAvailable = (): boolean => {
  return !!window.localStorage;
};

export const saveItem = (key: string, value: string) => {
  if (!isStorageAvailable()) throw new Error('localStorage unavailable.');
  window.localStorage.setItem(key, value);
};

export const restoreItem = (key: string): string | null => {
  if (!isStorageAvailable()) throw new Error('localStorage unavailable.');
  return window.localStorage.getItem(key);
};

export const removeItem = (key: string): void => {
  if (!isStorageAvailable()) return;
  window.localStorage.removeItem(key);
};

export const clearAll = (): void => {
  if (!isStorageAvailable()) return;
  window.localStorage.clear();
};

export const saveCryptedItem = (key: string, value: string) => {
  saveItem(key, encrypt(value));
};

export const restoreCryptedItem = (key: string): string | null => {
  const item = restoreItem(key);
  if (!item) return null;
  return decrypt(item);
};
