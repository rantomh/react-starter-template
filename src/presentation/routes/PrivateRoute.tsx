import DashboardPage from '@presentation/pages/admin/DashboardPage';
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
