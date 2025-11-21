import DashboardPage from '@views/pages/private/DashboardPage';
import ConnectedRoute from './ConnectedRoute';

const PrivateRoute = [
  {
    path: 'dashboard',
    element: (
      <ConnectedRoute>
        <DashboardPage />
      </ConnectedRoute>
    ),
  },
];

export default PrivateRoute;
