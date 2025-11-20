import { FC } from 'react';

interface Props {
  children?: React.ReactNode;
  showNotification?: boolean;
  showMessage?: boolean;
}

const RootLayout: FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default RootLayout;
