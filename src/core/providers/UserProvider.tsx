import React, { FC, ReactNode, useMemo } from 'react';
import { loadUser } from '@core/helpers/user.helper';
import { LoginResp } from '@domain/types/auth.type';

interface Props {
  children: ReactNode;
}

export const UserContext = React.createContext<LoginResp | null>(null);

const UserProvider: FC<Props> = ({ children }) => {
  const userVoid = useMemo(() => null, []);
  const user = loadUser();
  if (user?.email && user?.id && user?.token) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
  return <UserContext.Provider value={userVoid}>{children}</UserContext.Provider>;
};

export default UserProvider;
