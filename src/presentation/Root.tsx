import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/public/LoginPage';
import AppRoute from './routes/AppRoute';

const Root: FC = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/">
          <Route index element={<LoginPage />} />
          <Route path="*" element={<AppRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
