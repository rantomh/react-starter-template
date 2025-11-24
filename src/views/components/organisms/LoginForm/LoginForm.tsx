import classNames from 'classnames';
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik';
import { FC, useRef } from 'react';
import * as Yup from 'yup';
import SafePassword, { SafePasswordHandle } from '@rantomah/react-safe-password';
import GoogleIcon from '@views/components/atoms/GoogleIcon';
import { LoginReq } from '@domain/types/auth.type';

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  rememberMe: Yup.boolean().required(),
});

const initialValues: LoginReq = { email: '', password: '', rememberMe: false };

interface Props {
  handleSubmit: (data: LoginReq) => void;
  handleGoogleLogin: () => void;
  loading?: boolean;
}

const LoginForm: FC<Props> = ({ handleSubmit, handleGoogleLogin, loading = false }) => {
  const safePassRef = useRef<SafePasswordHandle>(null);
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
          {({ errors, touched }) => (
            <Form autoComplete="off" spellCheck={false}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <Field
                  type="text"
                  className={classNames('form-control', { 'form-error': !!errors.email && touched.email })}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  spellCheck={false}
                  autoComplete="off"
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="safe-password-password" className="form-label">
                  Password
                </label>
                <Field name="password">
                  {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<LoginReq> }) => (
                    <SafePassword
                      ref={safePassRef}
                      id="password"
                      name="password"
                      value={field.value}
                      onChange={(value) => {
                        form.setFieldValue('password', value);
                      }}
                      showToggler={true}
                      placeholder="Enter your password"
                      className="form-control"
                      errorClassName="form-error"
                      disabled={loading}
                      isError={!!form.errors.password && form.touched.password}
                    />
                  )}
                </Field>
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
          )}
        </Formik>

        <div className="divider">
          <span>Or continue with</span>
        </div>

        <button onClick={handleGoogleLogin} className="btn btn-google w-100">
          <GoogleIcon />
          Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
