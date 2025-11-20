import NotFoundPage from '@presentation/pages/common/404';

const CommonRoute = [
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default CommonRoute;
