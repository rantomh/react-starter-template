import { FC } from 'react';
import ErrorSection from '@views/components/organisms/ErrorSection';

interface Props {
  title?: string;
  message?: string;
  redirectPath?: string;
}

const NotAuthorizedPage: FC<Props> = ({ title, message, redirectPath }) => (
  <ErrorSection
    title={title ?? 'This page is not authorized'}
    message={message ?? "You can't access to the content of this page."}
    redirectPath={redirectPath}
  />
);

export default NotAuthorizedPage;
