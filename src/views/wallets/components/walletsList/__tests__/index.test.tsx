import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import WalletList from '..'
import { useWalletStore } from '../../../../../store'

vi.mock('react-hot-toast', () => ({
	default: {
		success: vi.fn(),
		error: vi.fn(),
	},
}))

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom')
	return {
		...actual,
		useNavigate: () => mockNavigate,
	}
})

beforeEach(() => {
	vi.clearAllMocks()
	useWalletStore.setState({
		wallets: [
			{ address: '0x123', name: 'Main Wallet', encryptedPrivateKey: 'encrypted123', salt: 'salt' },
			{ address: '0x456', name: 'Backup Wallet', encryptedPrivateKey: 'encrypted456', salt: 'salt' },
		],
		activeWallet: undefined,
	})
})

describe('WalletList Component', () => {
	it('renders all wallets correctly', () => {
		render(
			<BrowserRouter>
				<WalletList />
			</BrowserRouter>,
		)

		expect(screen.getByText('Main Wallet')).toBeInTheDocument()
		expect(screen.getByText('Backup Wallet')).toBeInTheDocument()
	})
})
