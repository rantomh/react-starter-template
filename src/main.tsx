import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { ReactNode, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';

import { mode } from '@envs';
import '@common/configs/i18n.config';
import { store } from '@common/configs/store.config';

import LangueProvider from '@presentation/providers/LangueProvider';
import Root from '@presentation/Root';
import GlobalErrorPage from '@presentation/pages/common/500';

import 'react-toastify/dist/ReactToastify.css';

import '@assets/styles/extention.scss';
import UserProvider from '@presentation/providers/UserProvider';

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
