import { FC } from 'react';
import withNavigation from '@core/hocs/withNavigation';

const ConnectedPage: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default withNavigation(ConnectedPage);
