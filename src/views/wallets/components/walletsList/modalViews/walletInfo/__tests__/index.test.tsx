import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import WalletInfo from '..'
import toast from 'react-hot-toast'

vi.mock('react-hot-toast', () => ({
	default: {
		success: vi.fn(),
	},
}))

describe('WalletInfo Component', () => {
	const mockOnModalClose = vi.fn()
	const mockWriteText = vi.fn()

	beforeAll(() => {
		Object.defineProperty(navigator, 'clipboard', {
			value: {
				writeText: mockWriteText,
			},
			writable: true,
		})
	})

	const defaultProps = {
		name: 'Test Wallet',
		address: '0x1234...abcd',
		privateKey: 'abcd1234efgh5678',
		onModalClose: mockOnModalClose,
	}

	it('should render wallet information correctly', () => {
		render(<WalletInfo {...defaultProps} />)

		expect(screen.getByText('Account Name')).toBeInTheDocument()
		expect(screen.getByText('Test Wallet')).toBeInTheDocument()
		expect(screen.getByText('Address')).toBeInTheDocument()
		expect(screen.getByText('0x1234...abcd')).toBeInTheDocument()
		expect(screen.getByText('Private Key')).toBeInTheDocument()
		expect(screen.getByText('abcd1234efgh5678')).toBeInTheDocument()
	})

	it('should copy the address to clipboard when clicking the copy icon', () => {
		render(<WalletInfo {...defaultProps} />)

		const copyIcons = screen.getAllByAltText('Copy Address')
		fireEvent.click(copyIcons[0])

		expect(mockWriteText).toHaveBeenCalledWith('0x1234...abcd')
		expect(toast.success).toHaveBeenCalledWith('Copied to clipboard!')
	})

	it('should copy the private key to clipboard when clicking the copy icon', () => {
		render(<WalletInfo {...defaultProps} />)

		const copyIcons = screen.getAllByAltText('Copy Private Key')
		fireEvent.click(copyIcons[0])

		expect(mockWriteText).toHaveBeenCalledWith('abcd1234efgh5678')
		expect(toast.success).toHaveBeenCalledWith('Copied to clipboard!')
	})

	it('should call onModalClose when clicking the Close button', () => {
		render(<WalletInfo {...defaultProps} />)

		const closeButton = screen.getByRole('button', { name: /close/i })
		fireEvent.click(closeButton)

		expect(mockOnModalClose).toHaveBeenCalledTimes(1)
	})
})
