import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import PasswordForm from '..';

describe('PasswordForm Component', () => {
  const mockOnSubmitPassword = vi.fn();

  beforeEach(() => {
    render(<PasswordForm onSubmitPassword={mockOnSubmitPassword} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should show an error message when submitting an empty password', () => {
    const button = screen.getByRole('button', { name: /view private key/i });

    fireEvent.click(button);

    expect(screen.getByText('Password is required.')).toBeInTheDocument();
    expect(mockOnSubmitPassword).not.toHaveBeenCalled();
  });

  it('should call onSubmitPassword with the password when form is submitted', () => {
    const passwordInput = screen.getByPlaceholderText('Enter the wallet password');
    const button = screen.getByRole('button', { name: /view private key/i });

    fireEvent.change(passwordInput, { target: { value: 'mySecretPassword' } });
    fireEvent.click(button);

    expect(mockOnSubmitPassword).toHaveBeenCalledWith('mySecretPassword');
  });

  it('should not call onSubmitPassword if password is empty', () => {
    const button = screen.getByRole('button', { name: /view private key/i });

    fireEvent.click(button);

    expect(mockOnSubmitPassword).not.toHaveBeenCalled();
  });
});
