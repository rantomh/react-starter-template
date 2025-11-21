import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { ReactNode, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';

import { mode } from '@envs';

import '@core/configs/i18n.config';
import { store } from '@core/configs/store.config';
import LangueProvider from '@core/providers/LangueProvider';
import UserProvider from '@core/providers/UserProvider';

import Root from '@views/Root';
import GlobalErrorPage from '@views/pages/common/500';

import 'react-toastify/dist/ReactToastify.css';
import '@assets/styles/extention.scss';

const App = () => (
  <ErrorBoundary fallback={<GlobalErrorPage />}>
    <LangueProvider>
      <Provider store={store}>
        <UserProvider>
          <Root />
          <ToastContainer limit={3} />
        </UserProvider>
      </Provider>
    </LangueProvider>
  </ErrorBoundary>
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

let app: ReactNode;

if (mode === 'localhost') {
  app = (
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  if (mode === 'production') {
    console.log = () => {};
    console.info = () => {};
    console.trace = () => {};
    console.debug = () => {};
  }
  app = <App />;
}

root.render(app);
