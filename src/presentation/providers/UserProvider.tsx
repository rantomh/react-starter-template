import React, { FC, ReactNode, useMemo } from 'react';
import { LoginResp } from '@domain/types/user.type';
import { loadUser } from '@utils/user.util';

interface Props {
  children: ReactNode;
}

export const UserContext = React.createContext<LoginResp>({});

const UserProvider: FC<Props> = ({ children }) => {
  const userVoid = useMemo(() => ({}), []);
  const user = loadUser();
  if (user?.email && user?.id && user?.token) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
  return <UserContext.Provider value={userVoid}>{children}</UserContext.Provider>;
};

export default UserProvider;
