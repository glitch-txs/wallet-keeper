import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Balance from '../index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useWalletStore } from '../../../store'
import { mainnet } from 'viem/chains'

const queryClient = new QueryClient()

const renderWithProvider = (ui: React.ReactNode) => {
	return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

vi.mock('react-hot-toast', () => ({
	default: {
		success: vi.fn(),
		error: vi.fn(),
	},
}))

const mockAddToken = vi.fn()
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
	return {
		...actual,
		useNavigate: () => mockNavigate,
	}
})

describe('Balance Component', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders correctly with initial state', () => {
		renderWithProvider(<Balance />)

		expect(screen.getByText('Your Balance')).toBeInTheDocument()
		expect(screen.getByText('Go Back')).toBeInTheDocument()
		expect(screen.getByText('Add Token')).toBeInTheDocument()
	})

	it('opens the modal when "Add Token" is clicked', () => {
		renderWithProvider(<Balance />)

		fireEvent.click(screen.getByText('Add Token'))
		expect(screen.getByText('Add a New Token')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Enter the token address')).toBeInTheDocument()
	})

	it('shows an error if no address is entered', async () => {
		renderWithProvider(<Balance />)

		fireEvent.click(screen.getByText('Add Token'))

		const submitButton = screen
			.getAllByRole('button', { name: 'Add Token' })
			.find((button) => button.getAttribute('type') === 'submit')

		if (submitButton) {
			fireEvent.click(submitButton)
		} else {
			throw new Error('Submit button not found')
		}

		await waitFor(() => {
			expect(screen.getByText('Token Address is required')).toBeInTheDocument()
		})
	})

	it('calls addToken and shows success toast if the token is added successfully', async () => {
		useWalletStore.setState((state) => ({
			...state,
			activeChain: mainnet,
			addToken: mockAddToken,
		}))

		mockAddToken.mockResolvedValue({
			address: '0x9876543210abcdef',
			name: 'Test Token',
			symbol: 'TST',
		})

		renderWithProvider(<Balance />)

		fireEvent.click(screen.getByText('Add Token'))
		fireEvent.change(screen.getByPlaceholderText('Enter the token address'), {
			target: { value: '0x9876543210abcdef' },
		})

		const submitButton = screen
			.getAllByRole('button', { name: 'Add Token' })
			.find((button) => button.getAttribute('type') === 'submit')

		if (submitButton) {
			fireEvent.click(submitButton)
		} else {
			throw new Error('Submit button not found')
		}

		await waitFor(() => {
			expect(mockAddToken).toHaveBeenCalledWith({
				address: '0x9876543210abcdef',
				chain: mainnet,
			})
			expect(toast.success).toHaveBeenCalledWith('Token Added Successfully!')
		})
	})

	it('shows error toast if adding token fails', async () => {
		mockAddToken.mockResolvedValue(null)

		renderWithProvider(<Balance />)

		fireEvent.click(screen.getByText('Add Token'))
		fireEvent.change(screen.getByPlaceholderText('Enter the token address'), {
			target: { value: '0x9876543210abcdef' },
		})

		const submitButton = screen
			.getAllByRole('button', { name: 'Add Token' })
			.find((button) => button.getAttribute('type') === 'submit')

		if (submitButton) {
			fireEvent.click(submitButton)
		} else {
			throw new Error('Submit button not found')
		}

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith('An error occurred!')
		})
	})

	it('navigates back when clicking "Go Back"', () => {
		renderWithProvider(<Balance />)

		fireEvent.click(screen.getByText('Go Back'))
		expect(mockNavigate).toHaveBeenCalledWith('/')
	})
})
