import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Wallets from '..';
import { BrowserRouter } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useWalletStore } from '../../../store';

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  }
}));

describe('Wallets Integration Test', () => {
  beforeEach(() => {


    render(
      <BrowserRouter>
        <Wallets />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should display the "Create Wallet" button and open the modal', () => {
    const wallets = [...useWalletStore.getState().wallets];
    const removeWallet = useWalletStore.getState().removeWallet;
    wallets.forEach((wallet)=> removeWallet(wallet.address))

    const createButton = screen.getByText('Create Wallet');
    fireEvent.click(createButton);
    expect(screen.getByText('Create a New Wallet')).toBeInTheDocument();
  });

  it('should create a new wallet and display it in the list', async () => {
    const createButton = screen.getByText('Create Wallet');
    fireEvent.click(createButton);

    fireEvent.change(screen.getByPlaceholderText('Enter wallet name'), {
      target: { value: 'Glitch' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), {
      target: { value: 'password123' },
    });

    const submitButton = screen.getAllByRole('button', { name: 'Create Wallet' })
    .find((button) => button.getAttribute('type') === 'submit');
  
    if (submitButton) {
      fireEvent.click(submitButton);
    } else {
      throw new Error('Submit button not found');
    }

    const walletElement = await screen.findByText('Glitch');
    expect(walletElement).toBeInTheDocument();
    expect(toast.success).toHaveBeenCalledWith('Wallet Created Successfully!');
  });

  it('should show the password modal and reveal the private key', async () => {
    const viewKeyButton = await screen.findByAltText('key');
    fireEvent.click(viewKeyButton);

    const passwordInput = screen.getByPlaceholderText('Enter the wallet password')

    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText('View Private Key'));

    expect(await screen.findByAltText('Copy Private Key')).toBeInTheDocument();
  });

  it('should navigate to the balance view when "View Balance" is clicked', async () => {
    const viewBalanceButton = await screen.findByAltText('coins');
    fireEvent.click(viewBalanceButton);

    expect(window.location.pathname).toBe('/balance');
  });

  it('should delete a wallet and remove it from the list', async () => {
    const deleteButton = await screen.findByAltText('delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Test Wallet')).not.toBeInTheDocument();
    expect(toast.success).toHaveBeenCalledWith('Wallet Deleted Successfully!');
  });

  it('should display "No wallets available" if the list is empty', async () => {
    expect(await screen.findByText('No wallets available. Please create a new wallet.')).toBeInTheDocument();
  });
});
