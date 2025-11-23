import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastify } from '@core/helpers/toast.helper';
import { saveUser } from '@core/helpers/user.helper';
import { useLangue } from '@core/hooks/langue.hook';
import { useRedux } from '@core/hooks/redux.hook';
import { login } from '@application/services/auth.service';
import { LoginReq } from '@domain/types/auth.type';
import { RootState } from '@domain/types/redux.type';

export const useLogin = () => {
  const navigate = useNavigate();
  const { t } = useLangue();

  const [{ response: user, error, loading }, _login] = useRedux((state: RootState) => state.auth, login);

  const handleSubmit = useCallback(
    (payload: LoginReq) => {
      _login({ payload });
    },
    [_login],
  );

  useEffect(() => {
    if (error) {
      toastify.error(t(error.message as string));
      return;
    }
    if (user) {
      saveUser(user);
      navigate('/dashboard');
    }
  }, [user, error, navigate, t]);

  const handleGoogleLogin = useCallback(() => {}, []);

  return { handleSubmit, handleGoogleLogin, loading };
};
