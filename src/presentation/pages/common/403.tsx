import { FC } from 'react';
import ErrorSection from '@presentation/containers/ErrorSection';

interface Props {
  title?: string;
  message?: string;
  redirectPath?: string;
}

const NotAuthorizedPage: FC<Props> = ({ title, message }) => (
  <ErrorSection
    title={title ?? 'This page is not authorized'}
    message={message ?? "You can't access to the content of this page."}
    redirectPath="/"
  />
);

export default NotAuthorizedPage;
