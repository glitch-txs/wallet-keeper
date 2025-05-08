import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import WalletCard from '..'

vi.mock('../../../../../components/tooltip', () => ({
	default: ({ children }: any) => children,
}))

describe('WalletCard Component', () => {
	const mockOnViewBalance = vi.fn()
	const mockOnViewKey = vi.fn()
	const mockOnDelete = vi.fn()
	const mockOnClick = vi.fn()

	const walletProps = {
		walletName: 'My Wallet',
		address: '0x1234567890abcdef',
		isSelected: false,
		onViewBalance: mockOnViewBalance,
		onViewKey: mockOnViewKey,
		onDelete: mockOnDelete,
		onClick: mockOnClick,
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders wallet name and address correctly', () => {
		render(<WalletCard {...walletProps} />)

		expect(screen.getByText('My Wallet')).toBeInTheDocument()
		expect(screen.getByText('0x1234...cdef')).toBeInTheDocument()
	})

	it('calls "onViewBalance" when the button is clicked', () => {
		render(<WalletCard {...walletProps} />)

		fireEvent.click(screen.getByAltText('coins'))
		expect(mockOnViewBalance).toHaveBeenCalledTimes(1)
	})

	it('calls "onViewKey" when the button is clicked', () => {
		render(<WalletCard {...walletProps} />)

		fireEvent.click(screen.getByAltText('key'))
		expect(mockOnViewKey).toHaveBeenCalledTimes(1)
	})

	it('calls "onDelete" when the button is clicked', () => {
		render(<WalletCard {...walletProps} />)

		fireEvent.click(screen.getByAltText('delete'))
		expect(mockOnDelete).toHaveBeenCalledTimes(1)
	})

	it('displays "Selected" label when isSelected is true', () => {
		render(<WalletCard {...walletProps} isSelected={true} />)

		expect(screen.getByText('Selected')).toBeInTheDocument()
	})

	it('calls "onClick" when the card is clicked', () => {
		render(<WalletCard {...walletProps} />)

		fireEvent.click(screen.getByText('My Wallet'))
		expect(mockOnClick).toHaveBeenCalledTimes(1)
	})
})
