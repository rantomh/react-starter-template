import { FC } from 'react';
import LoginForm from '@views/components/organisms/LoginForm';
import { useLogin } from './useLogin';

const LoginContainer: FC = () => {
  const { handleSubmit, handleGoogleLogin, loading } = useLogin();

  return <LoginForm handleSubmit={handleSubmit} handleGoogleLogin={handleGoogleLogin} loading={loading} />;
};

export default LoginContainer;
