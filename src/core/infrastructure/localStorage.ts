import { decrypt, encrypt } from '@core/utils/security.util';

export const isStorageAvailable = (): boolean => {
  return !!globalThis.localStorage;
};

export const saveItem = (key: string, value: string) => {
  if (!isStorageAvailable()) throw new Error('localStorage unavailable.');
  globalThis.localStorage.setItem(key, value);
};

export const restoreItem = (key: string): string | null => {
  if (!isStorageAvailable()) throw new Error('localStorage unavailable.');
  return globalThis.localStorage.getItem(key);
};

export const removeItem = (key: string): void => {
  if (!isStorageAvailable()) return;
  globalThis.localStorage.removeItem(key);
};

export const clearAll = (): void => {
  if (!isStorageAvailable()) return;
  globalThis.localStorage.clear();
};

export const saveCryptedItem = (key: string, value: string) => {
  saveItem(key, encrypt(value));
};

export const restoreCryptedItem = (key: string): string | null => {
  const item = restoreItem(key);
  if (!item) return null;
  return decrypt(item);
};
