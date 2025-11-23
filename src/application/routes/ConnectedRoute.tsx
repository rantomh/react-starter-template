import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { isConnected } from '@core/helpers/user.helper';
import { setCurrentLocation } from '@core/infrastructure/httpClient';
import { isStorageAvailable } from '@core/infrastructure/localStorage';
import { assignTo } from '@core/utils/urls.util';
import NotAuthorizedPage from '@views/pages/common/403';

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
