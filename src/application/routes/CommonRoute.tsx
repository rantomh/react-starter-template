import NotFoundPage from '@views/pages/common/404';

const CommonRoute = [
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default CommonRoute;
