import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('submits the correct form values', async () => {
    const handleSubmit = vi.fn();
    const handleGoogleLogin = vi.fn();

    render(<LoginForm handleSubmit={handleSubmit} handleGoogleLogin={handleGoogleLogin} />);

    await userEvent.type(screen.getByLabelText(/email/i), 'test@mail.com');
    await userEvent.type(screen.getByLabelText(/password/i), '123456');
    await userEvent.click(screen.getByLabelText(/remember me/i));

    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(handleSubmit).toHaveBeenCalledWith(
      {
        email: 'test@mail.com',
        password: '123456',
        rememberMe: true,
      },
      expect.any(Object),
    );
  });

  it('calls handleGoogleLogin when Google button is clicked', async () => {
    const handleSubmit = vi.fn();
    const handleGoogleLogin = vi.fn();

    render(<LoginForm handleSubmit={handleSubmit} handleGoogleLogin={handleGoogleLogin} />);

    await userEvent.click(screen.getByRole('button', { name: /google/i }));
    expect(handleGoogleLogin).toHaveBeenCalled();
  });

  it('disables inputs when loading = true', () => {
    const handleSubmit = vi.fn();
    const handleGoogleLogin = vi.fn();

    render(<LoginForm handleSubmit={handleSubmit} handleGoogleLogin={handleGoogleLogin} loading />);

    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/password/i)).toBeDisabled();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
  });
});
