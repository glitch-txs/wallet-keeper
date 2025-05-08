import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import toast from 'react-hot-toast'
import { useWalletStore } from '../../../../../store'
import CreateWalletModal from '..'

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  }
}))

const mockAddWallet = vi.fn()
const mockSetIsModalOpen = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()

  useWalletStore.setState((state) => ({
    ...state,
    addWallet: mockAddWallet,
  }))
})

describe('CreateWalletModal Component', () => {
  it('renders modal correctly when open', () => {
    render(<CreateWalletModal isModalOpen={true} setIsModalOpen={mockSetIsModalOpen} />)

    expect(screen.getByText('Create a New Wallet')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter wallet name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument()
  })

  it('shows validation errors when fields are empty', () => {
    render(<CreateWalletModal isModalOpen={true} setIsModalOpen={mockSetIsModalOpen} />)

    fireEvent.click(screen.getByText('Create Wallet'))

    expect(screen.getByText('Wallet Name is required.')).toBeInTheDocument()
    expect(screen.getByText('Password is required.')).toBeInTheDocument()
  })

  it('calls addWallet and closes modal on successful creation', () => {
    mockAddWallet.mockReturnValue({ name: 'Test Wallet', password: 'testpass' })

    render(<CreateWalletModal isModalOpen={true} setIsModalOpen={mockSetIsModalOpen} />)

    fireEvent.change(screen.getByPlaceholderText('Enter wallet name'), { target: { value: 'Test Wallet' } })
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'testpass' } })
    fireEvent.click(screen.getByText('Create Wallet'))

    expect(mockAddWallet).toHaveBeenCalledWith({ name: 'Test Wallet', password: 'testpass' })
    
    expect(toast.success).toHaveBeenCalledWith('Wallet Created Successfully!')
    
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(false)

    expect(screen.getByPlaceholderText('Enter wallet name')).toHaveValue('')
    expect(screen.getByPlaceholderText('Enter password')).toHaveValue('')
  })

  it('shows error toast if addWallet fails', () => {
    mockAddWallet.mockReturnValue(null)

    render(<CreateWalletModal isModalOpen={true} setIsModalOpen={mockSetIsModalOpen} />)

    fireEvent.change(screen.getByPlaceholderText('Enter wallet name'), { target: { value: 'Test Wallet' } })
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'testpass' } })
    fireEvent.click(screen.getByText('Create Wallet'))

    expect(toast.error).toHaveBeenCalledWith('An error occurred.')
  })

  it('matches snapshot', () => {
    const { container } = render(<CreateWalletModal isModalOpen={true} setIsModalOpen={mockSetIsModalOpen} />)
    expect(container).toMatchSnapshot()
  })
})
