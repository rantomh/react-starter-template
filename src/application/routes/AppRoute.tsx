import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import CommonRoute from './CommonRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRoute: FC = () => {
  return useRoutes([...PublicRoute, ...PrivateRoute, ...CommonRoute]);
};

export default AppRoute;
