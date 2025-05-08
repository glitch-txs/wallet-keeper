import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest'
import BalanceCard from '../index'
import toast from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getTokenWithBalance } from '../../../../../utils/balance'
import type { Chain } from 'viem'
import type { Token } from '../../../../../types'
import { useWalletStore } from '../../../../../store'

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  }
}))

vi.mock('../../../../../utils/balance', () => ({
  getTokenWithBalance: vi.fn(),
}))

const mockedGetTokenWithBalance = getTokenWithBalance as MockedFunction<typeof getTokenWithBalance>;


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
})

const renderWithProvider = (ui: React.ReactNode) => {
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

const mockRemoveToken = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
})

const chain = {
  id: 1,
  nativeCurrency: {
    symbol: 'ETH',
    name: 'Ethereum',
  },
} as Chain

const token = {
  address: '0x1234567890abcdef',
  name: 'USDC',
  symbol: 'USDC',
  decimals: 18,
  chainId: 1
} as Token

describe('BalanceCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the native currency when no token is provided', () => {
    renderWithProvider(<BalanceCard userAddress="0xabc" chain={chain} />)
    expect(screen.getByText('Ethereum')).toBeInTheDocument()
    expect(screen.getByText('Native')).toBeInTheDocument()
  })

  it('renders the token name when a token is provided', () => {
    renderWithProvider(<BalanceCard userAddress="0xabc" chain={chain} token={token} />)
    expect(screen.getByText('USDC')).toBeInTheDocument()
    expect(screen.queryByText('Native')).not.toBeInTheDocument()
  })

  it('displays "Loading..." while fetching data', () => {
    renderWithProvider(<BalanceCard userAddress="0xabc" chain={chain} token={token} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays the balance once it is fetched', async () => {
    mockedGetTokenWithBalance.mockResolvedValue({
      formattedBalance: '1000',
      symbol: 'USDC',
      name: 'USDC',
    })

    renderWithProvider(<BalanceCard userAddress="0xabc" chain={chain} token={token} />)

    await waitFor(() => {
      expect(screen.getByText('1000 USDC')).toBeInTheDocument()
    })
  })

  it('shows an error toast if the query fails', async () => {
    mockedGetTokenWithBalance.mockRejectedValue(new Error('Failed to fetch'))

    renderWithProvider(<BalanceCard userAddress="0xabc" chain={chain} token={token} />)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error while fetching balance.')
    })
  })

  it('calls "removeToken" when delete is clicked', async () => {
    useWalletStore.setState((state) => ({
      ...state,
      removeToken: mockRemoveToken,
    }))

    renderWithProvider(<BalanceCard userAddress="0xabc" chain={chain} token={token} />)

    fireEvent.click(screen.getByAltText('delete'))
    expect(mockRemoveToken).toHaveBeenCalledWith('0x1234567890abcdef')
  })
})
