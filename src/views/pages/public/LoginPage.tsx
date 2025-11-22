import { Field, Form, Formik } from 'formik';
import { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toastify } from '@core/helpers/toast.helper';
import { saveUser } from '@core/helpers/user.helper';
import { useLangue } from '@core/hooks/langue.hook';
import { useRedux } from '@core/hooks/redux.hook';
import GoogleIcon from '@views/components/elements/GoogleIcon';
import { login } from '@application/services/auth.sa';
import { LoginReq } from '@domain/types/auth.type';
import { RootState } from '@domain/types/redux.type';

const validationSchema = Yup.object({
  email: Yup.string().required(),
  password: Yup.string().required(),
  rememberMe: Yup.boolean().required(),
});

const Login: FC = () => {
  const navigate = useNavigate();
  const { t } = useLangue();

  const [{ response: user, error, loading }, _login] = useRedux((state: RootState) => state.auth, login);

  const initialValues: LoginReq = { email: '', password: '', rememberMe: false };

  const handleSubmit = useCallback(
    (payload: LoginReq) => {
      _login({ payload });
    },
    [_login],
  );
  const handleGoogleLogin = () => {};

  useEffect(() => {
    if (error) {
      toastify.error(t(error.message as string));
      return;
    }
    if (user) {
      saveUser(user);
      navigate('/dashboard');
    }
  }, [user, error]);

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
          validateOnChange={true}
        >
          {() => {
            return (
              <Form autoComplete="off" spellCheck={false}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>

                  <Field
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    spellCheck={false}
                    autoComplete="off"
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>

                  <Field
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    autoComplete="off"
                    disabled={loading}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <Field
                      disabled={loading}
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      name="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>

                  <a href="#" className="forgot-password">
                    Forgot password?
                  </a>
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary w-100 mb-3">
                  Sign In
                </button>
              </Form>
            );
          }}
        </Formik>

        <div className="divider">
          <span>Or continue with</span>
        </div>

        <button onClick={handleGoogleLogin} className="btn btn-google w-100">
          <GoogleIcon />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
