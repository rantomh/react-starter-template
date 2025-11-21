import { useContext as usecontext } from 'react';
import { UserContext } from '@core/providers/UserProvider';
import { restoreItem, saveItem } from '@application/infrastructure/localStorage';
import { LoginResp } from '@domain/types/auth.type';
import { decrypt, encrypt } from '../utils/security.util';

/**
 * Saves the user to local storage after encryption.
 * Can be called from anywhere in the application.
 */
export const saveUser = (user: LoginResp) => {
  saveItem('session', encrypt(JSON.stringify(user)));
};

/**
 * Retrieves the user from local storage.
 * Use this only when the UserProvider context is not available.
 */
export const loadUser = (): LoginResp | null => {
  const userJson = restoreItem('session');
  if (!userJson) {
    return null;
  }
  try {
    const user: LoginResp = JSON.parse(decrypt(userJson));
    return user;
  } catch {
    return null;
  }
};

/**
 * Retrieves the authenticated user from the UserProvider context.
 * This should only be used inside the UserProvider.
 */
export const getUser = (): LoginResp | null => usecontext(UserContext);

/**
 * Checks if a user is connected by retrieving their information from local storage.
 * Returns the user if all essential data is present; otherwise, returns `null`.
 */
export const isConnected = (): LoginResp | null => {
  const user = loadUser();
  if (user?.id && user?.email && user?.token && user.isEnabled) return user;
  return null;
};
