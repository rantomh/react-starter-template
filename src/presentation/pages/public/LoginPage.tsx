import { Field, Form, Formik } from 'formik';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '@application/services/auth.sa';
import { useRedux } from '@common/hooks/redux.hook';
import { RootState } from '@domain/types/redux.type';
import { LoginReq } from '@domain/types/user.type';
import GoogleIcon from '@presentation/components/elements/GoogleIcon';
import { saveUser } from '@utils/user.util';

const Login: FC = () => {
  const navigate = useNavigate();
  const [{ user, error, isLoading }, _login] = useRedux((state: RootState) => state.user, login);

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    rememberMe: Yup.boolean(),
  });
  const initialValues: LoginReq = { email: '', password: '', rememberMe: false };

  const handleSubmit = (payload: LoginReq) => {
    _login({ payload });
  };
  const handleGoogleLogin = () => {};

  useEffect(() => {
    if (user?.token && !error) {
      saveUser(user);
      navigate('/dashboard');
    }
  }, [user, navigate]);

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
          enableReinitialize
        >
          {() => {
            return (
              <Form autoComplete="off" spellCheck={false} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>

                  <Field
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    spellCheck={false}
                    autoComplete="off"
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
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <Field type="checkbox" className="form-check-input" id="rememberMe" name="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>

                  <a href="#" className="forgot-password">
                    Forgot password?
                  </a>
                </div>

                <button type="submit" disabled={isLoading} className="btn btn-primary w-100 mb-3">
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
