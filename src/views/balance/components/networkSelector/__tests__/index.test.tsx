import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import NetworkSelector from '../index'
import { useWalletStore } from '../../../../../store'
import { arbitrum, mainnet, polygon } from 'viem/chains'


const options = [
  mainnet,
  polygon,
  arbitrum
]

describe('NetworkSelector Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the active chain name', () => {
    useWalletStore.setState((state)=>({
      ...state,
      activeChain: mainnet
    }))

    render(<NetworkSelector options={options} />)
    expect(screen.getByText('Ethereum')).toBeInTheDocument()
  })

  it('opens the dropdown on click', () => {
    render(<NetworkSelector options={options} />)

    fireEvent.click(screen.getByText('Ethereum'))
    expect(screen.getByPlaceholderText('Search network...')).toBeInTheDocument()

    expect(screen.getByText('Ethereum')).toBeInTheDocument()
    expect(screen.getByText('Polygon')).toBeInTheDocument()
    expect(screen.getByText('Arbitrum One')).toBeInTheDocument()
  })

  it('filters options based on search term', async () => {
    render(<NetworkSelector options={options} />)

    fireEvent.click(screen.getByText('Ethereum'))

    fireEvent.change(screen.getByPlaceholderText('Search network...'), {
      target: { value: 'Poly' },
    })

    await waitFor(() => {
      expect(screen.getByText('Polygon')).toBeInTheDocument()
      expect(screen.queryByText('Ethereum')).not.toBeInTheDocument()
      expect(screen.queryByText('Arbitrum')).not.toBeInTheDocument()
    })
  })

  it('shows "No results found" if the search term does not match', async () => {
    render(<NetworkSelector options={options} />)

    fireEvent.click(screen.getByText('Ethereum'))
    fireEvent.change(screen.getByPlaceholderText('Search network...'), {
      target: { value: 'NonExistentChain' },
    })

    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument()
    })
  })

  it('calls setActiveChain and closes the dropdown when an option is clicked', () => {
    const mockSetActiveChain = vi.fn()
    useWalletStore.setState((state)=>({
      ...state,
      setActiveChain: mockSetActiveChain
    }))

    render(<NetworkSelector options={options} />)

    fireEvent.click(screen.getByText('Ethereum'))
    fireEvent.click(screen.getByText('Polygon'))

    expect(mockSetActiveChain).toHaveBeenCalledWith(options[1])

    expect(screen.queryByPlaceholderText('Search network...')).not.toBeInTheDocument()
  })

  it('closes the dropdown when clicking outside', () => {
    render(<NetworkSelector options={options} />)

    fireEvent.click(screen.getByText('Ethereum'))
    expect(screen.getByPlaceholderText('Search network...')).toBeInTheDocument()

    fireEvent.mouseDown(document)

    expect(screen.queryByPlaceholderText('Search network...')).not.toBeInTheDocument()
  })
})
