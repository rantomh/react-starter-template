import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { setCurrentLocation } from '@application/infrastructure/httpClient';
import { isStorageAvailable } from '@application/infrastructure/localStorage';
import NotAuthorizedPage from '@presentation/pages/common/403';
import { assignTo } from '@utils/urls.util';
import { isConnected } from '@utils/user.util';

interface Props {
  children: React.ReactNode;
}

const ConnectedRoute: FC<Props> = ({ children }) => {
  const { pathname, search } = useLocation();
  setCurrentLocation(pathname, search);
  if (!isStorageAvailable()) {
    return (
      <NotAuthorizedPage
        title="Access Restricted"
        message="This application requires localStorage to function properly. Please enable it in your browser settings or switch to a supported browser."
        redirectPath="/"
      />
    );
  }
  const user = isConnected();
  if (!user) {
    assignTo(`/?showLogin=true&referrer=${encodeURIComponent(pathname + search)}`);
    return;
  }
  return children;
};

export default ConnectedRoute;
