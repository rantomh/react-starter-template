import { FC } from 'react';
import ErrorSection from '@presentation/containers/ErrorSection';

const NotFoundPage: FC = () => (
  <ErrorSection
    title="This page is not Found"
    message="We can't seem to find the page you're looking for."
    redirectPath="/"
  />
);

export default NotFoundPage;
