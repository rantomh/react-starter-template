import { FC } from 'react';
import withNavigation from '@presentation/hocs/withNavigation';

const ConnectedPage: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default withNavigation(ConnectedPage);
