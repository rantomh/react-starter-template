import { FC } from 'react';
import ErrorSection from '@views/components/organisms/ErrorSection';

const GlobalErrorPage: FC = () => {
  return (
    <ErrorSection
      title="Something went wrong."
      message="Unexpected error occurred while processing your request."
      redirectPath="/"
    />
  );
};

export default GlobalErrorPage;
